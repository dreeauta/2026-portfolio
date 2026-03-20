<template>
  <header class="site-header">
    <RouterLink to="/" class="logo">AU</RouterLink>
    <nav class="nav-desktop">
      <RouterLink to="/projects" class="nav-link">Projects & Design</RouterLink>
      <RouterLink to="/skills" class="nav-link">Skills</RouterLink>
      <RouterLink to="/about" class="nav-link">About</RouterLink>
      <RouterLink to="/contact" class="nav-link">Contact</RouterLink>
    </nav>
    <div class="nav-social">
      <a href="https://github.com/dreeauta" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <img :src="iconUrls.github" alt="" />
      </a>
      <a href="https://www.linkedin.com/in/andreea-uta/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <img :src="iconUrls.linkedin" alt="" />
      </a>

    </div>
    <!-- Mobile: hamburger + overlay -->
    <button
      type="button"
      class="menu-toggle"
      aria-label="Toggle menu"
      aria-expanded="menuOpen"
      @click="menuOpen = !menuOpen"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
    <Transition name="menu">
      <div v-if="menuOpen" class="nav-mobile-overlay" @click="menuOpen = false">
        <nav class="nav-mobile" @click.stop>
          <RouterLink to="/projects" class="nav-link" @click="menuOpen = false">Projects & Design</RouterLink>
          <RouterLink to="/skills" class="nav-link" @click="menuOpen = false">Skills</RouterLink>
          <RouterLink to="/about" class="nav-link" @click="menuOpen = false">About</RouterLink>
          <RouterLink to="/contact" class="nav-link" @click="menuOpen = false">Contact</RouterLink>
          <div class="nav-mobile-social">
            <a href="https://github.com/dreeauta" target="_blank" rel="noopener noreferrer"><img :src="iconUrls.github" alt="GitHub" /></a>
            <a href="https://www.linkedin.com/in/andreea-uta/" target="_blank" rel="noopener noreferrer"><img :src="iconUrls.linkedin" alt="LinkedIn" /></a>
            <a href="https://www.instagram.com/dreeadesigns/" target="_blank" rel="noopener noreferrer"><img :src="iconUrls.instagram" alt="Instagram" /></a>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const iconUrls = {
  github: '/img/icon/github.webp',
  linkedin: '/img/icon/linkedin.webp',
  instagram: '/img/icon/instagram.webp',
}
const menuOpen = ref(false)
</script>

<style lang="scss" scoped>
@use '../../styles/scss/global/variables' as *;

/* Override global nav styles so header is one bar; inner navs are not fixed/white */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem $space-lg;
  background: linear-gradient(90deg, #e8dce4 0%, #dde6eb 25%, #dce8e4 50%, #e4e0e8 75%, #e8dce4 100%) !important;
  color: $nav-text;
  font-family: 'Poppins', sans-serif;
  box-shadow: $shadow-nav;
  width: 100%;
}
.site-header .nav-desktop,
.site-header .nav-mobile {
  position: static !important;
  width: auto !important;
  height: auto !important;
  background: transparent !important;
  box-shadow: none;
}
.logo {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: $nav-text;
  text-decoration: none;
}
.nav-desktop {
  display: none;
}
.nav-desktop .nav-link {
  color: $nav-text;
  text-decoration: none;
  margin-left: $space-lg;
  font-size: 0.95rem;
}
.nav-desktop .nav-link:hover,
.nav-desktop .nav-link.router-link-active {
  color: $darkblue;
  font-weight: 700;
}
.nav-social {
  display: none;
}
.nav-social a {
  margin-left: $space-md;
  opacity: 0.9;
}
.nav-social a:hover {
  opacity: 1;
}
.nav-social img {
  width: 22px;
  height: 22px;
  filter: brightness(0);
}
.menu-toggle {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.menu-toggle span {
  width: 24px;
  height: 2px;
  background: $nav-text;
}
/* Desktop: show nav + social, hide hamburger */
@media (min-width: 900px) {
  .nav-desktop,
  .nav-social {
    display: flex;
    align-items: center;
  }
  .menu-toggle {
    display: none;
  }
  .nav-mobile-overlay {
    display: none !important;
  }
}
/* Mobile overlay */
.nav-mobile-overlay {
  position: fixed;
  inset: 0;
  background: $black-overlay;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 56px;
}
.nav-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}
.nav-mobile .nav-link {
  color: $white-pure;
  text-decoration: none;
  font-size: 1.25rem;
}
.nav-mobile-social {
  display: flex;
  gap: $space-md;
  margin-top: $space-md;
}
.nav-mobile-social img {
  width: 28px;
  height: 28px;
  filter: brightness(0) invert(1);
}
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
</style>
