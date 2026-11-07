<script setup lang="ts">
import { computed } from 'vue'
import { useTechFilter } from '../../composables/useTechFilter.ts'
import { projects } from '../../data/projects.ts'
import { skills } from '../../data/skills.ts'
import { projectsUsing, techsInUse, usageCount } from '../../lib/techFilter.ts'
import ProjectCard from '../projects/ProjectCard.vue'
import ProjectRow from '../projects/ProjectRow.vue'
import TechFilterBar from '../projects/TechFilterBar.vue'
import SectionHeading from '../ui/SectionHeading.vue'

const { active, setFilter } = useTechFilter()

const labels = new Map(skills.map((s) => [s.id, s.label]))
const skillLabel = (id: string) => labels.get(id) ?? id

// Most-used technologies first, so the chips people want are at the front.
const chips = techsInUse(projects, skills)
  .map((s, i) => ({ s, i, n: usageCount(projects, s.id) }))
  .sort((a, b) => b.n - a.n || a.i - b.i)
  .map(({ s }) => s)

const shown = computed(() => projectsUsing(projects, active.value))
const featured = computed(() => shown.value.filter((p) => p.featured))
const archive = computed(() => shown.value.filter((p) => !p.featured))

const status = computed(() => {
  const n = shown.value.length
  const noun = n === 1 ? 'project' : 'projects'
  return active.value ? `Showing ${n} ${noun} using ${skillLabel(active.value)}` : `Showing all ${n} ${noun}`
})
</script>

<template>
  <section id="projects" class="section projects" aria-labelledby="projects-title">
    <div class="container">
      <SectionHeading
        id="projects-title"
        title="Selected work"
        lede="Client sites and concept sites you can visit today, plus apps and systems I’ve built. Live sites open in a new tab; projects that aren’t hosted link to their source code."
      />

      <div class="projects__controls">
        <TechFilterBar :techs="chips" :active="active" @select="setFilter" />
        <div class="projects__status">
          <p aria-live="polite">{{ status }}</p>
          <button v-if="active" type="button" class="projects__clear" @click="setFilter(null)">Clear filter</button>
        </div>
      </div>

      <TransitionGroup tag="ol" name="list" class="featured">
        <li v-for="(p, i) in featured" :key="p.id" :data-project="p.id">
          <ProjectCard :project="p" :skill-label="skillLabel" :active-tech="active" :flip="i % 2 === 1" />
        </li>
      </TransitionGroup>

      <div v-if="archive.length" class="archive">
        <h3 class="archive__title">More on GitHub</h3>
        <TransitionGroup tag="ul" name="list" class="archive__list">
          <ProjectRow v-for="p in archive" :key="p.id" :project="p" :skill-label="skillLabel" :active-tech="active" />
        </TransitionGroup>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects__controls {
  display: grid;
  gap: var(--space-4);
  margin-bottom: var(--space-7);
}

.projects__status {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-2) var(--space-5);
  min-height: 1.6em;
}

.projects__status p {
  margin: 0;
  color: var(--muted);
  font-size: var(--step--1);
}

.projects__clear {
  padding: 0;
  background: none;
  border: 0;
  color: var(--accent);
  font-size: var(--step--1);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.22em;
  cursor: pointer;
}

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

/* Filter changes: a quick fade so it is clear what changed (instant under reduced motion). */
.list-enter-active,
.list-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

.list-leave-active {
  position: absolute;
  visibility: hidden;
}
</style>
