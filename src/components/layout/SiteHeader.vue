<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { SECTION_IDS, navLinks } from '../../data/nav.ts'
import { useActiveSection } from '../../composables/useActiveSection.ts'
import { localeInfo, useI18n } from '../../i18n/index.ts'
import Monogram from '../ui/Monogram.vue'
import LanguagePicker from './LanguagePicker.vue'

/** `minimal`: the 404 page — no section nav, just the mark and a way home. */
const props = defineProps<{ minimal?: boolean }>()

const { t, locale } = useI18n()
// The 404 page is a single English page (minimal header), so it links to the English home.
const homePath = props.minimal ? '/' : localeInfo[locale].path
const active = props.minimal ? ref('') : useActiveSection([...SECTION_IDS])
const open = ref(false)
const button = ref<HTMLButtonElement | null>(null)
const panel = ref<HTMLElement | null>(null)

function close({ restoreFocus = false } = {}) {
  open.value = false
  if (restoreFocus) nextTick(() => button.value?.focus())
}

function toggle() {
  open.value = !open.value
}

/** Escape closes; Tab cycles between the menu button and the links while open. */
function onKeydown(event: KeyboardEvent) {
  if (!open.value) return
  if (event.key === 'Escape') {
    event.preventDefault()
    close({ restoreFocus: true })
    return
  }
  if (event.key !== 'Tab' || !panel.value || !button.value) return
  const links = Array.from(panel.value.querySelectorAll<HTMLAnchorElement>('a'))
  const first = button.value
  const last = links[links.length - 1]
  if (!last) return
  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  } else if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  }
}

// Listen on the document while open: Safari does not focus a button on click,
// so keystrokes after opening the menu with the mouse never reach the header.
watch(open, (isOpen) => {
  if (isOpen) document.addEventListener('keydown', onKeydown)
  else document.removeEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <header class="site-header">
    <div class="site-header__bar container">
      <a class="brand" :href="minimal ? homePath : '#top'" :aria-label="t.a11y.toTop">
        <Monogram :size="32" />
        <span class="brand__name" aria-hidden="true">Miloš Milinkov</span>
      </a>

      <a v-if="minimal" class="btn btn--ghost site-header__home" :href="homePath">Back to the portfolio</a>

      <template v-else>
        <button
          ref="button"
          class="menu-button"
          type="button"
          aria-controls="site-menu"
          :aria-expanded="open ? 'true' : 'false'"
          @click="toggle"
        >
          <span class="menu-button__bars" aria-hidden="true" />
          <span class="menu-button__text">{{ t.header.menu }}</span>
        </button>

        <nav id="site-menu" ref="panel" class="site-nav" :class="{ 'is-open': open }" :aria-label="t.header.menu">
          <ul class="site-nav__links">
            <li v-for="id in navLinks" :key="id">
              <a :href="`#${id}`" :aria-current="active === id ? 'true' : undefined" @click="close()">
                {{ t.nav[id] }}
              </a>
            </li>
          </ul>
          <a class="btn btn--primary site-nav__cta" href="#contact" @click="close()">{{ t.header.cta }}</a>
        </nav>
        <LanguagePicker class="site-header__lang" />
      </template>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgb(18 18 22 / 0.78);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border-bottom: 1px solid var(--border);
}

.site-header__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-height: var(--header-h);
}

.brand {
  margin-right: auto;
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--text);
  text-decoration: none;
}

.brand__name {
  font-size: var(--step-0);
  font-weight: 600;
  letter-spacing: -0.01em;
}

.site-header__lang {
  flex: none;
}

.site-header__home {
  min-height: 2.5rem;
  font-size: var(--step--1);
}

.site-nav {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.site-nav__links {
  display: flex;
  gap: 2px;
  padding: 4px;
  list-style: none;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgb(255 255 255 / 0.03);
}

.site-nav__links a {
  display: inline-block;
  padding: 0.45em 0.95em;
  border-radius: 999px;
  color: var(--muted);
  font-size: var(--step--1);
  font-weight: 500;
  text-decoration: none;
  transition:
    color 0.15s,
    background-color 0.15s;
}

.site-nav__links a:hover {
  color: var(--text);
}

.site-nav__links a[aria-current='true'] {
  color: var(--text);
  background: rgb(255 255 255 / 0.08);
}

.site-nav__cta {
  min-height: 2.5rem;
  padding-inline: 1.1em;
  font-size: var(--step--1);
}

.menu-button {
  display: none;
}

@media (max-width: 67.99rem) {
  .menu-button {
    order: 2;
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
    min-height: 2.75rem;
    padding: 0 var(--space-4);
    border: 1px solid var(--border-strong);
    border-radius: 999px;
    background: rgb(255 255 255 / 0.04);
    color: var(--text);
    font-size: var(--step--1);
    font-weight: 600;
    cursor: pointer;
  }

  .menu-button__bars,
  .menu-button__bars::before {
    display: block;
    width: 16px;
    height: 2px;
    border-radius: 2px;
    background: currentColor;
  }

  .menu-button__bars {
    position: relative;
    transform: translateY(-3px);
  }

  .menu-button__bars::before {
    content: '';
    position: absolute;
    top: 6px;
  }

  .site-nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    padding: var(--space-4) var(--gutter) var(--space-6);
    background: var(--bg);
    border-bottom: 1px solid var(--border);
  }

  .site-nav.is-open {
    display: flex;
  }

  .site-nav__links {
    flex-direction: column;
    padding: 0;
    border: 0;
    background: none;
  }

  .site-nav__links a {
    display: block;
    padding: var(--space-3) 0;
    border-radius: 0;
    font-size: var(--step-2);
    font-weight: 600;
    color: var(--text);
  }

  .site-nav__links a[aria-current='true'] {
    background: none;
    color: var(--accent);
  }

  .site-nav__cta {
    margin-top: var(--space-4);
    min-height: 2.9rem;
    font-size: var(--step-0);
  }
}

/* Very narrow phones: logo only, and a bars-only menu button (names stay for screen readers). */
@media (max-width: 25.99rem) {
  .brand__name {
    display: none;
  }

  .menu-button__text {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
}
</style>
