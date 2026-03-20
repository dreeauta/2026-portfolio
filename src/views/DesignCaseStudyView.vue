<template>
  <main class="page-content">
    <ProjectDetailHero
      v-if="designCase"
      :title="designCase.title"
      :hero-image="designCase.hero.image"
    />

    <div v-if="designCase">
      <section class="design-section">
        <div ref="designContentRef" class="design-content fade-in-on-load">
          <nav class="project-detail-nav">
            <router-link to="/projects" class="back-link">← Back to projects</router-link>
          </nav>

          <section class="cs-hero-card">
            <p class="eyebrow">{{ designCase.hero.eyebrow }}</p>

            <div class="cs-hero-grid">
              <div class="cs-hero-text">
                <h2 class="cs-hero-title">{{ designCase.hero.title }}</h2>
                <p class="cs-lead">{{ designCase.hero.lead }}</p>

                <div class="cs-tags">
                  <span v-for="tag in designCase.hero.tags" :key="tag">{{ tag }}</span>
                </div>

                <div class="cs-actions">
                  <a
                    v-if="designCase.hero.primaryCta.href"
                    :href="designCase.hero.primaryCta.href"
                    class="app-btn"
                    :target="linkTarget(designCase.hero.primaryCta.href)"
                    :rel="linkRel(designCase.hero.primaryCta.href)"
                  >
                    {{ designCase.hero.primaryCta.label }}
                  </a>
                  <a
                    :href="designCase.hero.secondaryCta.href"
                    class="app-btn cs-btn-outline"
                    :target="linkTarget(designCase.hero.secondaryCta.href)"
                    :rel="linkRel(designCase.hero.secondaryCta.href)"
                  >
                    {{ designCase.hero.secondaryCta.label }}
                  </a>
                </div>
              </div>

              <div class="cs-hero-image">
                <img
                  :src="designCase.teaserImage"
                  :alt="designCase.teaserLead"
                  loading="lazy"
                  fetchpriority="high"
                />
              </div>
            </div>
          </section>

          <section class="cs-section scroll-animate">
            <p class="section-label">{{ designCase.overview.label }}</p>
            <h2 class="cs-section-title">{{ designCase.overview.title }}</h2>
            <p v-for="(p, i) in designCase.overview.paragraphs" :key="i">
              {{ p }}
            </p>
          </section>

          <section class="cs-section cs-grid-2 scroll-animate">
            <div>
              <p class="section-label">{{ designCase.problem.label }}</p>
              <h2 class="cs-section-title">{{ designCase.problem.title }}</h2>
              <ul class="cs-list">
                <li v-for="(b, i) in designCase.problem.bullets" :key="i">
                  {{ b }}
                </li>
              </ul>
            </div>

            <div class="image-card">
              <img :src="designCase.problem.image1" :alt="designCase.problem.title" loading="lazy" />
              <img :src="designCase.problem.image2" :alt="designCase.problem.title" loading="lazy" />
            </div>
          </section>

          <section class="cs-section scroll-animate">
            <p class="section-label">{{ designCase.strategy.label }}</p>
            <h2 class="cs-section-title">{{ designCase.strategy.title }}</h2>

            <div class="strategy-grid">
              <div v-for="card in designCase.strategy.cards" :key="card.title" class="text-card">
                <h3 class="text-card-title">{{ card.title }}</h3>
                <p class="text-card-body">{{ card.body }}</p>
              </div>
            </div>

          </section>

          <section v-if="designCase.productManagement" class="cs-section scroll-animate">
            <p class="section-label">{{ designCase.productManagement.label }}</p>
            <h2 class="cs-section-title">{{ designCase.productManagement.title }}</h2>

            <div class="pm-layout">
              <div>
                <div class="pm-copy-grid">
                  <p v-for="(p, i) in designCase.productManagement.paragraphs" :key="`pm-copy-${i}`" class="pm-copy">
                    {{ p }}
                  </p>
                </div>
              </div>

              <aside class="pm-highlights">
                <h3 class="pm-highlights-title">Execution highlights</h3>
                <ul class="pm-list">
                  <li v-for="(h, i) in designCase.productManagement.highlights" :key="`pm-highlight-${i}`">
                    {{ h }}
                  </li>
                </ul>
              </aside>
            </div>


          </section>

          <section class="cs-section scroll-animate">
            <p class="section-label">{{ designCase.components.label }}</p>
            <h2 class="cs-section-title">{{ designCase.components.title }}</h2>

            <div v-if="designCase.components.paragraphs?.length" class="components-intro-copy">
              <p v-for="(p, i) in designCase.components.paragraphs" :key="`components-copy-${i}`">
                {{ p }}
              </p>
            </div>

            <section class="design-components-carousel" role="region" aria-label="Component examples carousel">
              <button type="button" class="carousel-arrow carousel-arrow-prev" aria-label="Previous component"></button>
              <div class="swiper components-swiper" ref="componentsSwiperEl">
                <div class="swiper-wrapper">
                  <article v-for="row in designCase.components.rows" :key="row.title" class="swiper-slide component-slide">
                    <div class="component-image">
                      <img :src="row.image" :alt="row.title" loading="lazy" />
                    </div>
                    <div class="component-body">
                      <h3 class="component-title">{{ row.title }}</h3>
                      <p class="component-text">{{ row.body }}</p>
                    </div>
                  </article>
                </div>
                <div class="swiper-pagination"></div>
              </div>
              <button type="button" class="carousel-arrow carousel-arrow-next" aria-label="Next component"></button>
            </section>
          </section>
        </div>
      </section>
    </div>

    <div v-else class="design-not-found">
      <p class="design-not-found-text">Case study not found.</p>
    </div>

    <Footer />
  </main>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import ProjectDetailHero from '@/components/ProjectDetailHero.vue'
import Footer from '@/components/Footer.vue'
import { getDesignCaseBySlug } from '@/data/designCases'

const route = useRoute()
const designContentRef = ref(null)
const componentsSwiperEl = ref(null)
let componentsSwiper = null
let sectionObserver = null

const designCase = computed(() => getDesignCaseBySlug(route.params.slug))

function initSectionScrollAnimations() {
  sectionObserver?.disconnect()
  sectionObserver = null
  if (!designContentRef.value) return
  const targets = designContentRef.value.querySelectorAll('.scroll-animate')
  if (!targets.length) return

  sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          sectionObserver?.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  )

  targets.forEach((el) => sectionObserver.observe(el))
}

function initComponentsSwiper() {
  if (!componentsSwiperEl.value || !designCase.value?.components?.rows?.length) return

  componentsSwiper?.destroy(true, true)
  componentsSwiper = new Swiper(componentsSwiperEl.value, {
    modules: [Navigation, Pagination],
    slidesPerView: 2,
    spaceBetween: 20,
    loop: designCase.value.components.rows.length > 3,
    navigation: {
      nextEl: '.design-components-carousel .carousel-arrow-next',
      prevEl: '.design-components-carousel .carousel-arrow-prev',
    },
    pagination: {
      el: '.design-components-carousel .swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 12 },
      700: { slidesPerView: 2, spaceBetween: 16 },
    },
  })
}

watch(
  designCase,
  () => {
    nextTick(() => {
      initComponentsSwiper()
      initSectionScrollAnimations()
    })
  },
  { immediate: true }
)

onMounted(() => {
  nextTick(() => {
    initComponentsSwiper()
    initSectionScrollAnimations()
  })
})

onUnmounted(() => {
  componentsSwiper?.destroy(true, true)
  componentsSwiper = null
  sectionObserver?.disconnect()
  sectionObserver = null
})

function isExternalHref(href) {
  return typeof href === 'string' && /^https?:\/\//.test(href)
}

function linkTarget(href) {
  return isExternalHref(href) ? '_blank' : null
}

function linkRel(href) {
  return isExternalHref(href) ? 'noopener noreferrer' : null
}
</script>

<style lang="scss" scoped>
@use '../../styles/scss/global/variables' as *;

.scroll-animate {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.scroll-animate.in-view {
  opacity: 1;
  transform: translateY(0);
}

.design-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: $space-4xl 1.5rem;
  border-radius: $radius-2xl;
}

.design-content {
  display: flex;
  flex-direction: column;
  gap: $space-3xl;
}

.fade-in-on-load {
  animation: contentFadeIn 0.6s ease-out both;
}

@keyframes contentFadeIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.project-detail-nav {
  background: transparent;
  margin-bottom: 0;
  height: auto;
  position: static;
  font-weight: 700;
}

.back-link {
  color: inherit;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
}

.back-link:hover {
  text-decoration: underline;
}

.cs-hero-card {
  background: $white-pure;
  border: 1px solid $slate-border;
  border-radius: $radius-2xl;
  padding: $space-2xl;
  box-shadow: $shadow-sm;
}

.cs-hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: $space-3xl;
  align-items: center;
}

.cs-hero-image {
  max-height: 500px; 
  overflow: scroll;
}

.eyebrow {
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: $teal-ui;
  margin: 0 0 $space-md;
}

.cs-hero-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 700;
  color: $slate-900;
  margin: 0 0 $space-md;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.cs-lead {
  font-family: 'Poppins', sans-serif;
  font-size: 0.98rem;
  color: $slate-600;
  line-height: 1.7;
  margin: 0 0 $space-lg;
}

.cs-tags {
  display: flex;
  flex-wrap: wrap;
  gap: $space-sm;
  margin-bottom: $space-lg;
}

.cs-tags span {
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: $slate-600;
  padding: 0.45rem $space-md;
  border-radius: 999px;
  border: 1px solid $teal-accent-spot;
  background: $teal-accent-spot-soft;
}

.cs-actions {
  display: flex;
  gap: $space-md;
  flex-wrap: wrap;
}

.cs-btn-outline {
  background: transparent !important;
  color: $teal-ui !important;
  border: 1px solid $teal-ui !important;
}

.cs-btn-outline:hover {
  background: $teal-ui-glass-hover !important;
  color: $navy !important;
}

.cs-section {
  border-top: 1px solid $slate-border;
  padding-top: $space-3xl;
}

.text-narrow {
  max-width: 960px;
}

.cs-section:first-child {
  border-top: none;
  padding-top: 0;
}

.section-label {
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: $slate-500;
  margin: 0 0 $space-sm;
}

.cs-section-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: $slate-900;
  margin: 0 0 $space-md;
  line-height: 1.25;
  max-width: 760px;
}

.cs-section p {
  margin: 0 0 $space-md;
  color: $slate-600;
  line-height: 1.8;
  font-size: 0.98rem;
}

.cs-section p:last-child {
  margin-bottom: 0;
}

.cs-grid-2 {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: $space-3xl;
  align-items: start;
}

.cs-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.cs-list li {
  position: relative;
  padding-left: 1.45rem;
  color: $slate-600;
  line-height: 1.7;
  margin-bottom: $space-sm;
}

.cs-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.65em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: $teal-ui;
  opacity: 0.85;
}

.image-card {
  border: 1px solid $slate-border;
  border-radius: $radius-xl;
  overflow: hidden;
  background: $white-pure;
  box-shadow: $shadow-sm;
}

.image-card img {
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  object-position: top;
  display: block;
}

.strategy-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $space-xl;
  margin-top: $space-lg;
}

.text-card {
  background: $white-pure;
  border: 1px solid $slate-border;
  border-radius: $radius-lg;
  padding: $space-lg;
  box-shadow: $shadow-sm;
}

.text-card-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: $slate-900;
  margin: 0 0 $space-sm;
}

.text-card-body {
  margin: 0;
  color: $slate-600;
  line-height: 1.7;
  font-size: 0.95rem;
}

.pm-section-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: $space-2xl;
  align-items: start;
}

.pm-layout {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: $space-2xl;
  align-items: start;
}


.pm-copy {
  margin: 0;
  color: $slate-600;
  line-height: 1.7;
  font-size: 0.95rem;
}

.pm-highlights {
  border-left: 2px solid $teal-ui;
  padding-left: $space-lg;
}

.pm-highlights-title {
  margin: 0 0 $space-md;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: $slate-900;
}

.pm-list {
  list-style: none;
  margin: $space-lg 0 0;
  padding: 0;
  display: grid;
  gap: $space-sm;
}

.pm-list li {
  position: relative;
  padding-left: 1.45rem;
  color: $slate-600;
  line-height: 1.65;
}

.pm-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.65em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: $teal-ui;
  opacity: 0.85;
}

.pm-image-inline {
  margin-top: $space-xl;
}

.pm-image-inline img {
  width: 100%;
  border-radius: $radius-xl;
  border: 1px solid $slate-border;
  display: block;
  object-fit: cover;
  object-position: top;
}

.components-intro-copy {
  margin-bottom: $space-lg;
}

.components-intro-copy p {
  margin: 0;
  color: $slate-600;
  line-height: 1.75;
  font-size: 0.95rem;
}

.design-components-carousel {
  position: relative;
  margin-top: $space-md;
  padding: 0 3rem;
  width: 100%;
}

.components-swiper {
  width: 100% !important;
  margin: 0 !important;
  padding-bottom: 5rem;
  overflow: hidden;
}

.components-swiper :deep(.swiper-wrapper) {
  align-items: stretch;
}

.design-components-carousel :deep(.swiper-slide) {
  height: auto;
  display: flex;
}

.component-slide {
  border: 1px solid $slate-border;
  border-radius: $radius-xl;
  background: $white-pure;
  box-shadow: $shadow-sm;
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.component-image {
  border-bottom: 1px solid $slate-border;
}

.component-image img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  object-position: top;
  display: block;
}

.component-body {
  padding: $space-lg;
}

.component-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: $slate-900;
  margin: 0 0 $space-sm;
}

.component-text {
  margin: 0;
  color: $slate-600;
  line-height: 1.7;
}

.design-components-carousel .carousel-arrow {
  position: absolute;
  top: 42%;
  transform: translateY(-50%);
  z-index: 2;
  width: 44px;
  height: 44px;
  margin: 0;
  padding: 0;
  border: 2px solid $white-border-strong;
  border-radius: 50%;
  background: $teal-ui-glass;
  color: $white-pure;
  cursor: pointer;
  transition: background 0.25s, border-color 0.25s, transform 0.2s;
}

.design-components-carousel .carousel-arrow::after {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: block;
  line-height: 1;
  font-size: 1.4rem;
  font-weight: 700;
}

.design-components-carousel .carousel-arrow:hover {
  background: $teal-ui-glass-hover;
  border-color: $white-border-arrow;
}

.design-components-carousel .carousel-arrow-prev {
  left: -50px;
}

.design-components-carousel .carousel-arrow-prev::after {
  content: '‹';
}

.design-components-carousel .carousel-arrow-next {
  right: -50px;
}

.design-components-carousel .carousel-arrow-next::after {
  content: '›';
}

.design-components-carousel :deep(.swiper-pagination) {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2px !important;
  margin-top: 0;
  display: flex;
  justify-content: center;
  gap: 0.55rem;
}

.design-components-carousel :deep(.swiper-pagination-bullet) {
  width: 9px;
  height: 9px;
  background: $teal-carousel-bullet;
  opacity: 1;
  border-radius: 50%;
}

.design-components-carousel :deep(.swiper-pagination-bullet-active) {
  background: $teal-ui;
  transform: scale(1.25);
  box-shadow: $shadow-focus;
}

.design-not-found {
  max-width: 700px;
  margin: $space-4xl auto;
  padding: 0 1.5rem;
  color: $slate-600;
}

.design-not-found-text {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
}

@media (max-width: 920px) {
  .cs-hero-grid {
    grid-template-columns: 1fr;
  }

  .cs-grid-2 {
    grid-template-columns: 1fr;
  }

  .pm-section-grid,
  .pm-layout {
    grid-template-columns: 1fr;
  }

  .components-intro-copy {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .design-section {
    padding: 2rem 1rem 2.5rem;
  }

  .cs-section {
    padding-top: $space-2xl;
  }

  .strategy-grid {
    grid-template-columns: 1fr;
  }



  .design-components-carousel {
    padding: 0 2rem;
  }

  .design-components-carousel .carousel-arrow {
    width: 40px;
    height: 40px;
  }
  
  .design-components-carousel .carousel-arrow-prev {
    left: -10px;
  }

  .design-components-carousel .carousel-arrow-next {
    right: -10px;
  }

  .components-swiper { padding-bottom: 2rem; }
}
</style>

