<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { prefersReducedMotion } from '../../composables/useReducedMotion.ts'
import { useTechFilter } from '../../composables/useTechFilter.ts'
import { projects } from '../../data/projects.ts'
import { skillGroups, skills, tierLabel } from '../../data/skills.ts'
import type { Skill, SkillGroup } from '../../data/types.ts'
import { projectsUsing, usageCount } from '../../lib/techFilter.ts'
import SectionHeading from '../ui/SectionHeading.vue'

const TIER_SEGMENTS: Record<Skill['tier'], number> = { core: 3, proficient: 2, familiar: 1 }

const activeGroup = ref<SkillGroup>(skillGroups[0]!.id)
const selected = ref<Skill | null>(null)
const tabRefs = ref<HTMLButtonElement[]>([])
const { setFilter } = useTechFilter()

const skillsIn = (group: SkillGroup) => skills.filter((s) => s.group === group)
const usageText = (id: string) => {
  const n = usageCount(projects, id)
  return n === 0 ? '' : `Used in ${n} project${n === 1 ? '' : 's'}`
}
const selectedProjects = computed(() => (selected.value ? projectsUsing(projects, selected.value.id) : []))

function selectTab(index: number, focus = false) {
  const count = skillGroups.length
  const i = (index + count) % count
  activeGroup.value = skillGroups[i]!.id
  if (focus) tabRefs.value[i]?.focus()
}

/** ARIA tabs pattern: arrows wrap, Home/End jump; selection follows focus. */
function onTabKeydown(event: KeyboardEvent, index: number) {
  const keys: Record<string, number> = {
    ArrowRight: index + 1,
    ArrowDown: index + 1,
    ArrowLeft: index - 1,
    ArrowUp: index - 1,
    Home: 0,
    End: skillGroups.length - 1,
  }
  const next = keys[event.key]
  if (next === undefined) return
  event.preventDefault()
  selectTab(next, true)
}

function toggleSkill(skill: Skill) {
  selected.value = selected.value?.id === skill.id ? null : skill
}

async function showInProjects() {
  if (!selected.value) return
  setFilter(selected.value.id)
  await nextTick()
  document.getElementById('projects')?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  document.getElementById('projects-title')?.focus({ preventScroll: true })
}
</script>

<template>
  <section id="skills" class="section skills" aria-labelledby="skills-title">
    <div class="container">
      <SectionHeading
        id="skills-title"
        title="Skills"
        lede="Pick a skill to see where I’ve used it — then jump straight to those projects."
      />

      <div class="skills__console frame">
        <div class="skills__tabs" role="tablist" aria-label="Skill groups" aria-orientation="vertical">
          <button
            v-for="(group, i) in skillGroups"
            :id="`tab-${group.id}`"
            :key="group.id"
            ref="tabRefs"
            class="skills__tab"
            type="button"
            role="tab"
            :aria-selected="activeGroup === group.id ? 'true' : 'false'"
            :aria-controls="`panel-${group.id}`"
            :tabindex="activeGroup === group.id ? 0 : -1"
            @click="selectTab(i)"
            @keydown="onTabKeydown($event, i)"
          >
            {{ group.label }}
          </button>
        </div>

        <div class="skills__panels">
          <div
            v-for="group in skillGroups"
            :id="`panel-${group.id}`"
            :key="group.id"
            class="skills__panel"
            role="tabpanel"
            :aria-labelledby="`tab-${group.id}`"
            tabindex="0"
            :hidden="activeGroup !== group.id"
          >
            <p class="skills__blurb">{{ group.blurb }}</p>
            <ul class="skills__grid">
              <li v-for="skill in skillsIn(group.id)" :key="skill.id">
                <button
                  class="skill"
                  type="button"
                  :aria-pressed="selected?.id === skill.id ? 'true' : 'false'"
                  @click="toggleSkill(skill)"
                >
                  <span class="skill__label">{{ skill.label }}</span>
                  <span class="skill__meta">
                    <span class="meter" aria-hidden="true">
                      <i v-for="n in 3" :key="n" :class="{ on: n <= TIER_SEGMENTS[skill.tier] }" />
                    </span>
                    <span class="skill__tier">{{ tierLabel[skill.tier] }}</span>
                    <span v-if="usageText(skill.id)" class="skill__usage">{{ usageText(skill.id) }}</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>

          <div class="readout" aria-live="polite">
            <template v-if="selected">
              <p class="readout__title">
                <strong>{{ selected.label }}</strong>
                <span v-if="selectedProjects.length"> in these projects:</span>
                <span v-else> is part of my everyday work rather than one listed project.</span>
              </p>
              <ul v-if="selectedProjects.length" class="readout__list">
                <li v-for="p in selectedProjects" :key="p.id">{{ p.title }}</li>
              </ul>
              <button
                v-if="selectedProjects.length"
                class="btn btn--ghost frame frame--br readout__go"
                type="button"
                @click="showInProjects"
              >
                Show in projects
              </button>
            </template>
            <p v-else class="readout__hint">Select a skill to see the projects that use it.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills__console {
  --chamfer: 22px;
  display: grid;
  grid-template-columns: 12rem minmax(0, 1fr);
}

.skills__tabs {
  display: flex;
  flex-direction: column;
  padding: var(--space-5) 0;
  border-right: 1px solid var(--plate);
}

.skills__tab {
  position: relative;
  padding: var(--space-3) var(--space-5);
  background: none;
  border: 0;
  color: var(--steel);
  /* Body face: blackletter capitals (e.g. "AI") are hard to read at this size. */
  font-family: var(--font-body);
  font-size: var(--step-1);
  font-weight: 600;
  letter-spacing: 0.01em;
  text-align: left;
  cursor: pointer;
  transition: color 0.15s;
}

.skills__tab:hover {
  color: var(--bone);
}

.skills__tab[aria-selected='true'] {
  color: var(--brass);
}

.skills__tab[aria-selected='true']::before {
  content: '';
  position: absolute;
  left: 0;
  top: 22%;
  bottom: 22%;
  width: 3px;
  background: var(--ember);
}

.skills__tab:focus-visible {
  outline-offset: -4px;
}

.skills__panels {
  padding: clamp(1.25rem, 1rem + 1.5vw, 2.5rem);
  min-width: 0;
}

.skills__panel:focus-visible {
  outline-offset: 6px;
}

.skills__blurb {
  color: var(--steel);
  margin-bottom: var(--space-5);
}

.skills__grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 14.5rem), 1fr));
  gap: var(--space-3);
}

.skill {
  display: grid;
  gap: var(--space-2);
  width: 100%;
  height: 100%;
  padding: var(--space-3) var(--space-4);
  background: var(--void);
  border: 1px solid var(--plate);
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s;
}

.skill:hover {
  border-color: var(--brass-dim);
}

.skill[aria-pressed='true'] {
  border-color: var(--brass);
  background: rgb(200 163 90 / 0.08);
}

.skill__label {
  font-weight: 600;
  color: var(--bone);
}

.skill__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-1) var(--space-3);
  font-size: var(--step--1);
  color: var(--steel);
}

.meter {
  display: inline-flex;
  gap: 3px;
}

.meter i {
  width: 14px;
  height: 6px;
  background: var(--plate);
  clip-path: polygon(0 0, 75% 0, 100% 100%, 25% 100%);
}

.meter i.on {
  background: var(--brass);
}

.skill__usage {
  color: var(--brass);
}

.readout {
  margin-top: var(--space-6);
  padding-top: var(--space-5);
  border-top: 1px dashed var(--plate);
  min-height: 5.5rem;
}

.readout__hint {
  margin: 0;
  color: var(--steel);
}

.readout__title {
  margin-bottom: var(--space-3);
  color: var(--steel);
}

.readout__title strong {
  color: var(--bone);
}

.readout__list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-5);
  margin-bottom: var(--space-5);
}

.readout__list li::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: var(--space-2);
  background: var(--ember);
  transform: rotate(45deg) translateY(-2px);
}

@media (max-width: 47.99rem) {
  .skills__console {
    grid-template-columns: 1fr;
  }

  .skills__tabs {
    flex-direction: row;
    overflow-x: auto;
    padding: var(--space-2) var(--space-3) 0;
    border-right: 0;
    border-bottom: 1px solid var(--plate);
    scrollbar-width: none;
  }

  .skills__tab {
    padding: var(--space-3);
    font-size: var(--step-0);
    white-space: nowrap;
  }

  .skills__tab[aria-selected='true']::before {
    left: 20%;
    right: 20%;
    top: auto;
    bottom: 0;
    width: auto;
    height: 3px;
  }
}
</style>
