<script setup lang="ts">
import { education, roles } from '../../data/experience.ts'
import SectionHeading from '../ui/SectionHeading.vue'
</script>

<template>
  <section id="experience" class="section experience" aria-labelledby="experience-title">
    <div class="container">
      <SectionHeading id="experience-title" title="Experience" lede="Most recent first. Open an entry for the details." />

      <ol class="timeline">
        <li v-for="(role, i) in roles" :key="role.org + role.title" class="timeline__item">
          <details class="entry" :open="i === 0">
            <summary class="entry__summary">
              <span class="entry__period">{{ role.period }}</span>
              <span class="entry__heading">
                <span class="entry__title">{{ role.title }}</span>
                <span class="entry__org">{{ role.org }}, {{ role.place }}</span>
              </span>
              <span class="entry__toggle" aria-hidden="true" />
            </summary>
            <ul class="entry__points">
              <li v-for="(point, j) in role.points" :key="j">
                <strong v-if="point.label">{{ point.label }}: </strong>{{ point.text }}
              </li>
            </ul>
          </details>
        </li>

        <li v-for="edu in education" :key="edu.school" class="timeline__item timeline__item--edu">
          <details class="entry">
            <summary class="entry__summary">
              <span class="entry__period">{{ edu.period }}</span>
              <span class="entry__heading">
                <span class="entry__title">{{ edu.degree }}</span>
                <span class="entry__org">{{ edu.school }}, {{ edu.place }}</span>
              </span>
              <span class="entry__toggle" aria-hidden="true" />
            </summary>
            <ul class="entry__points">
              <li v-for="(point, j) in edu.points" :key="j">{{ point }}</li>
            </ul>
          </details>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  --rail: 9.5rem;
  position: relative;
  list-style: none;
  padding: 0;
  max-width: 62rem;
}

/* The brass rail with a node per entry. */
.timeline::before {
  content: '';
  position: absolute;
  top: 0.6rem;
  bottom: 0.6rem;
  left: var(--rail);
  width: 1px;
  background: linear-gradient(to bottom, var(--brass), var(--brass-dim) 70%, transparent);
}

.timeline__item {
  position: relative;
}

.timeline__item::before {
  content: '';
  position: absolute;
  top: 1.55rem;
  left: calc(var(--rail) - 5px);
  width: 11px;
  height: 11px;
  background: var(--void);
  border: 1px solid var(--brass);
  transform: rotate(45deg);
}

.timeline__item:first-child::before {
  background: var(--ember);
  border-color: var(--ember);
}

.timeline__item--edu::before {
  border-color: var(--steel);
}

.entry__summary {
  display: grid;
  grid-template-columns: var(--rail) minmax(0, 1fr) auto;
  gap: var(--space-5);
  align-items: baseline;
  padding: var(--space-4) 0;
  list-style: none;
  cursor: pointer;
}

.entry__summary::-webkit-details-marker {
  display: none;
}

.entry__period {
  padding-right: var(--space-6);
  color: var(--brass);
  font-size: var(--step--1);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.entry__heading {
  display: grid;
  gap: var(--space-1);
  padding-left: var(--space-5);
}

.entry__title {
  font-family: var(--font-display);
  font-size: var(--step-2);
  font-weight: 700;
  line-height: 1.1;
  color: var(--bone);
}

.entry__org {
  color: var(--steel);
}

.entry__toggle {
  width: 0.7rem;
  height: 0.7rem;
  border-right: 2px solid var(--brass-dim);
  border-bottom: 2px solid var(--brass-dim);
  transform: translateY(-0.2rem) rotate(45deg);
  transition: transform 0.2s;
}

.entry[open] .entry__toggle {
  transform: translateY(0.1rem) rotate(225deg);
}

.entry__summary:hover .entry__title {
  color: var(--brass);
}

.entry__summary:focus-visible {
  outline-offset: 2px;
}

.entry__points {
  display: grid;
  gap: var(--space-3);
  margin: 0 0 var(--space-5) calc(var(--rail) + var(--space-5) + var(--space-5));
  padding-left: 1.1em;
  color: var(--steel);
  max-width: var(--measure);
}

.entry__points strong {
  color: var(--bone);
  font-weight: 600;
}

.entry__points li::marker {
  color: var(--brass-dim);
}

@media (max-width: 47.99rem) {
  .timeline {
    --rail: 0.4rem;
  }

  .entry__summary {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: var(--space-1) var(--space-4);
    padding-left: var(--space-5);
  }

  .entry__period {
    grid-column: 1;
    padding: 0;
  }

  .entry__heading {
    grid-column: 1;
    padding: 0;
  }

  .entry__toggle {
    grid-column: 2;
    grid-row: 1 / span 2;
    align-self: center;
  }

  .entry__points {
    margin-left: calc(var(--space-5) + 1.1em);
  }
}
</style>
