<template>
  <section
    class="hero-page"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <div
      class="hero-spot"
      :style="spotStyle"
      aria-hidden="true"
    ></div>
    <div class="hero-inner">
      <p class="hero-greeting hero-anim">Hi, my name is</p>
      <h1 class="hero-name hero-anim">Andreea Uta.</h1>
      <h2 class="hero-tagline hero-anim">I create and build experiences for the web.</h2>
      <p class="hero-about hero-anim">
        I’m a product designer and front-end developer passionate about turning ideas into engaging digital experiences for the web.
      </p>

      <div class="hero-quick-links hero-anim">
        <RouterLink to="/projects" class="app-btn">Projects</RouterLink>
        <RouterLink to="/contact" class="app-btn">Contact</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const mouseX = ref(null)
const mouseY = ref(null)

function onMouseMove(e) {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

function onMouseLeave() {
  mouseX.value = null
  mouseY.value = null
}

const spotStyle = computed(() => {
  if (mouseX.value == null || mouseY.value == null) return { opacity: '0' }
  return {
    '--x': `${mouseX.value}px`,
    '--y': `${mouseY.value}px`,
    opacity: '1',
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/scss/global/variables' as *;

.hero-page {
  position: relative;
  min-height: calc(100vh - 56px);
  display: flex;
  align-items: center;   
  background-image: linear-gradient(to right top,  #77599c, #5e5b98, #4a619a, #34669a, #1e6a96, #007598, #007f97, #008891, #179089);  padding: 4rem 1.5rem 6rem;
  box-sizing: border-box;
  overflow: hidden;
}

.hero-spot {
  position: fixed;
  left: var(--x, 0);
  top: var(--y, 0);
  width: min(80vmax, 600px);
  height: min(80vmax, 600px);
  pointer-events: none;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    $teal-accent-spot 0%,
    $teal-accent-spot-soft 45%,
    transparent 70%
  );
  transition: opacity 0.25s ease;
  z-index: 0;
}

.hero-inner {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Staggered entrance animation */
.hero-anim {
  opacity: 0;
  animation: heroFadeUp 0.7s ease-out forwards;
}
.hero-greeting.hero-anim { animation-delay: 0.1s; }
.hero-name.hero-anim { animation-delay: 0.2s; }
.hero-tagline.hero-anim { animation-delay: 0.35s; }
.hero-about.hero-anim { animation-delay: 0.5s; }
.hero-quick-links.hero-anim { animation-delay: 0.65s; }

@keyframes heroFadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-greeting {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  font-weight: 400;
  color: $teal-accent;
  margin: 0 0 0.5rem;
  line-height: 1.4;
}

.hero-name {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 700;
  color: $text-light;
  margin: 0 0 0.5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.hero-tagline {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.75rem, 5vw, 2.75rem);
  font-weight: 400;
  color: $white-pure;
  margin: 0 0 1.25rem;
  line-height: 1.2;
}

.hero-about {
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: $white-about;
  margin: 0 0 2.5rem;
  max-width: 540px;
  line-height: 1.65;
}

.hero-about :deep(a) {
  color: $teal-accent;
  text-decoration: none;
  transition: color 0.2s;
}
.hero-about :deep(a:hover) {
  color: $teal-accent-hover;
}

.hero-cta {
  margin-top: 0;
}

.hero-quick-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
}

.hero-btn {
  display: inline-block;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: $teal-accent;
  text-decoration: none;
  padding: 0.85rem 1.5rem;
  background: transparent;
  border: 1px solid $teal-accent;
  border-radius: $radius-sm;
  transition: background 0.2s, color 0.2s;
}

.hero-btn:hover {
  background: $teal-accent-spot-soft;
  color: $teal-accent;
}

@media (max-width: 768px) {
  .hero-page {
    padding: 3rem 1.25rem 4rem;
  }
  .hero-about {
    margin-bottom: 2rem;
  }
}
</style>
