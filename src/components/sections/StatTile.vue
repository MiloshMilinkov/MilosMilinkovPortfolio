<script setup lang="ts">
import { toRef } from 'vue'
import { useCountUp } from '../../composables/useCountUp.ts'
import type { Stat } from '../../data/types.ts'

const props = defineProps<{ stat: Stat; start: boolean }>()
const shown = useCountUp(props.stat.value, toRef(props, 'start'))
</script>

<template>
  <li class="stat card">
    <data class="stat__value" :value="stat.value">{{ shown }}{{ stat.suffix }}</data>
    <span class="stat__label">{{ stat.label }}</span>
  </li>
</template>

<style scoped>
.stat {
  display: grid;
  align-content: end;
  gap: var(--space-1);
  min-height: 6.5rem;
  padding: var(--space-4) var(--space-3) var(--space-3);
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
  line-height: 1.35;
}
</style>
