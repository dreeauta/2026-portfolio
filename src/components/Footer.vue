<template>
  <footer class="footer">
    <div class="footer-inner">


      <div class="footer-icons">
        <a href="https://github.com/dreeauta" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <img :src="iconUrls.github" alt="" />
        </a>
        <a href="https://www.linkedin.com/in/andreea-uta/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <img :src="iconUrls.linkedin" alt="" />
        </a>
      </div>
      <p class="footer-copyright">© {{ currentYear }} Andreea Uta. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const iconUrls = {
  github: '/img/icon/github.webp',
  linkedin: '/img/icon/linkedin.webp',
  instagram: '/img/icon/instagram.webp',
}

const currentYear = computed(() => new Date().getFullYear())
</script>

<style lang="scss" scoped>
@use '../../styles/scss/global/variables' as *;

.footer {
  background: linear-gradient(90deg, #e8dce4 0%, #dde6eb 25%, #dce8e4 50%, #e4e0e8 75%, #e8dce4 100%) !important;
  font-family: 'Poppins', sans-serif;
  padding: 3rem 1.5rem 2rem;
  border-top: 1px solid rgba($darkgray, 0.15);
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  text-align: center;
  padding: 0 100px;
  width: 100%;
}

.footer-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: $black;
  margin: 0 0 0.25rem;
}

.footer-tagline {
  font-size: 0.9rem;
  color: $black;
  margin: 0 0 0.5rem;
}

.footer-note {
  font-size: 0.85rem;
  color: $darkgray;
  margin: 0 0 1.25rem;
  line-height: 1.5;
}

.footer-icons {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.footer-icons a {
  display: inline-block;
  text-decoration: none;
  opacity: 0.75;
  transition: opacity 0.2s;
}

.footer-icons a:hover {
  opacity: 1;
}

.footer-icons img {
  width: 24px;
  height: 24px;
  display: block;
  filter: brightness(0); /* icons appear as $black on light bg */
}

.footer-copyright {
  font-size: 0.8rem;
  color: $darkgray;
  margin: 0;
}

@media only screen and (max-width: 768px) {
  .footer-inner {
    flex-direction: column;
    padding: 0 30px;
  }
}
</style>
