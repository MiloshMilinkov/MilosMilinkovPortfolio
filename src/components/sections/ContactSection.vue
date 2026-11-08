<script setup lang="ts">
import { ref } from 'vue'
import { site } from '../../data/site.ts'
import ExternalLink from '../ui/ExternalLink.vue'
import Icon from '../ui/Icon.vue'
import SectionHeading from '../ui/SectionHeading.vue'
import { useI18n } from '../../i18n/index.ts'

const { t } = useI18n()
const copyStatus = ref('')

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(site.email)
    copyStatus.value = t.contact.copied
  } catch {
    copyStatus.value = t.contact.copyFailed(site.email)
  }
}

const linkedinLabel = decodeURIComponent(site.linkedin.replace('https://www.', '')).replace(/\/$/, '')
const projectMail = `mailto:${site.email}?subject=${encodeURIComponent(t.contact.mailSubject)}`
const githubLabel = site.github.replace('https://', '')
</script>

<template>
  <section id="contact" class="section contact" aria-labelledby="contact-title">
    <div class="container">
      <div class="contact__panel card card--glow">
        <div class="contact__pitch">
          <SectionHeading
            id="contact-title"
            :title="t.contact.title"
            :lede="t.contact.lede"
          />
          <div class="contact__actions">
            <a class="btn btn--primary" :href="projectMail"><Icon name="mail" />{{ t.contact.emailButton }}</a>
            <button type="button" class="btn btn--ghost" :aria-label="t.contact.copyAria" @click="copyEmail">
              <Icon name="copy" />{{ t.contact.copyButton }}
            </button>
          </div>
          <p class="contact__status" aria-live="polite">{{ copyStatus }}</p>
        </div>

        <ul class="channels">
          <li class="channel">
            <span class="channel__label">{{ t.contact.labels.email }}</span>
            <a class="channel__value" :href="`mailto:${site.email}`">{{ site.email }}</a>
          </li>
          <li class="channel">
            <span class="channel__label">{{ t.contact.labels.linkedin }}</span>
            <ExternalLink class="channel__value" :href="site.linkedin">{{ linkedinLabel }}</ExternalLink>
          </li>
          <li class="channel">
            <span class="channel__label">{{ t.contact.labels.github }}</span>
            <ExternalLink class="channel__value" :href="site.github">{{ githubLabel }}</ExternalLink>
          </li>
          <li class="channel">
            <span class="channel__label">{{ t.contact.labels.location }}</span>
            <span class="channel__value channel__value--plain">{{ t.about.location }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact__panel {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  gap: clamp(2rem, 4vw, 4rem);
  align-items: center;
  padding: clamp(1.5rem, 1rem + 3vw, 3.5rem);
  border-radius: var(--radius-lg);
}

.contact__pitch :deep(.section-heading) {
  margin-bottom: var(--space-6);
}

.contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.contact__status {
  min-height: 1.6em;
  margin: var(--space-3) 0 0;
  color: var(--cyan);
  font-size: var(--step--1);
}

.channels {
  list-style: none;
  display: grid;
  gap: var(--space-2);
}

.channel {
  display: grid;
  gap: 2px;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border);
  border-radius: 14px;
  background: rgb(0 0 0 / 0.2);
}

.channel__label {
  color: var(--subtle);
  font-size: var(--step--1);
}

.channel__value {
  min-width: 0;
  overflow-wrap: anywhere;
  color: var(--text);
  font-weight: 500;
  text-decoration: none;
}

a.channel__value:hover {
  color: var(--accent);
}

@media (max-width: 55.99rem) {
  .contact__panel {
    grid-template-columns: 1fr;
  }
}
</style>
