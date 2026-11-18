<script setup lang="ts">
import { toRef } from 'vue'
import { useCountUp } from '../../composables/useCountUp.ts'
import type { Stat } from '../../data/types.ts'

const props = defineProps<{ stat: Stat; label: string; start: boolean }>()
const shown = useCountUp(props.stat.value, toRef(props, 'start'))
</script>

<template>
  <!-- Scores (stat.max set) get a gauge that fills with the count. -->
  <li class="stat" :class="{ 'stat--gauge': stat.max }">
    <span class="stat__figure">
      <svg v-if="stat.max" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <circle class="stat__track" cx="24" cy="24" r="21" />
        <circle class="stat__fill" cx="24" cy="24" r="21" :pathLength="stat.max" :stroke-dasharray="`${shown} ${stat.max}`" />
      </svg>
      <data class="stat__value" :value="stat.value">{{ shown }}{{ stat.suffix }}</data>
    </span>
    <span class="stat__label">{{ label }}</span>
  </li>
</template>

<style scoped>
.stat {
  display: grid;
  align-content: end;
  gap: var(--space-2);
  padding: clamp(0.75rem, 0.5rem + 1vw, 1.5rem);
}

.stat__value {
  font-size: var(--step-3);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}

.stat__label {
  color: var(--muted);
  font-size: var(--step--1);
  line-height: 1.4;
}

.stat--gauge .stat__figure {
  position: relative;
  display: grid;
  place-items: center;
  width: clamp(3.75rem, 3rem + 2vw, 4.75rem);
  height: clamp(3.75rem, 3rem + 2vw, 4.75rem);
}

.stat__figure svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.stat__track,
.stat__fill {
  fill: none;
  stroke-width: 4;
}

.stat__track {
  stroke: rgb(var(--mint-rgb) / 0.15);
}

.stat__fill {
  stroke: var(--mint);
  stroke-linecap: round;
}

.stat--gauge .stat__value {
  font-size: var(--step-1);
  letter-spacing: -0.02em;
}
</style>
