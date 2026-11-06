<script setup lang="ts">
defineProps<{ label: string; active?: boolean }>()
</script>

<template>
  <span class="tag" :class="{ 'tag--active': active }">{{ label }}</span>
</template>

<style scoped>
.tag {
  display: inline-block;
  padding: 0.15em 0.6em;
  border: 1px solid var(--plate);
  color: var(--steel);
  font-size: var(--step--1);
  line-height: 1.5;
  white-space: nowrap;
}

.tag--active {
  border-color: var(--brass);
  color: var(--brass);
}
</style>
