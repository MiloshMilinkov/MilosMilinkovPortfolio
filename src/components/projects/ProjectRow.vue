<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '../../data/types.ts'
import { resolveProjectLink } from '../../lib/projectLinks.ts'
import ExternalLink from '../ui/ExternalLink.vue'

const props = defineProps<{ project: Project }>()
const link = computed(() => resolveProjectLink(props.project))
</script>

<template>
  <li class="row" :class="{ 'row--linked': link.primary }" :data-project="project.id">
    <div class="row__head">
      <h4 class="row__title">{{ project.title }}</h4>
      <span class="row__kind">{{ project.kind }}</span>
    </div>
    <p class="row__summary">{{ project.summary }}</p>
    <ExternalLink v-if="link.primary" :href="link.primary.href" class="row__link">{{ link.primary.label }}</ExternalLink>
  </li>
</template>

<style scoped>
.row {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 14rem) minmax(0, 1fr) auto;
  grid-template-areas: 'head summary link';
  gap: var(--space-2) var(--space-6);
  align-items: start;
  padding-block: var(--space-5);
  border-top: 1px solid var(--border-strong);
  transition: background-color 0.2s;
}

.row:last-child {
  border-bottom: 1px solid var(--border-strong);
}

.row--linked:hover {
  background: rgb(255 255 255 / 0.03);
}

.row__head {
  grid-area: head;
  display: grid;
  gap: var(--space-1);
}

.row__title {
  margin: 0;
  font-size: var(--step-1);
  font-weight: 600;
  color: var(--text);
}

.row__kind {
  color: var(--muted);
  font-size: var(--step--1);
}

.row__summary {
  grid-area: summary;
  margin: 0;
  color: var(--muted);
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
    grid-template-areas: 'head' 'summary' 'link';
  }

  .row__link {
    justify-self: start;
  }
}
</style>
