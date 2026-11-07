<script setup lang="ts">
defineProps<{ label: string; active?: boolean }>()
</script>

<template>
  <span class="tag" :class="{ 'tag--active': active }">{{ label }}</span>
</template>

<style scoped>
.tag {
  display: inline-block;
  padding: 0.15em 0.65em;
  border-radius: 8px;
  background: rgb(255 255 255 / 0.05);
  color: var(--muted);
  font-size: var(--step--1);
  line-height: 1.6;
  white-space: nowrap;
}

.tag--active {
  background: var(--accent-soft);
  color: var(--text);
  box-shadow: inset 0 0 0 1px rgb(217 70 239 / 0.45);
}
</style>
