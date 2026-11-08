<script setup lang="ts">
import HeroSection from './components/hero/HeroSection.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import SiteHeader from './components/layout/SiteHeader.vue'
import AboutSection from './components/sections/AboutSection.vue'
import ContactSection from './components/sections/ContactSection.vue'
import ExperienceSection from './components/sections/ExperienceSection.vue'
import HostingSection from './components/sections/HostingSection.vue'
import ProcessSection from './components/sections/ProcessSection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import ServicesSection from './components/sections/ServicesSection.vue'
import SkillsSection from './components/sections/SkillsSection.vue'
import { useI18n } from './i18n/index.ts'

const { t } = useI18n()
</script>

<template>
  <a class="skip-link" href="#main">{{ t.a11y.skip }}</a>
  <SiteHeader />
  <main id="main" tabindex="-1">
    <HeroSection />
    <ServicesSection />
    <ProjectsSection />
    <ProcessSection />
    <HostingSection />
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
