<script setup lang="ts">
import { site } from '../../data/site.ts'
import ExternalLink from '../ui/ExternalLink.vue'
import Monogram from '../ui/Monogram.vue'

defineProps<{ minimal?: boolean }>()
</script>

<template>
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <div class="site-footer__brand">
        <Monogram :size="28" />
        <p class="site-footer__owner">© 2026 Miloš Milinkov</p>
      </div>
      <p class="site-footer__built">
        Designed, built and hosted by me.
        <ExternalLink :href="site.repo">Source on GitHub</ExternalLink>
      </p>
      <a v-if="!minimal" class="site-footer__top" href="#top">Back to top</a>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--border);
  padding-block: var(--space-6);
  color: var(--muted);
  font-size: var(--step--1);
}

.site-footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3) var(--space-6);
}

.site-footer p {
  margin: 0;
}

.site-footer__brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.site-footer__owner {
  color: var(--text);
  font-weight: 600;
}

.site-footer a {
  color: var(--muted);
}

.site-footer a:hover {
  color: var(--text);
}
</style>
