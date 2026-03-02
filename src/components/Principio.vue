<template>
  <section class="principio">
    <div class="contenido">
    <h2>COMPROMETIDOS CON LA BIBLIA, EMPODERADOS POR EL ESPIRITU, ACTIVOS EN LAS MISIONES</h2><br></br>
    <h1>BIENVENIDOS AL CENTRO MISIONERO ESCAMBRAY</h1>
    <p>
      ¡Únete a nosotros en nuestra misión de ver una iglesia saludable y empoderada por el Espíritu en cada comunidad!
    </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Principio'
}
</script>

<style scoped>
.principio {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px); /* ajusta según altura de TopBar + Navbar */
  padding: 2rem 1rem;
  text-align: center;
  background-color: #fff;
}
.contenido {
  display: flex;
  height: calc(100vh - 80px);
  justify-content: center; 
   flex-direction: column;/* centra horizontalmente */
  align-items: center;     /* centra verticalmente */
  height: 100vh;   
   gap: 1rem;           /* ocupa toda la altura de la pantalla */
}
.contenido h2 {
  font-family: sans-serif;
  font-weight: 400;
  margin-bottom: 1rem;
}

.contenido h1 {
  font-family: sans-serif;
  text-transform: none;     
  font-weight: normal;      
  text-decoration: none; 
  margin-bottom: 1.2rem;
}

.contenido p {
  font-family: sans-serif;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}
</style>
