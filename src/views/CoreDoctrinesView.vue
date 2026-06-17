<script>
const doctrines = [
  {
    id: 'salvacion',
    title: 'Salvación',
    text: 'Creemos que Cristo salva, restaura y da vida nueva a todo aquel que responde con fe y arrepentimiento.'
  },
  {
    id: 'bautismo',
    title: 'Bautismo en el Espíritu Santo',
    text: 'Creemos en una vida llena del Espíritu, capacitada para testificar, servir y vivir con poder espiritual.'
  },
  {
    id: 'sanidad',
    title: 'Sanidad Divina',
    text: 'Creemos que Dios sigue obrando con compasión, trayendo sanidad, consuelo y esperanza a su pueblo.'
  },
  {
    id: 'venida',
    title: 'Segunda Venida',
    text: 'Creemos que Cristo volverá y que esa esperanza nos llama a vivir con fidelidad, misión y expectativa.'
  }
]

export default {
  name: 'CoreDoctrinesView',
  props: {
    pages: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      doctrines
    }
  },
  computed: {
    doctrineItems() {
      return this.doctrines.map((doctrine) => {
        const page = this.pageFor(`creencia-${doctrine.id}`)

        return {
          ...doctrine,
          title: page?.titulo || doctrine.title,
          text: page?.resumen || page?.contenido || doctrine.text
        }
      })
    },
    heroPage() {
      return this.pageFor('creencias')
    },
    churchPage() {
      return this.pageFor('iglesia')
    }
  },
  methods: {
    pageFor(section) {
      return this.pages.find((page) => page.seccion === section || page.slug === section) || null
    },
    pageTitle(page, fallback) {
      return page?.titulo || fallback
    },
    pageBody(page, fallback) {
      return page?.resumen || page?.contenido || fallback
    }
  }
}
</script>

<template>
  <section class="doctrines-page">
    <div class="doctrines-hero">
      <p class="eyebrow"><span class="eyebrow-mark"></span> {{ pageTitle(heroPage, 'Creencias') }}</p>
      <h1>{{ pageBody(heroPage, 'Nuestras Cuatro Verdades Cardinales') }}</h1>
    </div>

    <nav class="doctrine-link-grid" aria-label="Cuatro verdades cardinales">
      <a v-for="doctrine in doctrineItems" :key="doctrine.id" :href="`#${doctrine.id}`">
        {{ doctrine.title }}
      </a>
    </nav>

    <div class="jump-panel">
      <strong>Ir a...</strong>
      <a v-for="doctrine in doctrineItems" :key="`jump-${doctrine.id}`" :href="`#${doctrine.id}`">
        {{ doctrine.title }}
      </a>
    </div>

    <section class="doctrines-intro">
      <div>
        <p class="eyebrow"><span class="eyebrow-mark"></span> {{ pageTitle(churchPage, 'Centro Misionero Escambray') }}</p>
        <h2>{{ churchPage?.resumen || 'Una fe bíblica, viva y misionera' }}</h2>
        <p>
          {{ pageBody(churchPage, 'Estas verdades expresan el corazón de nuestra enseñanza: Cristo salva, el Espíritu capacita, Dios sana y la iglesia vive esperando el regreso del Señor.') }}
        </p>
      </div>
      <div class="doctrines-logo-card">
        <img src="@/assets/logo-cme.jpg" alt="Luz en la Montaña Centro Misionero Escambray" />
      </div>
    </section>

    <section class="doctrine-detail-list">
      <article v-for="(doctrine, index) in doctrineItems" :id="doctrine.id" :key="doctrine.id" class="doctrine-detail-card">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <div>
          <h3>{{ doctrine.title }}</h3>
          <p>{{ doctrine.text }}</p>
        </div>
      </article>
    </section>
  </section>
</template>
