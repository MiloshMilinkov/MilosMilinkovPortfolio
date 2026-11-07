<script setup lang="ts">
import { computed } from 'vue'
import { buildSchematic } from '../../lib/schematic.ts'

const props = defineProps<{ seed: string; label: string }>()
const art = computed(() => buildSchematic(props.seed))
const gradId = computed(() => `glow-${props.seed}`)
</script>

<template>
  <div class="schematic-wrap">
    <svg class="schematic" viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient :id="gradId" cx="0.85" cy="0.1" r="0.9">
          <stop offset="0" stop-color="#d946ef" stop-opacity="0.35" />
          <stop offset="1" stop-color="#d946ef" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="640" height="400" fill="#18181e" />
      <rect width="640" height="400" :fill="`url(#${gradId})`" />
      <rect
        v-for="(c, i) in art.chips"
        :key="`c${i}`"
        :x="c.x"
        :y="c.y"
        :width="c.w"
        :height="c.h"
        rx="12"
        fill="#23232b"
        stroke="rgba(255,255,255,0.1)"
      />
      <polyline
        v-for="(t, i) in art.traces"
        :key="`t${i}`"
        :points="t"
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <circle v-for="(n, i) in art.nodes" :key="`n${i}`" :cx="n.x" :cy="n.y" :r="n.r" :fill="i % 5 === 0 ? '#22d3ee' : '#e055f5'" />
    </svg>
    <span class="schematic-wrap__label" aria-hidden="true">{{ label }}</span>
  </div>
</template>

<style scoped>
.schematic-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}

.schematic {
  width: 100%;
  height: 100%;
}

.schematic-wrap__label {
  position: absolute;
  left: 1.25rem;
  bottom: 1rem;
  color: rgb(255 255 255 / 0.85);
  font-size: var(--step-2);
  font-weight: 600;
  letter-spacing: -0.02em;
}
</style>
