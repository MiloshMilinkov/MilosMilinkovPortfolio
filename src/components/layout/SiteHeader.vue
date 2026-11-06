<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { SECTION_IDS, navLinks } from '../../data/nav.ts'
import { useActiveSection } from '../../composables/useActiveSection.ts'
import Monogram from '../ui/Monogram.vue'

/** `minimal`: the 404 page — no section nav, just the mark and a way home. */
const props = defineProps<{ minimal?: boolean }>()

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
      <a class="brand" :href="minimal ? '/' : '#top'" :aria-label="minimal ? 'Miloš Milinkov — home' : 'Miloš Milinkov — back to top'">
        <Monogram :size="34" />
        <span class="brand__name" aria-hidden="true">Miloš Milinkov</span>
      </a>

      <a v-if="minimal" class="site-header__home" href="/">Back to the portfolio</a>

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
          Menu
        </button>

        <nav id="site-menu" ref="panel" class="site-nav" :class="{ 'is-open': open }" aria-label="Main">
          <ul>
            <li v-for="link in navLinks" :key="link.id">
              <a :href="`#${link.id}`" :aria-current="active === link.id ? 'true' : undefined" @click="close()">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>
      </template>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgb(11 12 14 / 0.82);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(90deg, transparent, var(--brass-dim) 20%, var(--brass-dim) 80%, transparent) 1;
}

.site-header__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-height: var(--header-h);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--bone);
  text-decoration: none;
}

.brand__name {
  font-family: var(--font-display);
  font-size: var(--step-1);
  font-weight: 700;
  letter-spacing: 0.01em;
}

.site-header__home {
  font-size: var(--step--1);
}

.site-nav ul {
  display: flex;
  gap: clamp(1rem, 2vw, 2rem);
  list-style: none;
}

.site-nav a {
  position: relative;
  display: inline-block;
  padding-block: var(--space-2);
  color: var(--steel);
  text-decoration: none;
  font-size: var(--step--1);
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: color 0.15s;
}

.site-nav a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--brass);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s var(--ease-out);
}

.site-nav a:hover,
.site-nav a[aria-current='true'] {
  color: var(--bone);
}

.site-nav a[aria-current='true']::after {
  transform: scaleX(1);
}

.menu-button {
  display: none;
}

@media (max-width: 47.99rem) {
  .brand__name {
    font-size: var(--step-0);
  }

  .menu-button {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
    min-height: 2.75rem;
    padding: 0 var(--space-4);
    background: transparent;
    border: 1px solid var(--plate);
    color: var(--bone);
    font-size: var(--step--1);
    font-weight: 600;
    cursor: pointer;
  }

  .menu-button[aria-expanded='true'] {
    border-color: var(--brass-dim);
  }

  .menu-button__bars,
  .menu-button__bars::before {
    display: block;
    width: 18px;
    height: 2px;
    background: var(--brass);
  }

  .menu-button__bars {
    position: relative;
    transform: translateY(-3px);
  }

  .menu-button__bars::before {
    content: '';
    position: absolute;
    top: 6px;
    width: 12px;
  }

  .site-nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--void);
    border-bottom: 1px solid var(--brass-dim);
    padding: var(--space-4) var(--gutter) var(--space-6);
  }

  .site-nav.is-open {
    display: block;
  }

  .site-nav ul {
    flex-direction: column;
    gap: 0;
  }

  .site-nav a {
    display: block;
    padding-block: var(--space-3);
    font-family: var(--font-display);
    font-size: var(--step-2);
    color: var(--bone);
    letter-spacing: 0;
  }

  .site-nav a::after {
    display: none;
  }

  .site-nav a[aria-current='true'] {
    color: var(--brass);
  }
}
</style>
