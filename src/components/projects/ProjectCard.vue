<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '../../data/types.ts'
import { resolveProjectLink } from '../../lib/projectLinks.ts'
import ExternalLink from '../ui/ExternalLink.vue'
import ResponsiveImage from '../ui/ResponsiveImage.vue'
import SchematicArt from '../ui/SchematicArt.vue'
import StatusBadge from '../ui/StatusBadge.vue'
import { useI18n } from '../../i18n/index.ts'

const props = defineProps<{ project: Project; flip?: boolean }>()
const { t } = useI18n()
const text = computed(() => t.projects.items[props.project.id]!)
const link = computed(() => resolveProjectLink(props.project, t.projects.links))

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
    class="project card"
    :class="{ 'project--flip': flip, 'project--linked': link.primary, [`project--${project.status}`]: true }"
    @click="onCardClick"
  >
    <div class="project__media">
      <ResponsiveImage
        v-if="project.image"
        :base="`projects/${project.image}`"
        :widths="[640, 960, 1280]"
        sizes="(min-width: 64rem) 560px, calc(100vw - 2rem)"
        :alt="t.projects.screenshotAlt(project.title)"
        :width="1280"
        :height="800"
      />
      <SchematicArt v-else :seed="project.id" :label="project.title" />
    </div>

    <div class="project__body">
      <p class="project__meta">
        <StatusBadge :status="project.status" />
        <span class="project__kind">{{ text.kind }}</span>
        <span v-if="text.year ?? project.year" class="project__year">{{ text.year ?? project.year }}</span>
      </p>
      <h3 class="project__title">{{ project.title }}</h3>
      <p class="project__summary">{{ text.summary }}</p>
      <ul v-if="text.highlights.length" class="project__highlights">
        <li v-for="(h, i) in text.highlights" :key="i">{{ h }}</li>
      </ul>

      <div class="project__footer">
        <p v-if="link.note" class="project__note">{{ link.note }}</p>
        <div v-if="link.primary || link.secondary" class="project__actions">
          <ExternalLink v-if="link.primary" :href="link.primary.href" class="btn btn--primary project__primary">
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
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  overflow: hidden;
  transition:
    border-color 0.2s,
    transform 0.25s var(--ease-out);
}

.project--linked:hover,
.project--linked:focus-within {
  border-color: rgb(217 70 239 / 0.4);
}

.project--flip .project__media {
  order: 2;
}

.project__media {
  position: relative;
  aspect-ratio: 16 / 10;
  margin: var(--space-3);
  overflow: hidden;
  border-radius: calc(var(--radius) - 6px);
  background: #18181e;
  box-shadow: 0 0 0 1px var(--border);
}

.project__media :deep(picture),
.project__media :deep(img) {
  width: 100%;
  height: 100%;
}

.project__media :deep(img) {
  object-fit: cover;
  object-position: top;
  transition: transform 0.6s var(--ease-out);
}

.project--linked:hover .project__media :deep(img) {
  transform: scale(1.03);
}

/* Wide screens: the media fills the card's full height beside the text. */
@media (min-width: 64rem) {
  .project__media {
    aspect-ratio: auto;
    min-height: 19rem;
  }

  .project__media > :deep(picture),
  .project__media > :deep(div) {
    position: absolute;
    inset: 0;
  }
}

.project__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: clamp(1.25rem, 1rem + 1.2vw, 2rem);
}

.project__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-3);
  margin: 0;
  color: var(--muted);
  font-size: var(--step--1);
}

.project__year {
  color: var(--subtle);
}

.project__title {
  font-size: var(--step-2);
  letter-spacing: -0.025em;
}

.project__summary {
  margin: 0;
  color: var(--text);
}

.project__highlights {
  display: grid;
  gap: var(--space-2);
  padding-left: 1.1em;
  color: var(--muted);
  font-size: var(--step--1);
}

.project__highlights li::marker {
  color: var(--accent);
}

.project__footer {
  margin-top: auto;
  padding-top: var(--space-3);
}

.project__note {
  margin: 0 0 var(--space-3);
  color: var(--muted);
  font-size: var(--step--1);
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
  color: var(--muted);
  font-size: var(--step--1);
  font-weight: 500;
}

@media (max-width: 63.99rem) {
  .project {
    grid-template-columns: 1fr;
  }

  .project--flip .project__media {
    order: 0;
  }
}
</style>
