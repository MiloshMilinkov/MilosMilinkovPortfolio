<script setup lang="ts">
import { projects } from '../../data/projects.ts'
import { cardSize, projectGroup } from '../../lib/projectLinks.ts'
import ProjectCard from '../projects/ProjectCard.vue'
import ProjectRow from '../projects/ProjectRow.vue'
import SectionHeading from '../ui/SectionHeading.vue'
import { useI18n } from '../../i18n/index.ts'

const { t } = useI18n()

const featured = projects.filter((p) => p.featured)
const groups = (['client', 'concept', 'apps'] as const)
  .map((id) => ({ id, items: featured.filter((p) => projectGroup(p) === id).map((p) => ({ p, size: cardSize(p) })) }))
  .filter((g) => g.items.length > 0)
const archive = projects.filter((p) => !p.featured)
</script>

<template>
  <section id="projects" class="section section--band projects" aria-labelledby="projects-title">
    <div class="container">
      <SectionHeading id="projects-title" :title="t.projects.title" :lede="t.projects.lede" />

      <div v-for="group in groups" :key="group.id" class="group" :class="`group--${group.id}`">
        <div class="group__head">
          <h3 :id="`work-${group.id}`" class="group__title">{{ t.projects.groups[group.id].title }}</h3>
          <p class="group__text">{{ t.projects.groups[group.id].text }}</p>
        </div>
        <ul class="group__grid" :aria-labelledby="`work-${group.id}`">
          <li v-for="{ p, size } in group.items" :key="p.id" :data-project="p.id" :data-size="size">
            <ProjectCard :project="p" :size="size" />
          </li>
        </ul>
      </div>

      <div v-if="archive.length" class="archive">
        <h3 class="archive__title">{{ t.projects.archiveTitle }}</h3>
        <ul class="archive__list">
          <ProjectRow v-for="p in archive" :key="p.id" :project="p" />
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.group + .group {
  margin-top: clamp(3.5rem, 2.5rem + 3vw, 5.5rem);
}

.group__head {
  display: grid;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
  padding-left: var(--space-4);
  border-left: 3px solid var(--accent);
}

.group--concept .group__head {
  border-left-color: var(--peach);
}

.group--apps .group__head {
  border-left-color: var(--sky);
}

.group__title {
  font-size: var(--step-2);
}

.group__text {
  margin: 0;
  color: var(--muted);
}

.group__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: clamp(1rem, 0.75rem + 1vw, 1.5rem);
  list-style: none;
}

/* One grid for every group; the card size decides the span. */
@media (min-width: 40rem) {
  .group__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .group__grid > [data-size='large'] {
    grid-column: 1 / -1;
  }
}

@media (min-width: 56rem) {
  .group__grid > [data-size='large'] {
    grid-column: auto;
  }
}

@media (min-width: 64rem) {
  .group__grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  .group__grid > li {
    grid-column: span 2;
  }

  .group__grid > [data-size='large'],
  .group__grid > [data-size='medium'] {
    grid-column: span 3;
  }
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
