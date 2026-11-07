<script setup lang="ts">
import { services } from '../../data/services.ts'
import Icon from '../ui/Icon.vue'
import SectionHeading from '../ui/SectionHeading.vue'
</script>

<template>
  <section id="services" class="section services" aria-labelledby="services-title">
    <div class="container">
      <SectionHeading
        id="services-title"
        title="What I can build for you"
        lede="From a first business website to a custom web app, designed, built and hosted by one developer who answers your emails."
      />

      <ul class="services__grid">
        <li v-for="(s, i) in services" :key="s.id" class="service card" :class="{ 'card--glow': i === 0 }">
          <span class="chip-icon" :class="{ 'chip-icon--accent': i === 0 }"><Icon :name="s.icon" /></span>
          <h3>{{ s.title }}</h3>
          <p class="service__summary">{{ s.summary }}</p>
          <ul class="service__includes" :aria-label="`${s.title} includes`">
            <li v-for="item in s.includes" :key="item"><Icon name="check" />{{ item }}</li>
          </ul>
        </li>
      </ul>

      <div class="services__cta card">
        <p>Not sure what you need? Describe your business and I’ll suggest the simplest option, with a free quote.</p>
        <a class="btn btn--primary" href="#contact">Get a free quote <Icon name="arrow" /></a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);
  list-style: none;
}

.service {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: clamp(1.25rem, 1rem + 1vw, 2rem);
}

.service h3 {
  margin-top: var(--space-3);
}

.service__summary {
  margin: 0;
  color: var(--muted);
}

.service__includes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-2) var(--space-4);
  margin-top: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid var(--border);
  list-style: none;
  font-size: var(--step--1);
}

.service__includes li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
}

.service__includes svg {
  width: 1rem;
  height: 1rem;
  margin-top: 0.2em;
  flex: none;
  color: var(--accent);
}

.services__cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-top: var(--space-4);
  padding: var(--space-5) clamp(1.25rem, 1rem + 1vw, 2rem);
}

.services__cta p {
  margin: 0;
  color: var(--muted);
  max-width: 52ch;
}

@media (max-width: 47.99rem) {
  .services__grid,
  .service__includes {
    grid-template-columns: 1fr;
  }
}
</style>
