<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '../../data/types.ts'
import { type CardSize, resolveProjectLink } from '../../lib/projectLinks.ts'
import ExternalLink from '../ui/ExternalLink.vue'
import Icon from '../ui/Icon.vue'
import ResponsiveImage from '../ui/ResponsiveImage.vue'
import SchematicArt from '../ui/SchematicArt.vue'
import StatusBadge from '../ui/StatusBadge.vue'
import { useI18n } from '../../i18n/index.ts'

/** Image `sizes` per card size; must match the column breakpoints in ProjectsSection. */
const SIZES: Record<CardSize, string> = {
  large: '(min-width: 56rem) 560px, calc(100vw - 2rem)',
  medium: '(min-width: 64rem) 560px, (min-width: 40rem) 50vw, calc(100vw - 2rem)',
  small: '(min-width: 64rem) 370px, (min-width: 40rem) 50vw, calc(100vw - 2rem)',
}

const props = withDefaults(defineProps<{ project: Project; size?: CardSize }>(), { size: 'medium' })
const { t } = useI18n()
const text = computed(() => t.projects.items[props.project.id]!)
const link = computed(() => resolveProjectLink(props.project, t.projects.links))
/** Live websites sit in a browser frame that shows their address. */
const host = computed(() => (props.project.liveUrl ? new URL(props.project.liveUrl).host : null))

/**
 * A click anywhere on the card follows its primary link (the brief: "when clicked,
 * take the user to that website"). Keyboard and screen-reader users get the one
 * real link; clicks on links, buttons, the features toggle or while selecting text are left alone.
 */
function onCardClick(event: MouseEvent) {
  if (!link.value.primary) return
  const target = event.target as HTMLElement
  if (target.closest('a, button, details') || window.getSelection()?.toString()) return
  ;(event.currentTarget as HTMLElement).querySelector<HTMLAnchorElement>('.project__primary')?.click()
}
</script>

<template>
  <article
    class="project card"
    :class="[`project--${size}`, `project--${project.status}`, { 'project--linked': link.primary }]"
    @click="onCardClick"
  >
    <div class="project__media" :class="{ 'project__media--browser': host }">
      <div v-if="host" class="browser-bar" aria-hidden="true">
        <span class="browser-bar__dots"><i /><i /><i /></span>
        <span class="browser-bar__url"><Icon name="lock" /><span class="browser-bar__host">{{ host }}</span></span>
      </div>
      <div class="project__shot">
        <ResponsiveImage
          v-if="project.image"
          :base="`projects/${project.image}`"
          :widths="[640, 960, 1280]"
          :sizes="SIZES[size]"
          :alt="t.projects.screenshotAlt(project.title)"
          :width="1280"
          :height="800"
        />
        <SchematicArt v-else :seed="project.id" />
      </div>
    </div>

    <div class="project__body">
      <p class="project__meta">
        <StatusBadge :status="project.status" />
        <span v-if="text.year ?? project.year" class="project__year">{{ text.year ?? project.year }}</span>
      </p>
      <h4 class="project__title">{{ project.title }}</h4>
      <p class="project__kind">{{ text.kind }}</p>
      <p class="project__summary">{{ text.summary }}</p>
      <!-- Large cards list their features; smaller cards fold them away to keep the grid easy to scan. -->
      <component :is="size === 'large' ? 'div' : 'details'" v-if="text.highlights.length" class="project__features">
        <summary v-if="size !== 'large'">{{ t.projects.highlightsLabel }}</summary>
        <ul class="project__highlights check-list">
          <li v-for="(h, i) in text.highlights" :key="i"><Icon name="check" />{{ h }}</li>
        </ul>
      </component>

      <div class="project__footer">
        <p v-if="link.note" class="project__note">{{ link.note }}</p>
        <div v-if="link.primary || link.secondary" class="project__actions">
          <ExternalLink
            v-if="link.primary"
            :href="link.primary.href"
            class="btn project__primary"
            :class="project.status === 'live' ? 'btn--primary' : 'btn--ghost'"
          >
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
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  transition: border-color 0.2s;
}

.project--linked {
  cursor: pointer;
}

.project--linked:hover,
.project--linked:focus-within {
  border-color: rgb(var(--accent-rgb) / 0.4);
}

/* Media: a screenshot (in a browser frame for live sites) or generated art. */
.project__media {
  margin: var(--space-3) var(--space-3) 0;
  overflow: hidden;
  border-radius: calc(var(--radius) - 8px);
  background: var(--surface-2);
  box-shadow: 0 0 0 1px var(--border);
}

.browser-bar {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  height: 2.25rem;
  padding: 0 var(--space-3);
  background: var(--surface-3);
  border-bottom: 1px solid var(--border);
}

.browser-bar__dots {
  display: inline-flex;
  gap: 6px;
  flex: none;
}

.browser-bar__dots i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.18);
}

.browser-bar__dots i:first-child {
  background: var(--dot-close);
}

.browser-bar__dots i:nth-child(2) {
  background: var(--dot-min);
}

.browser-bar__dots i:last-child {
  background: var(--mint);
}

.browser-bar__url {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  min-width: 0;
  max-width: 100%;
  margin-inline: auto;
  padding: 0.15em 0.9em;
  overflow: hidden;
  border-radius: 999px;
  background: rgb(0 0 0 / 0.22);
  color: var(--muted);
  font-size: 0.78rem;
  white-space: nowrap;
}

.browser-bar__host {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.browser-bar__url :deep(svg) {
  width: 0.85em;
  height: 0.85em;
  flex: none;
  color: var(--mint);
}

.project__shot {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.project__shot :deep(picture),
.project__shot :deep(img) {
  width: 100%;
  height: 100%;
}

.project__shot :deep(img) {
  object-fit: cover;
  object-position: top;
  transition: transform 0.6s var(--ease-out);
}

.project--linked:hover .project__shot :deep(img) {
  transform: scale(1.025);
}

/* Body */
.project__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-5) clamp(1.25rem, 1rem + 0.8vw, 1.75rem) clamp(1.25rem, 1rem + 0.8vw, 1.75rem);
}

.project__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-3);
  margin: 0;
  font-size: var(--step--1);
}

.project__year {
  color: var(--subtle);
  font-variant-numeric: tabular-nums;
}

.project__title {
  font-size: var(--step-2);
  letter-spacing: -0.025em;
}

.project--small .project__title {
  font-size: var(--step-1);
}

.project__kind {
  margin: calc(-1 * var(--space-2)) 0 0;
  color: var(--accent);
  font-size: var(--step--1);
  font-weight: 500;
}

.project__summary {
  margin: 0;
  color: var(--text);
}

.project__highlights {
  display: grid;
  gap: var(--space-2);
  color: var(--muted);
  font-size: var(--step--1);
  line-height: 1.6;
}

/* Features toggle (smaller cards) */
details.project__features summary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--text);
  font-size: var(--step--1);
  font-weight: 600;
  list-style: none;
  cursor: pointer;
}

details.project__features summary::-webkit-details-marker {
  display: none;
}

/* Chevron: points down when closed, up when open. */
details.project__features summary::after {
  content: '';
  width: 0.45rem;
  height: 0.45rem;
  margin-top: -0.2rem;
  border-right: 2px solid var(--accent);
  border-bottom: 2px solid var(--accent);
  transform: rotate(45deg);
  transition: transform 0.2s var(--ease-out);
}

details.project__features[open] summary::after {
  margin-top: 0.2rem;
  transform: rotate(-135deg);
}

details.project__features summary:hover {
  color: var(--accent);
}

details.project__features .project__highlights {
  margin-top: var(--space-3);
}

.project__footer {
  margin-top: auto;
  padding-top: var(--space-3);
}

.project__note {
  margin: 0 0 var(--space-3);
  color: var(--subtle);
  font-size: var(--step--1);
}

.project__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3) var(--space-5);
}

.project__actions .btn {
  min-height: 2.75rem;
  font-size: var(--step--1);
}

.project__secondary {
  color: var(--muted);
  font-size: var(--step--1);
  font-weight: 500;
}
</style>
