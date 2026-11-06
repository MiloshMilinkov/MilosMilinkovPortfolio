<script setup lang="ts">
import { toRef } from 'vue'
import { useCountUp } from '../../composables/useCountUp.ts'
import type { Stat } from '../../data/types.ts'

const props = defineProps<{ stat: Stat; start: boolean }>()
const shown = useCountUp(props.stat.value, toRef(props, 'start'))
</script>

<template>
  <li class="stat">
    <data class="stat__value" :value="stat.value">{{ shown }}{{ stat.suffix }}</data>
    <span class="stat__label">{{ stat.label }}</span>
  </li>
</template>

<style scoped>
.stat {
  display: grid;
  grid-template-columns: 5.5rem 1fr;
  align-items: baseline;
  gap: var(--space-4);
  padding-block: var(--space-4);
  border-top: 1px solid var(--plate);
}

.stat:last-child {
  border-bottom: 1px solid var(--plate);
}

.stat__value {
  font-family: var(--font-display);
  font-size: var(--step-3);
  font-weight: 700;
  line-height: 1;
  color: var(--brass);
  font-variant-numeric: tabular-nums;
}

.stat__label {
  color: var(--steel);
}
</style>
