<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 34 })
</script>

<template>
  <!-- Same geometry as public/favicon.svg. -->
  <svg class="monogram" :width="size" :height="size" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="mono-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#e055f5" />
        <stop offset="1" stop-color="#a21caf" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="url(#mono-grad)" />
    <path d="M18 45V20l14 15 14-15v25" fill="none" stroke="#fff" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>
