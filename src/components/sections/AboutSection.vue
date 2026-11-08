<script setup lang="ts">
import { useI18n } from '../../i18n/index.ts'
import SectionHeading from '../ui/SectionHeading.vue'

const { t } = useI18n()
</script>

<template>
  <section id="about" class="section about" aria-labelledby="about-title">
    <div class="container about__grid">
      <div>
        <SectionHeading id="about-title" :title="t.about.title" />
        <p v-for="(paragraph, i) in t.about.bio" :key="i" :class="{ about__lead: i === 0 }">{{ paragraph }}</p>
      </div>

      <aside class="about__facts card" :aria-label="t.about.factsLabel">
        <div>
          <h3 class="about__facts-title">{{ t.about.basedIn }}</h3>
          <p>{{ t.about.location }}</p>
        </div>
        <div>
          <h3 class="about__facts-title">{{ t.about.languagesTitle }}</h3>
          <ul class="about__list">
            <li v-for="item in t.about.languages" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div>
          <h3 class="about__facts-title">{{ t.about.interestsTitle }}</h3>
          <ul class="about__list">
            <li v-for="item in t.about.interests" :key="item">{{ item }}</li>
          </ul>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.about__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: start;
}

.about p {
  color: var(--muted);
}

.about .about__lead {
  color: var(--text);
  font-size: var(--step-1);
  line-height: 1.55;
}

.about__facts {
  display: grid;
  gap: var(--space-5);
  padding: var(--space-5);
}

.about__facts p {
  margin: 0;
  color: var(--text);
}

.about__facts-title {
  margin-bottom: var(--space-2);
  color: var(--subtle);
  font-size: var(--step--1);
  font-weight: 500;
  letter-spacing: 0;
}

.about__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  list-style: none;
}

.about__list li {
  padding: 0.15em 0.7em;
  border-radius: 8px;
  background: rgb(255 255 255 / 0.05);
  font-size: var(--step--1);
}

@media (max-width: 55rem) {
  .about__grid {
    grid-template-columns: 1fr;
  }
}
</style>
