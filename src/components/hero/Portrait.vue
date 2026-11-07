<script setup lang="ts">
import { profile } from '../../data/profile.ts'
import { site } from '../../data/site.ts'
import ResponsiveImage from '../ui/ResponsiveImage.vue'
</script>

<template>
  <div class="portrait">
    <figure class="portrait__frame card">
      <ResponsiveImage
        base="portrait"
        :widths="[360]"
        sizes="(min-width: 56rem) 432px, min(24rem, 100vw)"
        :alt="profile.portraitAlt"
        :width="360"
        :height="360"
        eager
      />
      <figcaption class="portrait__caption">
        <span class="portrait__name">{{ site.name }}</span>
        <span class="portrait__role">{{ site.roleLine }}</span>
      </figcaption>
    </figure>
  </div>
</template>

<style scoped>
.portrait {
  position: relative;
  margin: 0;
}

/* Soft magenta light behind the photo. */
.portrait::before {
  content: '';
  position: absolute;
  /* Horizontal spread stays inside the 2rem page gutter. */
  inset: -12% -6% -6%;
  z-index: -1;
  background: radial-gradient(closest-side, rgb(217 70 239 / 0.3), rgb(34 211 238 / 0.06) 65%, transparent);
  pointer-events: none;
}

/* On phones the photo is near full width: keep the glow inside the screen. */
@media (max-width: 55.99rem) {
  .portrait::before {
    inset: -8% 0 -4%;
  }
}

.portrait__frame {
  position: relative;
  margin: 0;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  padding: 0;
  border-radius: var(--radius-lg);
}

.portrait__frame :deep(picture),
.portrait__frame :deep(img) {
  width: 100%;
  height: 100%;
}

.portrait__frame :deep(img) {
  object-fit: cover;
  object-position: 50% 30%;
}

.portrait__caption {
  position: absolute;
  inset: auto 0 0;
  display: grid;
  gap: 2px;
  padding: 3.5rem var(--space-5) var(--space-5);
  background: linear-gradient(to top, rgb(18 18 22 / 0.92), rgb(18 18 22 / 0.6) 55%, transparent);
}

.portrait__name {
  color: var(--text);
  font-size: var(--step-1);
  font-weight: 600;
  letter-spacing: -0.015em;
}

.portrait__role {
  color: var(--muted);
  font-size: var(--step--1);
}
</style>
