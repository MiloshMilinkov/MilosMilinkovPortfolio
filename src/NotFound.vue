<script setup lang="ts">
import SiteFooter from './components/layout/SiteFooter.vue'
import SiteHeader from './components/layout/SiteHeader.vue'
import Panel from './components/ui/Panel.vue'
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <SiteHeader minimal />
  <main id="main" class="not-found" tabindex="-1">
    <div class="container">
      <Panel class="not-found__plate">
        <p class="not-found__code" aria-hidden="true">404</p>
        <h1>Signal lost</h1>
        <p>There is nothing at this address. The link may be old, or the page may have moved.</p>
        <a class="btn btn--primary frame frame--br" href="/">Return to the portfolio</a>
      </Panel>
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

.not-found__plate {
  --chamfer: 22px;
  max-width: 40rem;
  padding: clamp(1.5rem, 1rem + 3vw, 3rem);
}

.not-found__code {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--step--1);
  color: var(--ember);
  letter-spacing: 0.3em;
}

h1 {
  font-size: var(--step-4);
  margin-block: var(--space-2) var(--space-5);
}

.not-found__plate p:not(.not-found__code) {
  color: var(--steel);
  font-size: var(--step-1);
}
</style>
