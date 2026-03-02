<template>
  <header class="navbar">
    <nav class="nav-container">
     <li>
  <a href="#" class="logo-button">
    <img src="@/assets/logo-iglesia.jpeg" alt="Logo Iglesia" />
  </a>
</li>
      <ul class="nav-links oval-group">
        <li>
  <a
    href="#"
    :class="{ active: activeItem === 'inicio' }"
    @click.prevent="setActiveItem('inicio')"
  >
    INICIO
  </a>
</li>
        <li>
  <a
    href="#"
    :class="{ active: activeItem === 'sobre' }"
    @click.prevent="setActiveItem('sobre')"
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
  <li><a href="#" @click.prevent="setActiveItem('nu', 'creencias')">Nuestras cuatro verdades cardinales</a></li>
  <li><a href="#" @click.prevent="setActiveItem('d', 'creencias')">Declaracion de verdades fundamentales</a></li>
  <li><a href="#" @click.prevent="setActiveItem('n', 'creencias')">Normas doctrinales AD y otras declaraciones</a></li>
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
  <li><a href="#" @click.prevent="setActiveItem('todos', 'ministerios')">Todos los ministerios</a></li>
  <li><a href="#" @click.prevent="setActiveItem('adultos', 'ministerios')">Adultos y familias</a></li>
  <li><a href="#" @click.prevent="setActiveItem('jovenes', 'ministerios')">Jovenes</a></li>
  <li><a href="#" @click.prevent="setActiveItem('ninos', 'ministerios')">Niños</a></li>
  <li><a href="#" @click.prevent="setActiveItem('lideres', 'ministerios')">Lideres y ministros</a></li>
  <li><a href="#" @click.prevent="setActiveItem('educacion', 'ministerios')">Educacion </a></li>
</ul>


</li>
<li>
  <a
    href="#"
    :class="{ active: activeItem === 'misiones' }"
    @click.prevent="setActiveItem('misiones')"
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
  <li><a href="#" @click.prevent="setActiveItem('pami', 'recursos')">Para Ministerios</a></li>
  <li><a href="#" @click.prevent="setActiveItem('paig', 'recursos')">Para Iglesias</a></li>
  <li><a href="#" @click.prevent="setActiveItem('padis', 'recursos')">Para distritos</a></li>
    <li><a href="#" @click.prevent="setActiveItem('desc', 'recursos')">Descargas</a></li>
      <li><a href="#" @click.prevent="setActiveItem('masre', 'recursos')">Mas recursos</a></li>
</ul>

</li>
        <li>
  <a
     href="#"
    :class="{ active: activeItem === 'donar' }"
    @click.prevent="setActiveItem('donar')"
  >
    DONAR
  </a>
</li>
        <li>
  <a
    href="#"
    :class="{ active: activeItem === 'contacto' }"
    @click.prevent="setActiveItem('contacto')"
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
  data() {
    return {
      activeItem: null,
      activeDropdown: null
    }
  },
  methods: {
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
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }
}



</script>


<style scoped>
.navbar {
  background-color: #fff;
  border-bottom: 2px solid #eaeaea;
  padding: 1rem 2rem;
}

.nav-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  font-family: sans-serif;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
}

.nav-links li a {
  font-family: sans-serif;
  font-size: 13px;
  font-weight: normal;
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-links li a:hover {
  color: #0b0c0e;
}

.dropdown > a {
  font-family: sans-serif;
  font-size: 13px;
  font-weight: normal;
  color: #000;
  text-decoration: none;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
}

.submenu li a {
  font-family: sans-serif;
  font-size: 13px;
  font-weight: normal;
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
  border: 1px solid #eaeaea;
  border-radius: 8px;  
  padding: 0;
  margin: 0;
  list-style: none; /* elimina los puntos */
  z-index: 1000;
}
.nav-links li a,
.dropdown > a,
.submenu li a {
  background-color: transparent;
  color: #000;
  text-decoration: none;
  padding: 0.3rem 0.8rem;
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
  border: 1px solid #000;
  border-radius: 999px;
  padding: 0.2rem 0.6rem;
  display: flex;
  gap: 0.8rem;
  background-color: #fff;
}

.logo-button img {
  height: 35px;         /* ajusta según tu diseño */
  width: auto;
  object-fit: cover;         /* recorta si la imagen es más alta */
  object-position: center;   
  cursor: pointer;
  transition: transform 0.2s ease;
}

.logo-button img:hover {
  transform: scale(1.10); /* efecto sutil al pasar el mouse */
}
.navbar {
  position: fixed;
  top: 40px; /* ajusta según la altura del TopBar */
  left: 0;
  width: 100%;
  z-index: 999;
}

</style>
