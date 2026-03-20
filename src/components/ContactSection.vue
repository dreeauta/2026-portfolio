<template>
  <section class="contact-modern" id="contact">
    <div class="contact-modern-bg" aria-hidden="true"></div>
    <div class="contact-modern-inner">
      <form
        class="contact-form-modern"
        action="https://formspree.io/dreeadesigns@gmail.com"
        method="POST"
        @submit="onSubmit"
      >
        <div class="form-row">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              name="name"
              placeholder="Your name"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              name="email"
              placeholder="you@example.com"
              class="form-input"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <label for="phone">Phone</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            name="phone"
            placeholder="Optional"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="project">Project description</label>
          <textarea
            id="project"
            v-model="form.message"
            name="message"
            placeholder="Tell me about your project..."
            class="form-input form-textarea"
            rows="5"
            required
          ></textarea>
        </div>
        <div class="form-status"></div>
        <button type="submit" class="app-btn">Send message</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
})

function onSubmit(e) {
  const email = form.email
  if (!email || email.length < 5 || !email.includes('@') || !email.includes('.')) {
    e.preventDefault()
    return
  }
  if (form.message.length < 5) {
    e.preventDefault()
    return
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/scss/global/variables' as *;

.contact-modern {
  width: 100%;
  padding: $space-xl $space-md $space-4xl;
  position: relative;
  min-height: 50vh;
}
/* Same teal glow as carousel shared bg */
.contact-modern-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.contact-modern-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 50% at 50% 0%, $teal-ui-glow 0%, transparent 55%);
  pointer-events: none;
}
.contact-modern-inner {
  position: relative;
  max-width: 640px;
  margin: 0 auto;
  background: $white-overlay;
  border-radius: $radius-xl;
  padding: $space-xl;
  border: 1px solid $white-border;
  box-shadow: $shadow-xl;
  backdrop-filter: blur(10px);
}
.contact-form-modern {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.form-group label {
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: $gray-700;
}
.form-input {
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  padding: 0.65rem $space-md;
  border: 1px solid $gray-border;
  border-radius: 10px;
  background: $gray-bg-input;
  transition: border-color 0.2s, background 0.2s;
}
.form-input::placeholder {
  color: $gray-300;
}
.form-input:focus {
  outline: none;
  border-color: $black;
  background: $white-pure;
}
.form-textarea {
  resize: vertical;
  min-height: 120px;
}
.app-btn {
  margin-top: $space-sm;
}
@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  .contact-modern-inner {
    padding: $space-lg;
  }
}
</style>
