<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '../../data/types.ts'
import { resolveProjectLink } from '../../lib/projectLinks.ts'
import ExternalLink from '../ui/ExternalLink.vue'
import ResponsiveImage from '../ui/ResponsiveImage.vue'
import SchematicArt from '../ui/SchematicArt.vue'
import StatusBadge from '../ui/StatusBadge.vue'
import TechTag from '../ui/TechTag.vue'

const props = defineProps<{ project: Project; skillLabel: (id: string) => string; activeTech: string | null; flip?: boolean }>()
const link = computed(() => resolveProjectLink(props.project))

/**
 * A click anywhere on the card follows its primary link (the brief: "when clicked,
 * take the user to that website"). Keyboard and screen-reader users get the one
 * real link; clicks on links, buttons or while selecting text are left alone.
 */
function onCardClick(event: MouseEvent) {
  if (!link.value.primary) return
  const target = event.target as HTMLElement
  if (target.closest('a, button') || window.getSelection()?.toString()) return
  ;(event.currentTarget as HTMLElement).querySelector<HTMLAnchorElement>('.project__primary')?.click()
}
</script>

<template>
  <article
    class="project frame"
    :class="{ 'project--flip': flip, 'project--linked': link.primary, [`project--${project.status}`]: true }"
    @click="onCardClick"
  >
    <div class="project__media">
      <ResponsiveImage
        v-if="project.image"
        :base="`projects/${project.image}`"
        :widths="[640, 960, 1280]"
        sizes="(min-width: 64rem) 560px, calc(100vw - 2rem)"
        :alt="`Screenshot of the ${project.title} website`"
        :width="1280"
        :height="800"
      />
      <SchematicArt v-else :seed="project.id" />
    </div>

    <div class="project__body">
      <p class="project__meta">
        <StatusBadge :status="project.status" />
        <span class="project__kind">{{ project.kind }}</span>
        <span v-if="project.year" class="project__year">{{ project.year }}</span>
      </p>
      <h3 class="project__title">{{ project.title }}</h3>
      <p class="project__summary">{{ project.summary }}</p>
      <ul v-if="project.highlights.length" class="project__highlights">
        <li v-for="(h, i) in project.highlights" :key="i">{{ h }}</li>
      </ul>
      <ul class="project__tech" aria-label="Technologies">
        <li v-for="t in project.tech" :key="t"><TechTag :label="skillLabel(t)" :active="t === activeTech" /></li>
      </ul>

      <div class="project__footer">
        <p v-if="link.note" class="project__note">{{ link.note }}</p>
        <div v-if="link.primary || link.secondary" class="project__actions">
          <ExternalLink v-if="link.primary" :href="link.primary.href" class="btn btn--primary frame frame--br project__primary">
            {{ link.primary.label }}
          </ExternalLink>
          <ExternalLink v-if="link.secondary" :href="link.secondary.href" class="project__secondary">
            {{ link.secondary.label }}
          </ExternalLink>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project {
  --chamfer: 22px;
  --frame-fill: var(--gunmetal);
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  transition: background-color 0.2s;
}

.project--linked:hover,
.project--linked:focus-within {
  --frame-edge: var(--brass-dim);
}

.project--flip .project__media {
  order: 2;
}

.project__media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #101215;
  border-right: 1px solid var(--plate);
}

.project--flip .project__media {
  border-right: 0;
  border-left: 1px solid var(--plate);
}

.project__media :deep(picture),
.project__media :deep(img) {
  width: 100%;
  height: 100%;
}

/* Wide screens: the media fills the card's full height beside the text. */
@media (min-width: 64rem) {
  .project__media {
    aspect-ratio: auto;
    min-height: 20rem;
  }

  .project__media > :deep(picture),
  .project__media > :deep(svg) {
    position: absolute;
    inset: 0;
  }
}

.project__media :deep(img) {
  object-fit: cover;
  object-position: top;
  transition: transform 0.6s var(--ease-out);
}

.project--linked:hover .project__media :deep(img) {
  transform: scale(1.025);
}

.project__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: clamp(1.25rem, 1rem + 1.5vw, 2.25rem);
}

.project__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-4);
  margin: 0;
  font-size: var(--step--1);
  color: var(--steel);
}

.project__title {
  font-size: var(--step-2);
}

.project__summary {
  margin: 0;
  color: var(--bone);
}

.project__highlights {
  display: grid;
  gap: var(--space-2);
  padding-left: 1.1em;
  color: var(--steel);
  font-size: var(--step--1);
}

.project__highlights li::marker {
  color: var(--brass-dim);
}

.project__tech {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.project__footer {
  margin-top: auto;
  padding-top: var(--space-3);
}

.project__note {
  margin: 0 0 var(--space-3);
  color: var(--steel);
  font-size: var(--step--1);
}

.project--classified .project__note {
  padding-left: var(--space-3);
  border-left: 2px solid var(--plate);
}

.project__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3) var(--space-5);
}

.project--linked {
  cursor: pointer;
}

.project__secondary {
  font-size: var(--step--1);
  font-weight: 600;
}

@media (max-width: 63.99rem) {
  .project {
    grid-template-columns: 1fr;
  }

  .project--flip .project__media {
    order: 0;
  }

  .project__media,
  .project--flip .project__media {
    border: 0;
    border-bottom: 1px solid var(--plate);
  }
}
</style>
