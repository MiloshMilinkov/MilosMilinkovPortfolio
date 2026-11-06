<script setup lang="ts">
defineProps<{ href: string }>()
</script>

<template>
  <a :href="href" target="_blank" rel="noopener noreferrer"><slot /><span class="sr-only"> (opens in a new tab)</span></a>
</template>
