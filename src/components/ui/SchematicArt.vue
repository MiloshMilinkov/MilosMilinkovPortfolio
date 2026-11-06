<script setup lang="ts">
import { computed } from 'vue'
import { buildSchematic } from '../../lib/schematic.ts'

const props = defineProps<{ seed: string }>()
const art = computed(() => buildSchematic(props.seed))
const patternId = computed(() => `grid-${props.seed}`)
</script>

<template>
  <svg class="schematic" viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <defs>
      <pattern :id="patternId" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M40 0H0V40" fill="none" stroke="#2a2d33" stroke-width="1" />
      </pattern>
    </defs>
    <rect width="640" height="400" fill="#101215" />
    <rect width="640" height="400" :fill="`url(#${patternId})`" />
    <rect
      v-for="(c, i) in art.chips"
      :key="`c${i}`"
      :x="c.x"
      :y="c.y"
      :width="c.w"
      :height="c.h"
      fill="#16181c"
      stroke="#8c7240"
      stroke-width="1.5"
    />
    <polyline v-for="(t, i) in art.traces" :key="`t${i}`" :points="t" fill="none" stroke="#8c7240" stroke-width="2" stroke-linejoin="round" />
    <circle v-for="(n, i) in art.nodes" :key="`n${i}`" :cx="n.x" :cy="n.y" :r="n.r" fill="#c8a35a" />
  </svg>
</template>

<style scoped>
.schematic {
  width: 100%;
  height: 100%;
}
</style>
