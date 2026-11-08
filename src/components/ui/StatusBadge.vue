<script setup lang="ts">
import { computed } from 'vue'
import type { ProjectStatus } from '../../data/types.ts'
import { useI18n } from '../../i18n/index.ts'

const props = defineProps<{ status: ProjectStatus }>()

const { t } = useI18n()

const label = computed(() => t.projects.status[props.status])
</script>

<template>
  <span class="status" :class="`status--${status}`" :data-status="status">
    <span class="status__dot" aria-hidden="true" />{{ label }}
  </span>
</template>

<style scoped>
.status {
  display: inline-flex;
  align-items: center;
  gap: 0.45em;
  padding: 0.2em 0.7em;
  border-radius: 999px;
  border: 1px solid var(--border-strong);
  background: rgb(255 255 255 / 0.04);
  color: var(--muted);
  font-size: var(--step--1);
  font-weight: 500;
  white-space: nowrap;
}

.status__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--subtle);
}

.status--live {
  color: var(--text);
  border-color: rgb(34 211 238 / 0.35);
  background: rgb(34 211 238 / 0.08);
}

.status--live .status__dot {
  background: var(--cyan);
  box-shadow: 0 0 0 3px rgb(34 211 238 / 0.2);
}

.status--source .status__dot {
  background: var(--accent);
}
</style>
