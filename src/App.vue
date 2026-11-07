<script setup lang="ts">
import HeroSection from './components/hero/HeroSection.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import SiteHeader from './components/layout/SiteHeader.vue'
import AboutSection from './components/sections/AboutSection.vue'
import ContactSection from './components/sections/ContactSection.vue'
import ExperienceSection from './components/sections/ExperienceSection.vue'
import ProcessSection from './components/sections/ProcessSection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import ServicesSection from './components/sections/ServicesSection.vue'
import SkillsSection from './components/sections/SkillsSection.vue'
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <SiteHeader />
  <main id="main" tabindex="-1">
    <HeroSection />
    <ServicesSection />
    <ProjectsSection />
    <ProcessSection />
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
