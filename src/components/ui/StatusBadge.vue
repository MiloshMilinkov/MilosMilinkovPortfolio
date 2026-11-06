<script setup lang="ts">
import { computed } from 'vue'
import type { ProjectStatus } from '../../data/types.ts'

const props = defineProps<{ status: ProjectStatus }>()

const labels: Record<ProjectStatus, string> = {
  live: 'Live',
  source: 'Source only',
  classified: 'Classified',
}

const label = computed(() => labels[props.status])
</script>

<template>
  <span class="status" :class="`status--${status}`" :data-status="status">
    <svg class="status__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <circle v-if="status === 'live'" cx="8" cy="8" r="4" />
      <path v-else-if="status === 'source'" d="M5.5 4 2 8l3.5 4M10.5 4 14 8l-3.5 4" />
      <path v-else d="M4.5 7V5.5a3.5 3.5 0 0 1 7 0V7M3.5 7h9v6.5h-9z" />
    </svg>
    {{ label }}
  </span>
</template>

<style scoped>
.status {
  display: inline-flex;
  align-items: center;
  gap: 0.45em;
  font-size: var(--step--1);
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.status__icon {
  width: 1em;
  height: 1em;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.status--live {
  color: var(--ember-hot);
}

.status--live .status__icon {
  fill: currentColor;
  stroke: none;
}

@media (prefers-reduced-motion: no-preference) {
  .status--live .status__icon {
    animation: pulse 2.4s ease-in-out infinite;
  }
}

.status--source {
  color: var(--brass);
}

.status--classified {
  color: var(--steel);
}

@keyframes pulse {
  50% {
    opacity: 0.35;
  }
}
</style>
