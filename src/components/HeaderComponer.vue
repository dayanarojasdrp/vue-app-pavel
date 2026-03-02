<template>
  
  <header class="navbar">
    <nav class="nav-container">
      <div class="logo">
        <span class="highlight">DIOS</span>
      </div>
      <ul class="nav-links">
        <li><a href="#">INICIO</a></li>
        <li><a href="#">SOBRE</a></li>
        <li><a href="#">CREENCIAS</a></li>
        <li><a href="#">MINISTERIOS</a></li>
        <li><a href="#">RECURSOS</a></li>
        <li><a href="#">DONAR</a></li>
        <li><a href="#">CONÉCTATE</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponer'
}
</script>

<style scoped>
.navbar {
  background-color: #fff;
  border-bottom: 2px solid #eaeaea;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.highlight {
  color: red;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

.nav-links li a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links li a:hover {
  color: #007BFF;
}
</style>
