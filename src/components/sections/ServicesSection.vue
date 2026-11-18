<script setup lang="ts">
import { services } from '../../data/services.ts'
import { useI18n } from '../../i18n/index.ts'
import Icon from '../ui/Icon.vue'
import SectionHeading from '../ui/SectionHeading.vue'
import ServiceArt from '../ui/ServiceArt.vue'

const { t } = useI18n()
</script>

<template>
  <section id="services" class="section services" aria-labelledby="services-title">
    <div class="container">
      <SectionHeading id="services-title" :title="t.services.title" :lede="t.services.lede" />

      <ul class="services__grid">
        <li v-for="id in services" :key="id" class="service card">
          <div class="service__art"><ServiceArt :kind="id" /></div>
          <h3>{{ t.services.items[id].title }}</h3>
          <p class="service__summary">{{ t.services.items[id].summary }}</p>
          <ul class="service__includes check-list" :aria-label="t.services.includesLabel(t.services.items[id].title)">
            <li v-for="item in t.services.items[id].includes" :key="item"><Icon name="check" />{{ item }}</li>
          </ul>
        </li>
      </ul>

      <div class="services__cta card">
        <p>{{ t.services.ctaText }}</p>
        <a class="btn btn--primary" href="#contact">{{ t.services.ctaButton }}</a>
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
  padding: var(--space-3) var(--space-3) clamp(1.25rem, 1rem + 1vw, 1.75rem);
}

.service > :not(.service__art) {
  margin-inline: clamp(0.5rem, 0.25rem + 0.8vw, 1rem);
}

/* Illustration panel: the scene on a softly lit surface. */
.service__art {
  display: grid;
  place-items: center;
  padding: var(--space-5) var(--space-5) var(--space-4);
  border-radius: calc(var(--radius) - 8px);
  background:
    radial-gradient(ellipse 70% 90% at 50% 0%, rgb(var(--accent-rgb) / 0.12), transparent 70%),
    var(--surface-2);
  border: 1px solid var(--border);
}

.service__art :deep(svg) {
  max-width: 22rem;
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
  margin-top: auto;
  padding-top: var(--space-4);
  border-top: 1px solid var(--border);
  font-size: var(--step--1);
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
