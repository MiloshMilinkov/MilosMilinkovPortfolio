import { onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'
import { prefersReducedMotion } from './useReducedMotion.ts'

/**
 * Number that counts from 0 to `target` once `start` turns true.
 * The server render and reduced-motion visitors get the final value directly.
 */
export function useCountUp(target: number, start: Ref<boolean>, durationMs = 1200): Ref<number> {
  const value = ref(target)
  let raf = 0

  const run = () => {
    const t0 = performance.now()
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs)
      value.value = Math.round(target * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
  }

  onMounted(() => {
    if (prefersReducedMotion()) return
    value.value = 0
    if (start.value) run()
    else {
      const stop = watch(start, (go) => {
        if (!go) return
        stop()
        run()
      })
    }
  })
  onBeforeUnmount(() => cancelAnimationFrame(raf))

  return value
}
