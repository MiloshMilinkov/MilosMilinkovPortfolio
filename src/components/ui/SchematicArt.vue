<script setup lang="ts">
import { computed } from 'vue'
import { buildSchematic } from '../../lib/schematic.ts'

const props = defineProps<{ seed: string }>()
const art = computed(() => buildSchematic(props.seed))
const gradId = computed(() => `glow-${props.seed}`)
</script>

<template>
  <div class="schematic-wrap">
    <svg class="schematic" viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient :id="gradId" cx="0.85" cy="0.05" r="0.9">
          <stop offset="0" class="glow-deep" />
          <stop offset="0.45" class="glow-accent" />
          <stop offset="1" class="glow-none" />
        </radialGradient>
      </defs>
      <rect width="640" height="400" class="ground" />
      <rect width="640" height="400" :fill="`url(#${gradId})`" />
      <rect
        v-for="(c, i) in art.chips"
        :key="`c${i}`"
        :x="c.x"
        :y="c.y"
        :width="c.w"
        :height="c.h"
        rx="12"
        class="chip"
      />
      <polyline
        v-for="(t, i) in art.traces"
        :key="`t${i}`"
        :points="t"
        class="trace"
      />
      <circle v-for="(n, i) in art.nodes" :key="`n${i}`" :cx="n.x" :cy="n.y" :r="n.r" :class="i % 5 === 0 ? 'node node--mint' : 'node'" />
    </svg>
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

.ground {
  fill: var(--surface);
}

.glow-deep {
  stop-color: var(--accent-deep);
  stop-opacity: 0.45;
}

.glow-accent {
  stop-color: var(--accent);
  stop-opacity: 0.12;
}

.glow-none {
  stop-color: var(--accent);
  stop-opacity: 0;
}

.chip {
  fill: var(--surface-3);
  stroke: rgb(var(--tint-rgb) / 0.14);
}

.trace {
  fill: none;
  stroke: rgb(var(--tint-rgb) / 0.16);
  stroke-width: 2;
  stroke-linejoin: round;
}

.node {
  fill: var(--accent);
}

.node--mint {
  fill: var(--mint);
}
</style>
