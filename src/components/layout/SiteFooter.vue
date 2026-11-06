<script setup lang="ts">
import { site } from '../../data/site.ts'
import ExternalLink from '../ui/ExternalLink.vue'

defineProps<{ minimal?: boolean }>()
</script>

<template>
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <p class="site-footer__owner">© 2026 Miloš Milinkov</p>
      <p class="site-footer__built">
        Built with Vue 3 and Vite, hosted on Cloudflare.
        <ExternalLink :href="site.repo">Source on GitHub</ExternalLink>
      </p>
      <a v-if="!minimal" class="site-footer__top" href="#top">Back to top</a>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--plate);
  padding-block: var(--space-6);
  color: var(--steel);
  font-size: var(--step--1);
}

.site-footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-3) var(--space-6);
}

.site-footer p {
  margin: 0;
}

.site-footer__owner {
  color: var(--bone);
  font-family: var(--font-display);
  font-size: var(--step-1);
}
</style>
