<script setup lang="ts">
import { useI18n } from '../../i18n/index.ts'

defineProps<{ href: string }>()
const { t } = useI18n()
</script>

<template>
  <a :href="href" target="_blank" rel="noopener noreferrer"><slot /><span class="sr-only"> {{ t.a11y.newTab }}</span></a>
</template>
