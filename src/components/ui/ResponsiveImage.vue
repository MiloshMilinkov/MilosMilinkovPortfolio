<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  /** Path under /images without width/extension, e.g. 'portrait' or 'projects/arizonalifts'. */
  base: string
  widths: number[]
  sizes: string
  alt: string
  width: number
  height: number
  /** Above-the-fold image: load eagerly with high fetch priority. */
  eager?: boolean
}>()

const srcset = (ext: 'avif' | 'webp') => props.widths.map((w) => `/images/${props.base}-${w}.${ext} ${w}w`).join(', ')
const fallback = computed(() => `/images/${props.base}-${props.widths[props.widths.length - 1]}.webp`)
</script>

<template>
  <picture>
    <source type="image/avif" :srcset="srcset('avif')" :sizes="sizes" />
    <source type="image/webp" :srcset="srcset('webp')" :sizes="sizes" />
    <img
      :src="fallback"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : undefined"
      decoding="async"
    />
  </picture>
</template>
