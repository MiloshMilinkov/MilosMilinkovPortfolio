<script setup lang="ts">
import type { Skill } from '../../data/types.ts'

defineProps<{ techs: Skill[]; active: string | null }>()
const emit = defineEmits<{ select: [id: string | null] }>()
</script>

<template>
  <div class="filter" role="group" aria-label="Filter projects by technology">
    <button type="button" class="chip" :aria-pressed="active === null ? 'true' : 'false'" @click="emit('select', null)">
      All
    </button>
    <button
      v-for="tech in techs"
      :key="tech.id"
      type="button"
      class="chip"
      :aria-pressed="active === tech.id ? 'true' : 'false'"
      @click="emit('select', active === tech.id ? null : tech.id)"
    >
      {{ tech.label }}
    </button>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.chip {
  min-height: 2.25rem;
  padding: 0.3em 0.85em;
  background: transparent;
  border: 1px solid var(--plate);
  color: var(--steel);
  font-size: var(--step--1);
  cursor: pointer;
  transition:
    border-color 0.15s,
    color 0.15s;
}

.chip:hover {
  border-color: var(--brass-dim);
  color: var(--bone);
}

.chip[aria-pressed='true'] {
  border-color: var(--brass);
  background: var(--brass);
  color: var(--void);
  font-weight: 600;
}

@media (max-width: 47.99rem) {
  /* One swipeable row instead of a tall block of chips. */
  .filter {
    flex-wrap: nowrap;
    overflow-x: auto;
    margin-inline: calc(-1 * var(--gutter));
    padding: 2px var(--gutter) var(--space-2);
    scrollbar-width: thin;
  }

  .chip {
    flex: none;
  }
}
</style>
