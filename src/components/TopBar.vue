<template>
  <div class="top-bar">
    <div class="social-icons">
      <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
      <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
      <a href="#" aria-label="X"><i class="fab fa-x-twitter"></i></a>
      <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
      <a href="#" aria-label="Correo"><i class="fa-solid fa-envelope"></i></a>
    </div>

    <div class="search-box">
      <input v-model="search" type="text" placeholder="BUSCAR" @keyup.enter="submitSearch" />
      <button class="search-button" @click="submitSearch" aria-label="Buscar">
        <span class="search-icon"></span>
      </button>
    </div>

    <div class="extra-links">
      <a href="#" @click.prevent="$emit('navigate', 'noticias')">NOTICIAS</a>
      <a href="#" @click.prevent="$emit('navigate', 'eventos')">EVENTOS</a>
      <a href="#" @click.prevent="$emit('navigate', 'recursos')">RECURSOS</a>
      <a href="#" @click.prevent="$emit('navigate', 'ministerios')">MINISTERIOS</a>
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  box-sizing: border-box;
  color: #fff;
  display: flex;
  font-family: sans-serif;
  font-size: 13px;
  font-weight: normal;
  gap: 0.8rem;
  justify-content: space-between;
  left: 0;
  height: 46px;
  padding: 0 clamp(1.25rem, 3vw, 4rem);
  position: fixed;
  text-transform: none;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.social-icons a {
  color: #ffffff;
  text-decoration: none;
  font-size: 0.9rem;
}

.social-icons {
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  gap: clamp(1rem, 1.6vw, 1.55rem);
  white-space: nowrap;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 280px;
  min-width: 190px;
  width: 22vw;
}

.search-box input {
  background-color: #000;
  color: #fff;
  border: none;
  border-bottom: 1px solid #fff;
  padding: 0.16rem 0.35rem;
  font-size: 0.82rem;
  outline: none;
  border-radius: 0;
  width: 100%;
  text-transform: uppercase;
}


.search-box button {
  background: none;
  border: none;
  margin-left: 0.3rem;
  cursor: pointer;
  color: #fff;
}

.search-icon {
  border: 2px solid #fff;
  border-radius: 999px;
  display: inline-block;
  height: 14px;
  position: relative;
  width: 14px;
}

.search-icon::after {
  background: #fff;
  border-radius: 999px;
  bottom: -4px;
  content: "";
  height: 7px;
  position: absolute;
  right: -4px;
  transform: rotate(-45deg);
  width: 2px;
}

.extra-links a {
  margin-left: clamp(1.25rem, 2.4vw, 2.7rem);
  color: #ffffff;
  text-decoration: none;
  font-size: clamp(0.72rem, 0.9vw, 0.88rem);
  font-weight: 800;
  letter-spacing: 0.02em;
}

.extra-links {
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  white-space: nowrap;
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
    height: 118px;
    justify-content: center;
    padding-bottom: 0.65rem;
    padding-top: 0.65rem;
  }

  .social-icons,
  .extra-links {
    flex-wrap: wrap;
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

  .search-box {
    margin: 0;
    max-width: none;
    width: 100%;
  }
}
</style>
