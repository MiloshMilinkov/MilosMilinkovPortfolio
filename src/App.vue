<script setup lang="ts">
import HeroSection from './components/hero/HeroSection.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import SiteHeader from './components/layout/SiteHeader.vue'
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <SiteHeader />
  <main id="main" tabindex="-1">
    <HeroSection />
    <section id="about" class="section stub" aria-labelledby="about-title">
      <div class="container"><h2 id="about-title">About</h2></div>
    </section>
    <section id="skills" class="section stub" aria-labelledby="skills-title">
      <div class="container"><h2 id="skills-title">Skills</h2></div>
    </section>
    <section id="experience" class="section stub" aria-labelledby="experience-title">
      <div class="container"><h2 id="experience-title">Experience</h2></div>
    </section>
    <section id="projects" class="section stub" aria-labelledby="projects-title">
      <div class="container"><h2 id="projects-title">Projects</h2></div>
    </section>
    <section id="contact" class="section stub" aria-labelledby="contact-title">
      <div class="container"><h2 id="contact-title">Contact</h2></div>
    </section>
  </main>
  <SiteFooter />
</template>

<style>
/* Temporary section stubs; each is replaced by its real component in later tasks. */
.stub {
  min-height: 70vh;
}
</style>
