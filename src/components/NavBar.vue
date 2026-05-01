<template>
  <header class="navbar">
    <nav class="nav-container">
      <a href="#" class="logo-button" @click.prevent="go('inicio')">
        <span class="brand-monogram" aria-hidden="true">CME</span>
        <span class="sr-only">Centro Misionero Escambray</span>
      </a>
      <ul class="nav-links oval-group">
        <li>
  <a
    href="#"
    :class="{ active: activeItem === 'inicio' }"
    @click.prevent="go('inicio')"
  >
    INICIO
  </a>
</li>
        <li>
  <a
    href="#"
    :class="{ active: activeItem === 'sobre' }"
    @click.prevent="go('paginas')"
  >
    SOBRE
  </a>
</li>
     <li class="dropdown">
  <a
    href="#"
    :class="{ active: activeItem === 'creencias' }"
    @click.prevent="toggleDropdown('creencias'); setActiveItem('creencias')"
  >
    CREENCIAS<span class="arrow">▼</span>
  </a>
 <ul v-if="activeDropdown === 'creencias'" class="submenu">
  <li><a href="#" @click.prevent="go('paginas', 'creencias')">Nuestras cuatro verdades cardinales</a></li>
  <li><a href="#" @click.prevent="go('paginas', 'creencias')">Declaración de verdades fundamentales</a></li>
  <li><a href="#" @click.prevent="go('paginas', 'creencias')">Normas doctrinales y declaraciones</a></li>
</ul>

</li>
       <li class="dropdown">
  <a
    href="#"
   :class="{ active: activeItem === 'ministerios' }"
    @click.prevent="toggleDropdown('ministerios'); setActiveItem('ministerios')"
  >
    MINISTERIOS<span class="arrow">▼</span>
  </a>
<ul v-if="activeDropdown === 'ministerios'" class="submenu">
  <li><a href="#" @click.prevent="go('ministerios', 'ministerios')">Todos los ministerios</a></li>
  <li><a href="#" @click.prevent="go('ministerios', 'ministerios')">Adultos y familias</a></li>
  <li><a href="#" @click.prevent="go('ministerios', 'ministerios')">Jóvenes</a></li>
  <li><a href="#" @click.prevent="go('ministerios', 'ministerios')">Niños</a></li>
  <li><a href="#" @click.prevent="go('ministerios', 'ministerios')">Líderes y ministros</a></li>
  <li><a href="#" @click.prevent="go('ministerios', 'ministerios')">Educación</a></li>
</ul>


</li>
<li>
  <a
    href="#"
    :class="{ active: activeItem === 'misiones' }"
    @click.prevent="go('misiones')"
  >
    MISIONES
  </a>
</li>
   <li class="dropdown">
  <a
    href="#"
    :class="{ active: activeItem === 'recursos' }"
    @click.prevent="toggleDropdown('recursos'); setActiveItem('recursos')"
  >
    RECURSOS<span class="arrow">▼</span>
  </a>
 <ul v-if="activeDropdown === 'recursos' " class="submenu">
  <li><a href="#" @click.prevent="go('recursos', 'recursos')">Para Ministerios</a></li>
  <li><a href="#" @click.prevent="go('recursos', 'recursos')">Para Iglesias</a></li>
  <li><a href="#" @click.prevent="go('recursos', 'recursos')">Para distritos</a></li>
    <li><a href="#" @click.prevent="go('recursos', 'recursos')">Descargas</a></li>
      <li><a href="#" @click.prevent="go('recursos', 'recursos')">Más recursos</a></li>
</ul>

</li>
        <li>
  <a
     href="#"
    :class="{ active: activeItem === 'donar' }"
    @click.prevent="go('contacto')"
  >
    DONAR
  </a>
</li>
        <li>
  <a
    href="#"
    :class="{ active: activeItem === 'contacto' }"
    @click.prevent="go('contacto')"
  >
    CONTACTO
  </a>
</li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  emits: ['navigate'],
  data() {
    return {
      activeItem: null,
      activeDropdown: null
    }
  },
  methods: {
 go(view, parent = null) {
  this.setActiveItem(view, parent);
  this.$emit('navigate', view);
 },
 setActiveItem(name, parent = null) {
  // Si la opción tiene un padre (viene de un submenú), marcamos el padre como activo
  this.activeItem = parent || name;

  const desplegables = ['ministerios', 'creencias', 'recursos'];

  // Si la opción seleccionada NO es un desplegable principal, cerramos el submenú
  if (!desplegables.includes(this.activeItem)) {
    this.activeDropdown = null;
  }
},




    toggleDropdown(name) {
  this.activeDropdown = this.activeDropdown === name ? null : name;
  this.activeItem = name;
},

    handleClickOutside(event) {
      const menu = this.$el.querySelector('.oval-group');
      if (!menu.contains(event.target)) {
        this.activeItem = null;
        this.activeDropdown = null;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
}



</script>


<style scoped>
.navbar {
  background-color: #fff;
  border-bottom: 1px solid rgba(16, 24, 20, 0.1);
  box-shadow: none;
  min-height: 116px;
  padding: 1.05rem clamp(1.25rem, 3vw, 4rem);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: clamp(2rem, 5vw, 7rem);
  margin: 0 auto;
  max-width: 1440px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  font-family: sans-serif;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
}

.nav-links li a {
  font-family: sans-serif;
  font-size: clamp(0.86rem, 1.2vw, 1.18rem);
  font-weight: 800;
  color: #162119;
  text-decoration: none;
  transition: color 0.3s ease;
  text-transform: uppercase;
}

.nav-links li a:hover {
  color: #0b0c0e;
}

.dropdown > a {
  font-family: sans-serif;
  font-size: clamp(0.86rem, 1.2vw, 1.18rem);
  font-weight: 800;
  color: #162119;
  text-decoration: none;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
}

.submenu li a {
  font-family: sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #000;
  text-decoration: none;
  padding: 0.4rem 1rem;
  display: block;
}

.submenu li a:hover {
  background-color: #f0f0f0;
}
.nav-links li {
  position: relative;
  display: flex;
  align-items: center;
}
.submenu {
  position: absolute;
  top: 100%; /* justo debajo del enlace */
  left: 0;
  background-color: #fff;
  border: 1px solid rgba(16, 24, 20, 0.12);
  border-radius: 8px;  
  box-shadow: 0 20px 40px rgba(16, 24, 20, 0.14);
  padding: 0;
  margin: 0;
  list-style: none; /* elimina los puntos */
  z-index: 1000;
  min-width: 230px;
}
.nav-links li a,
.dropdown > a,
.submenu li a {
  background-color: transparent;
  color: #162119;
  text-decoration: none;
  padding: 0.7rem clamp(0.8rem, 1.25vw, 1.35rem);
  display: block;
  border-radius: 999px; /* ← esto hace que el fondo sea ovalado */
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-links li a:hover,
.dropdown > a:hover,
.submenu li a:hover,
.nav-links li a.active,
.dropdown > a.active,
.submenu li a.active {
  background-color: #000;
  color: #fff;
}

.oval-group {
  border: 2px solid rgba(16, 24, 20, 0.82);
  border-radius: 999px;
  padding: 0.35rem clamp(0.4rem, 1vw, 1rem);
  display: flex;
  gap: clamp(0.05rem, 0.4vw, 0.35rem);
  background-color: #fff;
  flex: 1;
  justify-content: space-between;
  max-width: none;
}

.logo-button {
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  gap: 0;
  text-decoration: none;
}

.brand-monogram {
  color: #050505;
  display: inline-block;
  font-size: clamp(3rem, 5.4vw, 5.7rem);
  font-weight: 950;
  letter-spacing: -0.15em;
  line-height: 0.82;
  padding-right: 0.35em;
  position: relative;
}

.brand-monogram::after {
  background: linear-gradient(180deg, #f5d740, #0a6d32);
  border-radius: 999px;
  bottom: 0.03em;
  content: "";
  height: 0.5em;
  left: 0.45em;
  position: absolute;
  transform: rotate(18deg);
  width: 0.08em;
}

.sr-only {
  height: 1px;
  margin: -1px;
  overflow: hidden;
  position: absolute;
  width: 1px;
}
.navbar {
  position: fixed;
  top: 76px;
  left: 0;
  width: 100%;
  z-index: 999;
}

@media (max-width: 1220px) {
  .nav-container {
    gap: 1.25rem;
  }

  .nav-links li a,
  .dropdown > a,
  .submenu li a {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}

@media (max-width: 980px) {
  .navbar {
    top: 76px;
    padding: 0.8rem 1rem;
  }

  .nav-container {
    align-items: flex-start;
    flex-direction: column;
  }

  .oval-group {
    border-radius: 22px;
    flex-wrap: wrap;
    justify-content: flex-start;
    max-width: 100%;
    width: 100%;
  }
}

</style>
