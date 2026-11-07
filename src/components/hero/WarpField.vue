<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { prefersReducedMotion } from '../../composables/useReducedMotion.ts'
import { createStars, drawFrame, type Star } from '../../lib/warp.ts'

/**
 * Element whose centre is the vanishing point (the portrait window on wide screens).
 * Falls back to a point right of centre.
 */
const props = defineProps<{ focus?: HTMLElement | null }>()

const canvas = ref<HTMLCanvasElement | null>(null)
let cleanup: (() => void) | undefined

onMounted(() => {
  // Start after hydration has finished, so canvas setup never lengthens that task.
  const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 120))
  idle(init, { timeout: 600 })
})

function init() {
  const el = canvas.value
  const ctx = el?.getContext('2d')
  if (!el || !ctx) return // CSS gradient behind the canvas remains as the fallback

  const reduced = prefersReducedMotion()
  let width = 0
  let height = 0
  let stars: Star[] = []
  let vx = 0
  let vy = 0
  let targetX = 0
  let targetY = 0
  let boost = 0
  let lastScroll = window.scrollY
  let raf = 0
  let last = performance.now()
  let visible = true

  const baseFocus = () => {
    const rect = el.getBoundingClientRect()
    const f = props.focus?.getBoundingClientRect()
    if (f && f.width > 0 && window.innerWidth >= 768) {
      return { x: f.left + f.width / 2 - rect.left, y: f.top + f.height * 0.45 - rect.top }
    }
    return { x: width * 0.62, y: height * 0.42 }
  }

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    width = el.clientWidth
    height = el.clientHeight
    el.width = Math.round(width * dpr)
    el.height = Math.round(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    // Density is fixed at first layout; later resizes (fonts, rotation) keep the same stars.
    if (!stars.length) stars = createStars(Math.round(Math.min(360, Math.max(140, (width * height) / 3600))))
    const f = baseFocus()
    targetX = vx = f.x
    targetY = vy = f.y
    if (reduced) drawStill()
  }

  const drawStill = () => {
    // A single frame with short streaks; no animation.
    drawFrame(ctx, stars, { width, height, cx: vx, cy: vy, advance: 0, stretch: 0.6 })
  }

  const tick = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    vx += (targetX - vx) * Math.min(1, dt * 3)
    vy += (targetY - vy) * Math.min(1, dt * 3)
    boost *= Math.pow(0.04, dt) // decays within about a second
    drawFrame(ctx, stars, {
      width,
      height,
      cx: vx,
      cy: vy,
      advance: dt * (0.15 + boost * 0.9),
      stretch: boost * 2,
    })
    raf = requestAnimationFrame(tick)
  }

  const start = () => {
    if (reduced || raf || !visible || document.hidden) return
    last = performance.now()
    raf = requestAnimationFrame(tick)
  }
  const stop = () => {
    cancelAnimationFrame(raf)
    raf = 0
  }

  const onPointer = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    const f = baseFocus()
    // Lean the vanishing point toward the cursor, at most ~8% of the canvas.
    targetX = f.x + ((e.clientX - rect.left) / rect.width - 0.5) * width * 0.16
    targetY = f.y + ((e.clientY - rect.top) / rect.height - 0.5) * height * 0.16
  }
  const onScroll = () => {
    const delta = Math.abs(window.scrollY - lastScroll)
    lastScroll = window.scrollY
    boost = Math.min(1, boost + delta / 600)
  }
  const onVisibility = () => (document.hidden ? stop() : start())

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(el)
  const io = new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting
    if (visible) start()
    else stop()
  })
  io.observe(el)

  resize()
  if (!reduced) {
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    start()
  }

  cleanup = () => {
    stop()
    resizeObserver.disconnect()
    io.disconnect()
    window.removeEventListener('pointermove', onPointer)
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('visibilitychange', onVisibility)
  }
}

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <canvas ref="canvas" class="warp" aria-hidden="true" />
</template>

<style scoped>
.warp {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
