<script setup lang="ts">
import { profile } from '../../data/profile.ts'
import ResponsiveImage from '../ui/ResponsiveImage.vue'
</script>

<template>
  <figure class="portrait">
    <!-- Lancet-arch window; clipPath in objectBoundingBox units scales with the element. -->
    <svg width="0" height="0" class="portrait__defs" aria-hidden="true" focusable="false">
      <clipPath id="lancet" clipPathUnits="objectBoundingBox">
        <path d="M0.5 0C0.76 0.1 0.98 0.3 1 0.56V1H0V0.56C0.02 0.3 0.24 0.1 0.5 0Z" />
      </clipPath>
    </svg>
    <div class="portrait__frame">
      <div class="portrait__window">
        <ResponsiveImage
          base="portrait"
          :widths="[240, 360]"
          sizes="(min-width: 48rem) 340px, 168px"
          :alt="profile.portraitAlt"
          :width="360"
          :height="360"
          eager
        />
      </div>
    </div>
  </figure>
</template>

<style scoped>
.portrait {
  position: relative;
  margin: 0;
  width: 100%;
}

.portrait__defs {
  position: absolute;
}

/* Glow of the warp behind the window. */
.portrait::before {
  content: '';
  position: absolute;
  inset: -18% -22%;
  z-index: -1;
  background: radial-gradient(closest-side, rgb(217 65 43 / 0.28), rgb(200 163 90 / 0.08) 55%, transparent);
  pointer-events: none;
}

.portrait__frame {
  aspect-ratio: 4 / 5;
  padding: 4px;
  background: linear-gradient(160deg, var(--brass), var(--brass-dim) 60%, #5d4b2a);
  clip-path: url(#lancet);
}

.portrait__window {
  position: relative;
  height: 100%;
  clip-path: url(#lancet);
  background: var(--gunmetal);
}

.portrait__window :deep(picture) {
  height: 100%;
}

.portrait__window :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 30%;
  filter: grayscale(0.3) contrast(1.06) brightness(0.92);
}

/* Ember light from below + scanlines, like a viewport glass. */
.portrait__window::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(to bottom, transparent 0 2px, rgb(0 0 0 / 0.14) 2px 3px),
    linear-gradient(to top, rgb(217 65 43 / 0.28), transparent 45%);
  mix-blend-mode: multiply;
  pointer-events: none;
}
</style>
