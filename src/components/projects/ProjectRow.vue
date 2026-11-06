<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '../../data/types.ts'
import { resolveProjectLink } from '../../lib/projectLinks.ts'
import ExternalLink from '../ui/ExternalLink.vue'
import TechTag from '../ui/TechTag.vue'

const props = defineProps<{ project: Project; skillLabel: (id: string) => string; activeTech: string | null }>()
const link = computed(() => resolveProjectLink(props.project))
</script>

<template>
  <li class="row" :class="{ 'row--linked': link.primary }" :data-project="project.id">
    <div class="row__head">
      <h4 class="row__title">{{ project.title }}</h4>
      <span class="row__kind">{{ project.kind }}</span>
    </div>
    <p class="row__summary">{{ project.summary }}</p>
    <ul class="row__tech" aria-label="Technologies">
      <li v-for="t in project.tech" :key="t"><TechTag :label="skillLabel(t)" :active="t === activeTech" /></li>
    </ul>
    <ExternalLink v-if="link.primary" :href="link.primary.href" class="row__link">{{ link.primary.label }}</ExternalLink>
  </li>
</template>

<style scoped>
.row {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 14rem) minmax(0, 1fr) auto;
  grid-template-areas:
    'head summary link'
    'head tech link';
  gap: var(--space-2) var(--space-6);
  align-items: start;
  padding-block: var(--space-5);
  border-top: 1px solid var(--plate);
  transition: background-color 0.2s;
}

.row:last-child {
  border-bottom: 1px solid var(--plate);
}

.row--linked:hover {
  background: rgb(200 163 90 / 0.04);
}

.row__head {
  grid-area: head;
  display: grid;
  gap: var(--space-1);
}

.row__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--step-1);
  font-weight: 700;
  color: var(--bone);
}

.row__kind {
  color: var(--steel);
  font-size: var(--step--1);
}

.row__summary {
  grid-area: summary;
  margin: 0;
  color: var(--steel);
}

.row__tech {
  grid-area: tech;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.row__link {
  grid-area: link;
  align-self: center;
  font-size: var(--step--1);
  font-weight: 600;
  white-space: nowrap;
}

/* Whole row is clickable via its single link. */
.row__link::after {
  content: '';
  position: absolute;
  inset: 0;
}

@media (max-width: 47.99rem) {
  .row {
    grid-template-columns: 1fr;
    grid-template-areas: 'head' 'summary' 'tech' 'link';
  }

  .row__link {
    justify-self: start;
  }
}
</style>
