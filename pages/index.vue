<template>
  <section class="container">
    <h1 class="title">quiz</h1>
    <h2 class="subtitle mb-5">project</h2>

    <Quiz />

    <h2 class="subtitle mb-5">About the project</h2>
    <ul class="text-left mb-5">
      <li>SSR + PWA</li>
      <li>Vue + Vuex &amp; Nuxt</li>
      <li>Toasts with Nuxt's pluggable architecture</li>
      <li>Calls external API - CORS</li>
      <li>Utilizes Aria in couple places</li>
      <li>LESS + SCSS BS4 modules with Flexbox support</li>
      <li>Fully responsive - RWD</li>
      <li>Contains one parallax effect</li>
    </ul>

    <h2 class="subtitle mb-5">Info</h2>
    <ul class="text-left">
      <li>BS4 is overkill in here... But it's just an example</li>
      <li>App wasn't optimized for performance or size</li>
      <li>Don't get surprised, it's just a demo</li>
    </ul>

    <div class="links">
      <a href="https://nuxtjs.org/" target="_blank" class="button--green"
      >Documentation</a
      >
      <a
      href="https://github.com/nuxt/nuxt.js"
      target="_blank"
      class="button--grey"
      >GitHub</a
      >
    </div>
  </section>
</template>

<script>
import Quiz from '~/components/Quiz.vue'

export default {
  transition: 'index',
  components: {
    Quiz
  },
  async fetch ({ store, params }) {
    await store.dispatch('quiz/GET_QUESTIONS')
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  margin: 4rem 0;
}
</style>
