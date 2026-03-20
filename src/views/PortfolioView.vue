<template>
  <main class="page-content">
    <PageHero title="Design & Development Work" subtitle="Case studies and front-end builds that turn business goals into scalable systems and high-performing user experiences." />

    <section class="projects-intro">
      <div class="projects-intro-inner">
        <div class="projects-intro-head">
          <p class="projects-intro-eyebrow">Develop</p>
          <h2 class="projects-intro-title">Selected Front-End Work</h2>
        </div>
        <div class="projects-intro-copy">
          <p>
            Each project starts with business requirements and turns them into robust front-end
            implementation: scalable components, maintainable architecture, and production-ready code.
          </p>
        </div>
      </div>
    </section>

    <ProjectsTeaserGrid />

    <section class="design-cases">
      <div ref="casesRef" class="scroll-animate">
        <div class="design-cases-inner">
          <div class="design-cases-intro">
            <div class="design-cases-intro-head">
              <p class="design-cases-eyebrow">Case Studies</p>
              <h2 class="design-cases-title">Selected design projects</h2>
            </div>
            <div class="design-cases-intro-copy">
              <p>
                Each case study focuses on business goals first, then translates those goals
                into clear user journeys, scalable components, and conversion-focused layouts.
              </p>
              <p>
                I document the challenge, the strategy, and the results so you can quickly
                understand how decisions were made from research through final UI execution.
              </p>
            </div>
          </div>

          <div class="design-cases-grid">
            <RouterLink
              v-for="caseStudy in designCases"
              :key="caseStudy.slug"
              :to="{ name: 'design-case-detail', params: { slug: caseStudy.slug } }"
              class="design-case-card"
            >
              <div class="design-case-media">
                <img
                  v-if="caseStudy.teaserImage"
                  :src="caseStudy.teaserImage"
                  :alt="caseStudy.title"
                  loading="lazy"
                />
              </div>

              <div class="design-case-body">
                <span class="design-case-tag">{{ caseStudy.primaryTag }}</span>
                <h3 class="design-case-title">{{ caseStudy.title }}</h3>
                <p class="design-case-lead">{{ caseStudy.teaserLead }}</p>
                <div class="design-case-footer">
                  <span class="design-case-cta">View project</span>
                  <span class="design-case-arrow" aria-hidden="true">›</span>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
    <SiteCta />
    <Footer />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import PageHero from '@/components/PageHero.vue'
import ProjectsTeaserGrid from '@/components/ProjectsTeaserGrid.vue'
import Footer from '@/components/Footer.vue'
import SiteCta from '@/components/SiteCta.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { designCases } from '@/data/designCases'

const casesRef = ref(null)
useScrollAnimation(casesRef, { once: true, threshold: 0.15 })
</script>

<style lang="scss" scoped>
@use '../../styles/scss/global/variables' as *;

.projects-intro {
  background: $gray-bg-alt;
  padding: $space-3xl 1.5rem 0;
}

.projects-intro-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-lg;
  padding-bottom: $space-xl;
  border-bottom: 1px solid $slate-border;
}

.projects-intro-head {
  max-width: 360px;
}

.projects-intro-eyebrow {
  margin: 0 0 $space-sm;
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: $teal-ui;
}

.projects-intro-title {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.35rem, 2.8vw, 2rem);
  font-weight: 700;
  line-height: 1.25;
  color: $slate-900;
}


.projects-intro-copy p {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  line-height: 1.7;
  color: $slate-600;
}


@media (min-width: 1024px) {
  .projects-intro-inner {
    grid-template-columns: 0.9fr 1.1fr;
    gap: $space-3xl;
    align-items: flex-end;
  }
}

.design-cases {
  background: $gray-bg-alt;
  padding: $space-3xl 1.5rem $space-4xl;
}

.design-cases-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.scroll-animate {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.scroll-animate.in-view {
  opacity: 1;
  transform: translateY(0);
}

.design-cases-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.design-cases-intro {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-lg;
  margin-bottom: $space-2xl;
  padding-bottom: $space-xl;
  border-bottom: 1px solid $slate-border;
}

.design-cases-intro-head {
  max-width: 360px;
}

.design-cases-eyebrow {
  margin: 0 0 $space-sm;
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: $teal-ui;
}

.design-cases-title {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.35rem, 2.8vw, 2rem);
  font-weight: 700;
  line-height: 1.25;
  color: $slate-900;
}

.design-cases-intro-copy p {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  line-height: 1.7;
  color: $slate-600;
}

@media (min-width: 1024px) {
  .design-cases-intro {
    grid-template-columns: 0.9fr 1.1fr;
    gap: $space-3xl;
    align-items: start;
  }
}

.design-case-card {
  display: grid;
  grid-template-columns: minmax(220px, 32%) 1fr;
  text-decoration: none;
  color: inherit;
  background: $white-pure;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: $slate-shadow;
  border: 1px solid $slate-shadow;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.design-case-media {
  position: relative;
  min-height: 160px;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, rgba($teal-ui, 0.55) 0%, rgba($navy, 0.35) 100%);
}

.design-case-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.design-case-cta {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.75rem 0.1rem 0;
  border-radius: 8px;
  color: $slate-800;
  font-family: 'Poppins', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
}

.design-case-body {
  padding: 1rem 1.1rem 1rem 1.2rem;
  border-left: 1px solid $slate-border;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.45rem;
}

.design-case-tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: $teal-ui;
}

.design-case-title {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 1.45rem;
  font-weight: 700;
  color: $slate-900;
  line-height: 1.2;
}

.design-case-lead {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  line-height: 1.5;
  color: $slate-600;
}

.design-case-footer {
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: $space-sm;
}

.design-case-arrow {
  color: $slate-500;
  font-size: 1.5rem;
  line-height: 1;
  transform: translateX(0);
  transition: transform 0.2s ease, color 0.2s ease;
}

.design-case-card:hover .design-case-arrow {
  transform: translateX(4px);
  color: $slate-800;
}

@media (max-width: 760px) {
  .design-case-card {
    grid-template-columns: 1fr;
  }

  .design-case-media {
    min-height: 180px;
  }

  .design-case-body {
    border-left: none;
    border-top: 1px solid $slate-border;
  }

  .design-case-title {
    font-size: 1.2rem;
  }
}
</style>
