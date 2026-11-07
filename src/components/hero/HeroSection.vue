<script setup lang="ts">
import { ref } from 'vue'
import { useInView } from '../../composables/useInView.ts'
import { profile } from '../../data/profile.ts'
import { projects } from '../../data/projects.ts'
import Icon from '../ui/Icon.vue'
import StatTile from '../sections/StatTile.vue'
import Portrait from './Portrait.vue'

const statsEl = ref<HTMLElement | null>(null)
const statsInView = useInView(statsEl, { rootMargin: '0px' })
const liveCount = projects.filter((p) => p.status === 'live' && !p.concept).length
</script>

<template>
  <section id="top" class="hero" aria-labelledby="hero-title">
    <div class="container hero__grid">
      <div class="hero__text">
        <p class="pill hero__pill"><span class="pill__dot" aria-hidden="true" />Websites and web apps for businesses</p>
        <h1 id="hero-title" class="hero__title">{{ profile.headline }}</h1>
        <p class="hero__lede">{{ profile.heroLead }}</p>
        <div class="hero__actions">
          <a class="btn btn--primary" href="#contact">Start a project <Icon name="arrow" /></a>
          <a class="btn btn--ghost" href="#projects">See my work</a>
        </div>
      </div>

      <Portrait class="hero__portrait" />
    </div>

    <div class="container hero__strip">
      <div class="card card--glow hero__live">
        <span class="chip-icon chip-icon--accent"><Icon name="rocket" /></span>
        <div>
          <p class="hero__live-value">{{ liveCount }} client sites live</p>
          <p class="hero__live-text">A law office and a fitness coach, both built, launched and maintained by me.</p>
        </div>
      </div>
      <ul ref="statsEl" class="hero__stats" aria-label="At a glance">
        <StatTile v-for="stat in profile.stats" :key="stat.label" :stat="stat" :start="statsInView" />
      </ul>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-block: clamp(2.5rem, 2rem + 4vw, 5.5rem) clamp(3rem, 2rem + 4vw, 5rem);
}

.hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.85fr);
  align-items: center;
  gap: clamp(2.5rem, 6vw, 5.5rem);
}

.hero__pill {
  margin-bottom: var(--space-5);
}

.hero__title {
  font-size: var(--step-4);
  font-weight: 650;
  line-height: 1.02;
  letter-spacing: -0.04em;
  max-width: 14ch;
}

.hero__lede {
  margin: var(--space-5) 0 0;
  color: var(--muted);
  font-size: var(--step-1);
  line-height: 1.55;
  max-width: 48ch;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.hero__portrait {
  width: 100%;
  max-width: 27rem;
  justify-self: end;
}

/* Proof strip under the hero: live sites + stat tiles. */
.hero__strip {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 2fr);
  gap: var(--space-3);
  margin-top: clamp(2.5rem, 2rem + 3vw, 4rem);
}

.hero__live {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-5);
}

.hero__live-value {
  margin: 0 0 var(--space-1);
  font-size: var(--step-2);
  font-weight: 600;
  letter-spacing: -0.02em;
}

.hero__live-text {
  margin: 0;
  color: var(--muted);
  font-size: var(--step--1);
}

.hero__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-3);
  list-style: none;
}

@media (prefers-reduced-motion: no-preference) {
  .hero__text > *,
  .hero__portrait,
  .hero__strip > * {
    animation: rise 0.7s var(--ease-out) both;
  }

  .hero__text > :nth-child(2) {
    animation-delay: 0.05s;
  }

  .hero__text > :nth-child(3) {
    animation-delay: 0.1s;
  }

  .hero__text > :nth-child(4) {
    animation-delay: 0.15s;
  }

  .hero__portrait {
    animation-delay: 0.12s;
  }

  .hero__strip > * {
    animation-delay: 0.25s;
  }
}

/* One orchestrated entrance; translate only, so the heading (LCP) is painted at once. */
@keyframes rise {
  from {
    transform: translateY(14px);
  }
}

@media (max-width: 55.99rem) {
  .hero__grid,
  .hero__strip {
    grid-template-columns: 1fr;
  }

  .hero__portrait {
    justify-self: start;
    max-width: 24rem;
  }
}
</style>
