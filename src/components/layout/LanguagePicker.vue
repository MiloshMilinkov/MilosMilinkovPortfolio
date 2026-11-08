<script setup lang="ts">
import { LOCALES, localeInfo, useI18n } from '../../i18n/index.ts'

const { locale, t } = useI18n()

/** Keep the reader on the same section when switching language. */
function keepSection(event: MouseEvent, path: string) {
  if (!location.hash || event.metaKey || event.ctrlKey || event.shiftKey) return
  event.preventDefault()
  location.href = path + location.hash
}
</script>

<template>
  <nav class="lang" :aria-label="t.header.languages">
    <ul>
      <li v-for="l in LOCALES" :key="l">
        <a
          :href="localeInfo[l].path"
          :hreflang="localeInfo[l].htmlLang"
          :lang="localeInfo[l].htmlLang"
          :aria-current="l === locale ? 'true' : undefined"
          @click="keepSection($event, localeInfo[l].path)"
        >
          <span aria-hidden="true">{{ localeInfo[l].short }}</span>
          <span class="sr-only">{{ localeInfo[l].name }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.lang ul {
  display: flex;
  gap: 2px;
  padding: 3px;
  list-style: none;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgb(255 255 255 / 0.03);
}

.lang a {
  display: inline-grid;
  place-items: center;
  min-width: 2.25rem;
  min-height: 2rem;
  padding: 0 0.55em;
  border-radius: 999px;
  color: var(--muted);
  font-size: var(--step--1);
  font-weight: 600;
  text-decoration: none;
  transition:
    color 0.15s,
    background-color 0.15s;
}

.lang a:hover {
  color: var(--text);
}

.lang a[aria-current='true'] {
  background: rgb(255 255 255 / 0.1);
  color: var(--text);
}
</style>
