<script setup lang="ts">
import { site } from '../../data/site.ts'
import { LOCALES, localeInfo, useI18n } from '../../i18n/index.ts'
import Icon from '../ui/Icon.vue'
import SectionHeading from '../ui/SectionHeading.vue'

const { t, locale } = useI18n()
const otherLocales = LOCALES.filter((l) => l !== locale)
const reasonIcons = ['briefcase', 'spark', 'shield'] as const
</script>

<template>
  <section id="hosting" class="section hosting" aria-labelledby="hosting-title">
    <div class="container">
      <SectionHeading id="hosting-title" :title="t.hosting.title" :lede="t.hosting.lede" />

      <ul class="hosting__reasons">
        <li v-for="(reason, i) in t.hosting.reasons" :key="reason.title" class="reason card">
          <span class="chip-icon" :class="{ 'chip-icon--accent': i === 0 }"><Icon :name="reasonIcons[i] ?? 'check'" /></span>
          <h3>{{ reason.title }}</h3>
          <p>{{ reason.text }}</p>
        </li>
      </ul>

      <div class="hosting__grid">
        <div class="hosting__steps card">
          <h3>{{ t.hosting.stepsTitle }}</h3>
          <ol>
            <li v-for="(step, i) in t.hosting.steps" :key="step.title">
              <span class="hosting__num" aria-hidden="true">{{ i + 1 }}</span>
              <div>
                <h4>{{ step.title }}</h4>
                <p>{{ step.text }}</p>
                <p v-if="i === 1" class="hosting__email">{{ site.email }}</p>
              </div>
            </li>
          </ol>
        </div>

        <div class="hosting__side">
          <div class="hosting__note hosting__note--warn card">
            <h3>{{ t.hosting.neverTitle }}</h3>
            <ul>
              <li v-for="item in t.hosting.never" :key="item">{{ item }}</li>
            </ul>
          </div>

          <div class="hosting__note card">
            <h3>{{ t.hosting.costsTitle }}</h3>
            <p>{{ t.hosting.costs }}</p>
          </div>

          <div class="hosting__guide card card--glow">
            <h3>{{ t.hosting.guideTitle }}</h3>
            <p>{{ t.hosting.guideText }}</p>
            <a class="btn btn--primary" :href="site.guide(locale)" download type="application/pdf">
              <Icon name="download" />{{ t.hosting.guideButton }}
            </a>
            <p class="hosting__other">
              {{ t.hosting.guideOther }}
              <template v-for="(l, i) in otherLocales" :key="l">
                <a :href="site.guide(l)" :hreflang="localeInfo[l].htmlLang" :lang="localeInfo[l].htmlLang" download type="application/pdf">{{
                  localeInfo[l].name
                }}</a
                ><template v-if="i < otherLocales.length - 1">, </template>
              </template>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hosting__reasons {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-4);
  list-style: none;
  margin-bottom: var(--space-4);
}

.reason {
  display: grid;
  align-content: start;
  gap: var(--space-3);
  padding: var(--space-5);
}

.reason h3 {
  margin-top: var(--space-2);
}

.reason p {
  margin: 0;
  color: var(--muted);
}

.hosting__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: var(--space-4);
  align-items: start;
}

.hosting__steps {
  padding: clamp(1.25rem, 1rem + 1.2vw, 2rem);
}

.hosting__steps ol {
  display: grid;
  gap: var(--space-5);
  margin-top: var(--space-5);
  list-style: none;
}

.hosting__steps li {
  display: grid;
  grid-template-columns: 2.25rem minmax(0, 1fr);
  gap: var(--space-4);
  align-items: start;
}

.hosting__num {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.hosting__steps h4 {
  margin-bottom: var(--space-1);
  font-size: var(--step-0);
}

.hosting__steps p {
  margin: 0;
  color: var(--muted);
  font-size: var(--step--1);
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.hosting__steps .hosting__email {
  display: inline-block;
  margin-top: var(--space-2);
  padding: 0.2em 0.65em;
  border-radius: 8px;
  background: rgb(255 255 255 / 0.06);
  color: var(--text);
  font-weight: 500;
  user-select: all;
}

.hosting__side {
  display: grid;
  gap: var(--space-4);
}

.hosting__note,
.hosting__guide {
  padding: var(--space-5);
}

.hosting__note h3,
.hosting__guide h3 {
  margin-bottom: var(--space-3);
  font-size: var(--step-0);
}

.hosting__note p,
.hosting__guide p {
  margin: 0;
  color: var(--muted);
  font-size: var(--step--1);
}

.hosting__note ul {
  display: grid;
  gap: var(--space-2);
  padding-left: 1.1em;
  color: var(--muted);
  font-size: var(--step--1);
}

.hosting__note--warn {
  border-color: rgb(255 120 120 / 0.25);
}

.hosting__note--warn li::marker {
  color: #ff8a8a;
}

.hosting__guide .btn {
  margin-top: var(--space-4);
}

.hosting__guide .hosting__other {
  margin-top: var(--space-3);
}

.hosting__other a {
  color: var(--text);
}

@media (max-width: 55.99rem) {
  .hosting__reasons,
  .hosting__grid {
    grid-template-columns: 1fr;
  }
}
</style>
