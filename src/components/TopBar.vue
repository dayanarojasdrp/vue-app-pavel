<template>
  <div class="top-bar">
    <div class="social-icons">
      <a href="#"><i class="fab fa-facebook-f"></i></a>
      <a href="#"><i class="fab fa-instagram"></i></a>
      <a href="#"><i class="fab fa-youtube"></i></a>
    </div>

    <div class="search-box">
      <input type="text" placeholder="BUSCAR" />
  <button class="search-button">
    <i class="fas fa-search"></i>
  </button>
    </div>

    <div class="extra-links">
      <a href="#">NOTICIAS</a>
      <a href="#">EVENTOS</a>
      <a href="#">TIENDA</a>
      <a href="#">INGLES</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar'
}
</script>

<style scoped>
.top-bar {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.6rem;
  gap: 0.8rem;   
  background-color: #000000;
  border-bottom: 1px solid #ddd;
  font-size: 13px

  }
.social-icons a {
  margin-right: 0.5rem;
  color: #070606;
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
  color: #333;
}

.extra-links a {
  margin-left: 1rem;
  color: #ffffff;
  text-decoration: none;
  font-size: 13px;
}
.top-bar {
  font-family: sans-serif;     /* fuente estándar y legible */
  font-size: 13px;             /* tamaño moderado */
  font-weight: normal;         /* sin negrita innecesaria */
  text-transform: none;        /* evita que se conviertan en mayúsculas */
  color: #333;                 /* color gris oscuro, legible sobre fondo claro */
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
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}
</style>
