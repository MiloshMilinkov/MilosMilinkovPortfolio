<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Id of the <h2>; the section uses it in aria-labelledby and focus moves here. */
    id: string
    title: string
    lede?: string
    align?: 'start' | 'center'
  }>(),
  { align: 'start' },
)
</script>

<template>
  <header class="section-heading" :class="`section-heading--${align}`">
    <h2 :id="id" tabindex="-1">{{ title }}</h2>
    <p v-if="lede" class="section-heading__lede">{{ lede }}</p>
  </header>
</template>

<style scoped>
.section-heading {
  display: grid;
  gap: var(--space-4);
  margin-bottom: clamp(2rem, 1.5rem + 2vw, 3.25rem);
}

.section-heading--center {
  justify-items: center;
  text-align: center;
}

h2 {
  font-size: var(--step-3);
  max-width: 20ch;
  scroll-margin-top: calc(var(--header-h) + var(--space-5));
}

h2:focus {
  outline: none;
}

h2:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 6px;
}

.section-heading__lede {
  margin: 0;
  color: var(--muted);
  font-size: var(--step-1);
  max-width: 52ch;
}
</style>
