<script setup lang="ts">
import { ref } from 'vue'
import { useInView } from '../../composables/useInView.ts'
import { profile } from '../../data/profile.ts'
import SectionHeading from '../ui/SectionHeading.vue'
import StatTile from './StatTile.vue'

const statsEl = ref<HTMLElement | null>(null)
const statsInView = useInView(statsEl)
</script>

<template>
  <section id="about" class="section about" aria-labelledby="about-title">
    <div class="container">
      <SectionHeading id="about-title" title="About" />

      <div class="about__grid">
        <div class="about__bio">
          <p v-for="(paragraph, i) in profile.bio" :key="i" :class="{ 'about__lead': i === 0 }">{{ paragraph }}</p>

          <div class="about__facts">
            <div>
              <h3 class="about__facts-title">Interests</h3>
              <ul class="about__list">
                <li v-for="item in profile.interests" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div>
              <h3 class="about__facts-title">Languages</h3>
              <ul class="about__list">
                <li v-for="item in profile.languages" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>

        <ul ref="statsEl" class="about__stats" aria-label="At a glance">
          <StatTile v-for="stat in profile.stats" :key="stat.label" :stat="stat" :start="statsInView" />
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: clamp(2.5rem, 6vw, 6rem);
  align-items: start;
}

.about__bio p {
  color: var(--steel);
}

.about__bio .about__lead {
  color: var(--bone);
  font-size: var(--step-1);
  line-height: 1.55;
}

.about__facts {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5) var(--space-8);
  margin-top: var(--space-6);
}

.about__facts-title {
  margin-bottom: var(--space-2);
  font-family: var(--font-body);
  font-size: var(--step--1);
  font-weight: 600;
  color: var(--brass);
  letter-spacing: 0.04em;
}

.about__list {
  list-style: none;
  display: grid;
  gap: var(--space-1);
}

.about__list li::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: var(--space-3);
  background: var(--brass-dim);
  transform: rotate(45deg) translateY(-2px);
}

.about__stats {
  list-style: none;
}

@media (max-width: 55rem) {
  .about__grid {
    grid-template-columns: 1fr;
  }
}
</style>
