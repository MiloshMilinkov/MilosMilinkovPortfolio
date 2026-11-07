<script setup lang="ts">
import { profile } from '../../data/profile.ts'
import { site } from '../../data/site.ts'
import ResponsiveImage from '../ui/ResponsiveImage.vue'
</script>

<template>
  <figure class="portrait card">
    <div class="portrait__photo">
      <ResponsiveImage
        base="portrait"
        :widths="[240, 360]"
        sizes="(min-width: 56rem) 180px, 96px"
        :alt="profile.portraitAlt"
        :width="360"
        :height="360"
        eager
      />
    </div>
    <figcaption>
      <span class="portrait__name">{{ site.name }}</span>
      <span class="portrait__role">{{ site.roleLine }}</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.portrait {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin: 0;
  padding: var(--space-4);
}

.portrait__photo {
  width: 4.5rem;
  aspect-ratio: 1;
  flex: none;
  overflow: hidden;
  border-radius: 14px;
  box-shadow: 0 0 0 1px var(--border-strong);
}

.portrait__photo :deep(picture),
.portrait__photo :deep(img) {
  width: 100%;
  height: 100%;
}

.portrait__photo :deep(img) {
  object-fit: cover;
  object-position: 50% 25%;
}

figcaption {
  display: grid;
  gap: 2px;
}

.portrait__name {
  font-weight: 600;
  color: var(--text);
}

.portrait__role {
  color: var(--muted);
  font-size: var(--step--1);
}
</style>
