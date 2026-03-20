<template>
  <section class="cs-section cs-cta" id="contact">
    <h2 class="cs-cta-title">{{ cta.title }}</h2>
    <p class="cs-cta-lead">{{ cta.lead }}</p>
    <a :href="cta.buttonHref" class="app-btn">{{ cta.buttonLabel }}</a>
  </section>
</template>

<script setup>
defineProps({
  cta: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
@use '../../styles/scss/global/variables' as *;

.cs-section {
  border-top: 1px solid $slate-border;
  padding-top: $space-3xl;
}

.cs-cta {
  border-top: none;
  padding-top: 0;
  text-align: center;
  color: $white-pure;
  border-radius: $radius-2xl;
  padding: $space-2xl;
  position: relative;
  overflow: hidden;
  box-shadow: $shadow-md;
}

.cs-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 60% at 50% 0%, $teal-ui-glow-strong 0%, transparent 55%);
  pointer-events: none;
  opacity: 0.9;
}

.cs-cta > * {
  position: relative;
  z-index: 1;
}

.cs-cta-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 700;
  margin: 0 0 $space-sm;
  line-height: 1.2;
  color: $white-pure;
}

.cs-cta-lead {
  margin: 0 0 $space-lg;
  color: $white-muted;
  line-height: 1.7;
  font-size: 1rem;
}
</style>

