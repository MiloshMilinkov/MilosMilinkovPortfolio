<script setup lang="ts">
import { useI18n } from '../../i18n/index.ts'
import SectionHeading from '../ui/SectionHeading.vue'

const { t } = useI18n()
</script>

<template>
  <section id="process" class="section process" aria-labelledby="process-title">
    <div class="container">
      <SectionHeading id="process-title" :title="t.process.title" :lede="t.process.lede" />

      <ol class="steps">
        <li v-for="(step, i) in t.process.steps" :key="step.title" class="step card">
          <span class="step__number" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.steps {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-4);
  list-style: none;
  counter-reset: step;
}

.step {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-5);
}

/* A thin progress line along the top edge, filling step by step. */
.step::before {
  content: '';
  position: absolute;
  top: -1px;
  left: var(--space-5);
  right: var(--space-5);
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--accent), var(--cyan));
  transform-origin: left;
}

.step:nth-child(1)::before {
  transform: scaleX(0.25);
}

.step:nth-child(2)::before {
  transform: scaleX(0.5);
}

.step:nth-child(3)::before {
  transform: scaleX(0.75);
}

.step__number {
  color: var(--accent);
  font-size: var(--step--1);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.step p {
  margin: 0;
  color: var(--muted);
  font-size: var(--step--1);
  line-height: 1.6;
}

@media (max-width: 63.99rem) {
  .steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 35rem) {
  .steps {
    grid-template-columns: 1fr;
  }
}
</style>
