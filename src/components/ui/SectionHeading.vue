<script setup lang="ts">
defineProps<{
  /** Id of the <h2>; the section uses it in aria-labelledby and focus moves here. */
  id: string
  title: string
  lede?: string
}>()
</script>

<template>
  <header class="section-heading">
    <h2 :id="id" tabindex="-1">{{ title }}</h2>
    <p v-if="lede" class="section-heading__lede">{{ lede }}</p>
  </header>
</template>

<style scoped>
.section-heading {
  display: grid;
  gap: var(--space-4);
  margin-bottom: clamp(2rem, 1.5rem + 2vw, 3.5rem);
}

h2 {
  font-size: var(--step-3);
  scroll-margin-top: calc(var(--header-h) + var(--space-5));
  /* A brass rule that starts under the first letter and fades out. */
  padding-bottom: 0.18em;
  background: linear-gradient(90deg, var(--brass) 0 3.5rem, var(--brass-dim) 3.5rem, transparent 60%) bottom left / 100% 2px no-repeat;
  max-width: 22ch;
}

h2:focus {
  outline: none;
}

h2:focus-visible {
  outline: 2px solid var(--brass);
  outline-offset: 6px;
}

.section-heading__lede {
  margin: 0;
  color: var(--steel);
  font-size: var(--step-1);
  max-width: 52ch;
}
</style>
