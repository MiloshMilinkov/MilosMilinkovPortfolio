<script setup lang="ts">
const lines = [
  { text: '$ init milinkov.profile', status: '' },
  { text: '.NET / SQL core ····· ', status: 'online' },
  { text: 'Vue.js interface ···· ', status: 'online' },
  { text: 'AI agents ··········· ', status: 'linked' },
]
</script>

<template>
  <!-- Decorative terminal output; the same facts are stated in the page content. -->
  <div class="boot" aria-hidden="true">
    <p v-for="(line, i) in lines" :key="i" class="boot__line" :style="{ '--i': i }">
      {{ line.text }}<span v-if="line.status" class="boot__ok">{{ line.status }}</span>
    </p>
  </div>
</template>

<style scoped>
.boot {
  margin-bottom: var(--space-5);
  font-family: var(--font-mono);
  font-size: var(--step--1);
  line-height: 1.7;
  color: var(--steel);
}

.boot__line {
  width: max-content;
  max-width: 100%;
  margin: 0;
  white-space: pre;
}

.boot__ok {
  color: var(--terminal);
}

/* The typing reveal exists only when motion is welcome; otherwise the text is simply there. */
@media (prefers-reduced-motion: no-preference) {
  .boot__line {
    clip-path: inset(0 100% 0 0);
    animation: type 0.42s steps(26, end) forwards;
    animation-delay: calc(0.15s + var(--i) * 0.32s);
  }

  .boot__line:last-child::after {
    content: '▋';
    margin-left: 0.3em;
    color: var(--terminal);
    animation: caret 0.5s steps(1) calc(0.15s + 4 * 0.32s) 6 both;
  }
}

@keyframes type {
  to {
    clip-path: inset(0);
  }
}

@keyframes caret {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
