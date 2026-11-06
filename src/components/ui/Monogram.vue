<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 36 })
</script>

<template>
  <!-- Same geometry as public/favicon.svg: a lancet arch, an engraved M and an ember gem. -->
  <svg class="monogram" :width="size" :height="size" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <path d="M32 3C45 11 55 22 56 37V61H8V37C9 22 19 11 32 3Z" fill="#16181c" stroke="#c8a35a" stroke-width="3" />
    <path d="M18 51V28L32 42 46 28V51" fill="none" stroke="#c8a35a" stroke-width="5.5" stroke-linejoin="miter" stroke-linecap="square" />
    <path d="M32 12 36 18.5 32 25 28 18.5Z" fill="#d9412b" />
  </svg>
</template>
