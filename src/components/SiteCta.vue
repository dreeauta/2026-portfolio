<template>
  <section class="site-section site-cta">
    <h2 class="site-cta-title">Your website should do more than look good.</h2>
    <p class="site-cta-lead">I create product-driven digital experiences that align business goals with user needs.</p>
    <RouterLink to="/contact" class="app-btn">Contact</RouterLink>
  </section>
</template>

<script setup>
</script>

<style lang="scss" scoped>
@use '../../styles/scss/global/variables' as *;

.site-section.site-cta {
  background-image: linear-gradient(to right top, #34669a, #1e6a96, #007598, #007f97, #008891, #179089, #179089);
  border-radius: 0 40px 0 0;
  margin: 100px auto 50px;
  color: $white-pure;
  padding: $space-2xl;
  max-width: 1200px;
}

@media (max-width: 640px) {
  .site-section.site-cta {
    margin: 80px 16px 40px;
  }
}


.site-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 60% at 50% 0%, $teal-ui-glow-strong 0%, transparent 55%);
  pointer-events: none;
  opacity: 0.9;
}

.site-cta > * {
  position: relative;
  z-index: 1;
}

.site-cta-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 700;
  margin: 0 0 $space-sm;
  line-height: 1.2;
  color: $white-pure;
}

.site-cta-lead {
  margin: 0 0 $space-lg;
  color: $white-muted;
  line-height: 1.7;
  font-size: 1rem;
}
</style>

