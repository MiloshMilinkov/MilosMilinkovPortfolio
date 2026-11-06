<script setup lang="ts">
import { ref } from 'vue'
import { profile } from '../../data/profile.ts'
import { site } from '../../data/site.ts'
import ExternalLink from '../ui/ExternalLink.vue'
import SectionHeading from '../ui/SectionHeading.vue'

const copyStatus = ref('')

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(site.email)
    copyStatus.value = 'Email address copied'
  } catch {
    copyStatus.value = `Copy failed — the address is ${site.email}`
  }
}

const linkedinLabel = decodeURIComponent(site.linkedin.replace('https://www.', '')).replace(/\/$/, '')
const githubLabel = site.github.replace('https://', '')
</script>

<template>
  <section id="contact" class="section contact" aria-labelledby="contact-title">
    <div class="container">
      <SectionHeading
        id="contact-title"
        title="Contact"
        lede="Questions about a project, a role or a collaboration? Email is the fastest way to reach me."
      />

      <ul class="channels">
        <li class="channel">
          <span class="channel__label">Email</span>
          <a class="channel__value" :href="`mailto:${site.email}`">{{ site.email }}</a>
          <button type="button" class="channel__action" aria-label="Copy email address" @click="copyEmail">Copy</button>
        </li>
        <li class="channel">
          <span class="channel__label">LinkedIn</span>
          <ExternalLink class="channel__value" :href="site.linkedin">{{ linkedinLabel }}</ExternalLink>
        </li>
        <li class="channel">
          <span class="channel__label">GitHub</span>
          <ExternalLink class="channel__value" :href="site.github">{{ githubLabel }}</ExternalLink>
        </li>
      </ul>

      <p class="contact__meta">
        <span>{{ profile.location }}</span>
        <span aria-live="polite" class="contact__status">{{ copyStatus }}</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding-bottom: clamp(5rem, 4rem + 6vw, 9rem);
}

.channels {
  list-style: none;
  max-width: 56rem;
}

.channel {
  display: grid;
  grid-template-columns: 7rem minmax(0, 1fr) auto;
  align-items: baseline;
  gap: var(--space-2) var(--space-5);
  padding-block: var(--space-5);
  border-top: 1px solid var(--plate);
}

.channel:last-child {
  border-bottom: 1px solid var(--plate);
}

.channel__label {
  color: var(--steel);
  font-size: var(--step--1);
  font-weight: 600;
  letter-spacing: 0.04em;
}

.channel__value {
  min-width: 0;
  overflow-wrap: anywhere;
  color: var(--bone);
  font-size: var(--step-2);
  font-weight: 500;
  line-height: 1.2;
  text-decoration-color: var(--brass-dim);
  text-decoration-thickness: 1px;
  transition:
    color 0.15s,
    text-decoration-color 0.15s;
}

.channel__value:hover {
  color: var(--brass);
  text-decoration-color: var(--brass);
}

.channel__action {
  min-height: 2.25rem;
  padding: 0.3em 0.9em;
  background: transparent;
  border: 1px solid var(--plate);
  color: var(--brass);
  font-size: var(--step--1);
  font-weight: 600;
  cursor: pointer;
}

.channel__action:hover {
  border-color: var(--brass-dim);
}

.contact__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-6);
  margin-top: var(--space-5);
  color: var(--steel);
}

.contact__status {
  color: var(--terminal);
}

@media (max-width: 47.99rem) {
  .channel {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .channel__label {
    grid-column: 1 / -1;
  }

  .channel__value {
    font-size: var(--step-1);
  }
}
</style>
