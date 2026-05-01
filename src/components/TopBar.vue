<template>
  <div class="top-bar">
    <div class="social-icons">
      <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
      <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
      <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
    </div>

    <div class="search-box">
      <input v-model="search" type="text" placeholder="BUSCAR" @keyup.enter="submitSearch" />
      <button class="search-button" @click="submitSearch" aria-label="Buscar">
        <i class="fas fa-search"></i>
      </button>
    </div>

    <div class="extra-links">
      <a href="#" @click.prevent="$emit('navigate', 'noticias')">NOTICIAS</a>
      <a href="#" @click.prevent="$emit('navigate', 'eventos')">EVENTOS</a>
      <a href="#">TIENDA</a>
      <a href="#">INGLES</a>
      <a href="#" @click.prevent="$emit('navigate', 'panel')">PANEL</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  emits: ['navigate', 'search'],
  data() {
    return {
      search: ''
    }
  },
  methods: {
    submitSearch() {
      const term = this.search.trim();

      if (term) {
        this.$emit('search', term);
      }
    }
  }
}
</script>

<style scoped>
.top-bar {
  align-items: center;
  background-color: #000000;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  font-family: sans-serif;
  font-size: 13px;
  font-weight: normal;
  gap: 0.8rem;
  justify-content: space-between;
  left: 0;
  padding: 0.42rem clamp(1rem, 4vw, 3rem);
  position: fixed;
  text-transform: none;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.social-icons a {
  margin-right: 0.5rem;
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.search-box input {
  background-color: #000;
  color: #fff;
  border: none;
  border-bottom: 1px solid #fff;
  padding: 0.3rem 0.6rem;
  font-size: 13px;
  outline: none;
  border-radius: 0;
  width: 160px;
}


.search-box button {
  background: none;
  border: none;
  margin-left: 0.3rem;
  cursor: pointer;
  color: #fff;
}

.extra-links a {
  margin-left: 1rem;
  color: #ffffff;
  text-decoration: none;
  font-size: 13px;
}
.search-button {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #fff;
}
@media (max-width: 780px) {
  .top-bar {
    align-items: stretch;
    flex-direction: column;
  }

  .extra-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .extra-links a {
    margin-left: 0;
  }

  .search-box input {
    width: 100%;
  }
}
</style>
