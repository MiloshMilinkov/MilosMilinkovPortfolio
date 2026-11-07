<script setup lang="ts">
import SiteFooter from './components/layout/SiteFooter.vue'
import SiteHeader from './components/layout/SiteHeader.vue'
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <SiteHeader minimal />
  <main id="main" class="not-found" tabindex="-1">
    <div class="container">
      <div class="not-found__card card card--glow">
        <p class="pill"><span class="pill__dot" aria-hidden="true" />Error 404</p>
        <h1>Page not found</h1>
        <p>There is nothing at this address. The link may be old, or the page may have moved.</p>
        <a class="btn btn--primary" href="/">Return to the portfolio</a>
      </div>
    </div>
  </main>
  <SiteFooter minimal />
</template>

<style scoped>
.not-found {
  display: grid;
  align-items: center;
  min-height: calc(100vh - var(--header-h) - 6rem);
  padding-block: var(--space-8);
}

.not-found__card {
  max-width: 40rem;
  padding: clamp(1.5rem, 1rem + 3vw, 3rem);
  border-radius: var(--radius-lg);
}

h1 {
  font-size: var(--step-4);
  letter-spacing: -0.04em;
  margin-block: var(--space-5);
}

.not-found__card p:not(.pill) {
  color: var(--muted);
  font-size: var(--step-1);
}
</style>
