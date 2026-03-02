<script>
import TopBar from './components/TopBar.vue'
import NavBar from './components/NavBar.vue'
import Principio from './components/Principio.vue';

export default {
  components: {
    TopBar,
    NavBar,
    Principio
  }
}
</script>

<template>
  <div>
     <TopBar />
    <NavBar />
    <main class="main-content">
      <Principio />
    </main>
    <!-- contenido principal -->
  </div>
</template>
<style scoped>
.main-content {
  margin-top: 80px; /* suma la altura del TopBar + Navbar */
  padding: 1rem;
}
</style>
