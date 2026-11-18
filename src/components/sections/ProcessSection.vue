<script setup lang="ts">
import { useI18n } from '../../i18n/index.ts'
import Icon from '../ui/Icon.vue'
import type { IconName } from '../ui/icons.ts'
import SectionHeading from '../ui/SectionHeading.vue'

const { t } = useI18n()
const stepIcons: IconName[] = ['mail', 'edit', 'code', 'rocket']
</script>

<template>
  <section id="process" class="section process" aria-labelledby="process-title">
    <div class="container">
      <SectionHeading id="process-title" :title="t.process.title" :lede="t.process.lede" />

      <!-- A track: one node per step, joined by a line that runs from orchid to mint. -->
      <ol class="track">
        <li v-for="(step, i) in t.process.steps" :key="step.title" class="track__step">
          <span class="track__node" aria-hidden="true">
            <Icon :name="stepIcons[i] ?? 'check'" />
            <span class="track__num">{{ i + 1 }}</span>
          </span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.track {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-6);
  list-style: none;
}

.track::before {
  content: '';
  position: absolute;
  top: 1.75rem;
  left: 1.75rem;
  right: 12%;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(var(--track-dir, 90deg), var(--accent), var(--sky) 55%, var(--mint));
  opacity: 0.6;
}

.track__step {
  position: relative;
  display: grid;
  align-content: start;
  gap: var(--space-3);
}

.track__node {
  position: relative;
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  margin-bottom: var(--space-3);
  border-radius: 50%;
  background: var(--surface-2);
  border: 1px solid rgb(var(--accent-rgb) / 0.35);
  box-shadow:
    0 0 0 6px var(--bg),
    0 12px 28px -14px rgb(var(--accent-rgb) / 0.6);
  color: var(--accent);
}

.track__step:last-child .track__node {
  border-color: rgb(var(--mint-rgb) / 0.45);
  color: var(--mint);
}

.track__node :deep(svg) {
  width: 1.4rem;
  height: 1.4rem;
}

.track__num {
  position: absolute;
  top: -0.3rem;
  right: -0.3rem;
  display: grid;
  place-items: center;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background: var(--accent-gradient);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.track__step p {
  margin: 0;
  color: var(--muted);
  max-width: 34ch;
}

/* Narrow screens: the track turns vertical, the line runs down the left. */
@media (max-width: 55.99rem) {
  .track {
    grid-template-columns: 1fr;
  }

  .track::before {
    --track-dir: 180deg;
    bottom: 3rem;
    right: auto;
    width: 2px;
    height: auto;
  }

  .track__step {
    grid-template-columns: 3.5rem minmax(0, 1fr);
    column-gap: var(--space-5);
  }

  .track__node {
    grid-row: span 2;
    margin-bottom: 0;
  }

  .track__step h3 {
    align-self: end;
  }
}
</style>
