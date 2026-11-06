<script setup lang="ts">
withDefaults(defineProps<{ as?: string; corner?: 'both' | 'tl' | 'br' }>(), {
  as: 'div',
  corner: 'both',
})
</script>

<template>
  <component :is="as" class="frame" :class="corner !== 'both' && `frame--${corner}`">
    <slot />
  </component>
</template>
