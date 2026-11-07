<script setup lang="ts">
import { projects } from '../../data/projects.ts'
import ProjectCard from '../projects/ProjectCard.vue'
import ProjectRow from '../projects/ProjectRow.vue'
import SectionHeading from '../ui/SectionHeading.vue'

const featured = projects.filter((p) => p.featured)
const archive = projects.filter((p) => !p.featured)
</script>

<template>
  <section id="projects" class="section projects" aria-labelledby="projects-title">
    <div class="container">
      <SectionHeading
        id="projects-title"
        title="Selected work"
        lede="Client sites and concept sites you can visit today, plus apps and systems I’ve built. Live sites open in a new tab; projects that aren’t hosted link to their source code."
      />

      <ol class="featured">
        <li v-for="(p, i) in featured" :key="p.id" :data-project="p.id">
          <ProjectCard :project="p" :flip="i % 2 === 1" />
        </li>
      </ol>

      <div v-if="archive.length" class="archive">
        <h3 class="archive__title">More on GitHub</h3>
        <ul class="archive__list">
          <ProjectRow v-for="p in archive" :key="p.id" :project="p" />
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured {
  list-style: none;
  display: grid;
  gap: clamp(1.5rem, 1rem + 2vw, 2.5rem);
  padding: 0;
}

.archive {
  margin-top: var(--space-8);
}

.archive__title {
  margin-bottom: var(--space-4);
}

.archive__list {
  list-style: none;
  padding: 0;
}
</style>
