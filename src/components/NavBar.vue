<template>
  <header class="navbar">
    <nav class="nav-container">
      <a href="#" class="logo-button" @click.prevent="go('inicio')">
        <img
          class="header-logo-mark"
          src="@/assets/logo-cme-mark-cropped.png"
          alt="Centro Misionero Escambray"
        >
        <span class="sr-only">{{ pageTitle('inicio', 'Centro Misionero Escambray') }}</span>
      </a>
      <ul class="nav-links oval-group">
        <li>
  <a
    href="#"
    :class="{ active: activeItem === 'inicio' }"
    @click.prevent="go('inicio')"
  >
    {{ pageTitle('inicio', 'INICIO') }}
  </a>
</li>
        <li>
  <a
    href="#"
    :class="{ active: activeItem === 'sobre' }"
    @click.prevent="go('paginas', 'sobre', { filters: { seccion: 'sobre' }, filterLabel: 'Sobre' })"
  >
    {{ pageTitle('sobre', 'SOBRE') }}
  </a>
</li>
     <li class="dropdown">
  <a
    href="#"
    :class="{ active: activeItem === 'creencias' }"
    @click.prevent="toggleDropdown('creencias'); setActiveItem('creencias')"
  >
    {{ pageTitle('creencias', 'CREENCIAS') }}<span class="arrow" aria-hidden="true"></span>
  </a>
 <ul v-if="activeDropdown === 'creencias'" class="submenu">
  <li><a href="#" @click.prevent="go('creencias', 'creencias')">{{ pageTitle('creenciasCardinales', 'Nuestras cuatro verdades cardinales') }}</a></li>
  <li><a href="#" @click.prevent="go('paginas', 'creencias', { filters: { seccion: 'creencias' }, filterLabel: pageTitle('creenciasFundamentales', 'Declaración de verdades fundamentales') })">{{ pageTitle('creenciasFundamentales', 'Declaración de verdades fundamentales') }}</a></li>
  <li><a href="#" @click.prevent="go('paginas', 'creencias', { filters: { seccion: 'creencias' }, filterLabel: pageTitle('creenciasNormas', 'Normas doctrinales y declaraciones') })">{{ pageTitle('creenciasNormas', 'Normas doctrinales y declaraciones') }}</a></li>
</ul>

</li>
       <li class="dropdown">
  <a
    href="#"
   :class="{ active: activeItem === 'ministerios' }"
    @click.prevent="toggleDropdown('ministerios'); setActiveItem('ministerios')"
  >
    {{ pageTitle('ministerios', 'MINISTERIOS') }}<span class="arrow" aria-hidden="true"></span>
  </a>
<ul v-if="activeDropdown === 'ministerios'" class="submenu">
  <li><a href="#" @click.prevent="go('ministerios', 'ministerios')">{{ pageTitle('ministeriosTodos', 'Todos los ministerios') }}</a></li>
  <li><a href="#" @click.prevent="go('ministerios', 'ministerios', { filters: { categoria: 'Adultos y familias' }, filterLabel: pageTitle('ministeriosAdultos', 'Adultos y familias') })">{{ pageTitle('ministeriosAdultos', 'Adultos y familias') }}</a></li>
  <li><a href="#" @click.prevent="go('ministerios', 'ministerios', { filters: { categoria: 'Jóvenes' }, filterLabel: pageTitle('ministeriosJovenes', 'Jóvenes') })">{{ pageTitle('ministeriosJovenes', 'Jóvenes') }}</a></li>
  <li><a href="#" @click.prevent="go('ministerios', 'ministerios', { filters: { categoria: 'Niños' }, filterLabel: pageTitle('ministeriosNinos', 'Niños') })">{{ pageTitle('ministeriosNinos', 'Niños') }}</a></li>
  <li><a href="#" @click.prevent="go('ministerios', 'ministerios', { filters: { categoria: 'Líderes y ministros' }, filterLabel: pageTitle('ministeriosLideres', 'Líderes y ministros') })">{{ pageTitle('ministeriosLideres', 'Líderes y ministros') }}</a></li>
  <li><a href="#" @click.prevent="go('ministerios', 'ministerios', { filters: { categoria: 'Educación' }, filterLabel: pageTitle('ministeriosEducacion', 'Educación') })">{{ pageTitle('ministeriosEducacion', 'Educación') }}</a></li>
</ul>


</li>
<li>
  <a
    href="#"
    :class="{ active: activeItem === 'misiones' }"
    @click.prevent="go('misiones')"
  >
    {{ pageTitle('misiones', 'MISIONES') }}
  </a>
</li>
        <li>
  <a
     href="#"
    :class="{ active: activeItem === 'donar' }"
    @click.prevent="go('paginas', 'donar', { filters: { seccion: 'donar' }, filterLabel: 'Donar' })"
  >
    {{ pageTitle('donar', 'DONAR') }}
  </a>
</li>
        <li>
  <a
    href="#"
    :class="{ active: activeItem === 'contacto' }"
    @click.prevent="go('contacto')"
  >
    {{ pageTitle('contacto', 'CONTACTO') }}
  </a>
</li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    pages: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['navigate'],
  data() {
    return {
      activeItem: null,
      activeDropdown: null
    }
  },
  methods: {
 pageTitle(key, fallback) {
  return this.pages[key]?.titulo || fallback;
 },
 go(view, parent = null, options = {}) {
  this.setActiveItem(view, parent);
  this.activeDropdown = null;
  this.$emit('navigate', { view, ...options });
 },
 setActiveItem(name, parent = null) {
  // Si la opción tiene un padre (viene de un submenú), marcamos el padre como activo
  this.activeItem = parent || name;

  const desplegables = ['ministerios', 'creencias'];

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
  min-height: 64px;
  padding: 0.25rem clamp(1.25rem, 3vw, 4rem);
}

.nav-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: clamp(3rem, 6vw, 8rem);
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
  font-size: clamp(0.9rem, 1.1vw, 1.15rem);
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
  font-size: clamp(0.9rem, 1.1vw, 1.15rem);
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
  padding: 0.42rem clamp(0.82rem, 1.28vw, 1.28rem);
  display: flex;
  align-items: center;
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
  border: 1.5px solid #222622;
  border-radius: 999px;
  padding: 0.16rem clamp(0.55rem, 0.9vw, 1rem);
  display: flex;
  gap: clamp(0.2rem, 0.8vw, 1rem);
  background-color: #fff;
  flex: 1;
  justify-content: space-between;
  max-width: none;
}

.logo-button {
  align-items: center;
  display: flex;
  flex: 0 0 clamp(112px, 9vw, 142px);
  gap: 0;
  justify-content: center;
  overflow: hidden;
  text-decoration: none;
}

.header-logo-mark {
  display: block;
  height: clamp(60px, 5vw, 76px);
  object-fit: contain;
  object-position: center;
  width: clamp(106px, 8.8vw, 134px);
}

.sr-only {
  height: 1px;
  margin: -1px;
  overflow: hidden;
  position: absolute;
  width: 1px;
}

.arrow {
  border-bottom: 0.2em solid transparent;
  border-left: 0.3em solid currentColor;
  border-top: 0.2em solid transparent;
  display: inline-block;
  height: 0;
  margin-left: 0.42rem;
  transform: rotate(90deg) translateX(1px);
  width: 0;
}
.navbar {
  position: fixed;
  top: 46px;
  left: 0;
  width: 100%;
  z-index: 999;
}

@media (max-width: 1220px) {
  .nav-container {
    gap: 1.4rem;
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
    top: 46px;
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
