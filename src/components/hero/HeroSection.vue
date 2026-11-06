<script setup lang="ts">
import { ref } from 'vue'
import { profile } from '../../data/profile.ts'
import { site } from '../../data/site.ts'
import BootSequence from './BootSequence.vue'
import Portrait from './Portrait.vue'
import WarpField from './WarpField.vue'

const portraitEl = ref<HTMLElement | null>(null)
</script>

<template>
  <section id="top" class="hero" aria-labelledby="hero-title">
    <WarpField :focus="portraitEl" />
    <div class="hero__shade" aria-hidden="true" />

    <div class="container hero__grid">
      <div class="hero__text">
        <BootSequence />
        <!-- Keep the spans on one line: the space between them is part of the name. -->
        <h1 id="hero-title" class="hero__name"><span>Miloš</span> <span>Milinkov</span></h1>
        <p class="hero__role">{{ site.roleLine }}</p>
        <p class="hero__lede">{{ profile.headline }}</p>
        <div class="hero__actions">
          <a class="btn btn--primary frame frame--br" href="#projects">View projects</a>
          <a class="btn btn--ghost frame frame--br" href="#contact">Contact</a>
        </div>
      </div>

      <div ref="portraitEl" class="hero__portrait">
        <Portrait />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: grid;
  align-items: center;
  min-height: calc(100svh - var(--header-h));
  padding-block: clamp(2.5rem, 2rem + 4vw, 6rem);
  overflow: hidden;
  isolation: isolate;
  background: radial-gradient(ellipse 60% 70% at 68% 45%, rgb(217 65 43 / 0.1), transparent 70%);
}

.hero :deep(.warp) {
  z-index: -2;
}

/* Keeps the text side calm so the warp never fights the copy. */
.hero__shade {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(90deg, rgb(11 12 14 / 0.92) 0%, rgb(11 12 14 / 0.7) 36%, transparent 64%),
    linear-gradient(to top, var(--void), transparent 18%);
  pointer-events: none;
}

.hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 21rem);
  align-items: center;
  gap: clamp(2rem, 5vw, 5rem);
}

.hero__name {
  display: flex;
  flex-direction: column;
  font-size: var(--step-4);
  line-height: 0.9;
  letter-spacing: -0.005em;
}

@media (prefers-reduced-motion: no-preference) {
  /* One ignition flare as the boot sequence finishes; the text itself is never hidden. */
  .hero__name span {
    animation: ignite 1.6s var(--ease-out) 0.2s both;
  }

  .hero__name span + span {
    animation-delay: 0.35s;
  }
}

@keyframes ignite {
  0% {
    color: #fff3e6;
    text-shadow:
      0 0 18px rgb(255 90 60 / 0.9),
      0 0 46px rgb(217 65 43 / 0.6);
  }
  100% {
    color: var(--bone);
    text-shadow: 0 0 0 transparent;
  }
}

.hero__role {
  margin: var(--space-5) 0 var(--space-4);
  color: var(--brass);
  font-size: var(--step-1);
  font-weight: 500;
  letter-spacing: 0.01em;
  max-width: 48ch;
  text-wrap: balance;
}

.hero__lede {
  color: var(--steel);
  font-size: var(--step-1);
  max-width: 44ch;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.hero__portrait {
  justify-self: end;
  width: 100%;
}

@media (max-width: 47.99rem) {
  .hero__grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .hero__portrait {
    order: -1;
    justify-self: start;
    width: 10.5rem;
  }

  .hero__shade {
    background: linear-gradient(to top, var(--void) 10%, rgb(11 12 14 / 0.72) 60%, rgb(11 12 14 / 0.35));
  }
}
</style>
