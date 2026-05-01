<script>
import ContactSection from '../components/ContactSection.vue'
import EventsGrid from '../components/EventsGrid.vue'
import NewsGrid from '../components/NewsGrid.vue'
import { itemBody, itemTitle, PUBLIC_ENDPOINTS } from '../config/content'

export default {
  name: 'HomeView',
  components: {
    ContactSection,
    EventsGrid,
    NewsGrid
  },
  props: {
    aboutPage: {
      type: Object,
      required: true
    },
    featuredNews: {
      type: Array,
      required: true
    },
    upcomingEvents: {
      type: Array,
      required: true
    },
    ministries: {
      type: Array,
      required: true
    },
    missions: {
      type: Array,
      required: true
    },
    resources: {
      type: Array,
      required: true
    },
    publicErrors: {
      type: Object,
      default: () => ({})
    },
    contactForm: {
      type: Object,
      required: true
    },
    contactLoading: {
      type: Boolean,
      default: false
    },
    contactMessage: {
      type: String,
      default: ''
    },
    contactError: {
      type: String,
      default: ''
    }
  },
  emits: ['navigate', 'search', 'update:contactForm', 'submit-contact'],
  data() {
    return {
      PUBLIC_ENDPOINTS,
      homeSearch: '',
      stats: [
        { value: '1', label: 'iglesia' },
        { value: '7', label: 'días de misión' },
        { value: '12', label: 'ministerios activos' },
        { value: '100%', label: 'Cristo al centro' }
      ]
    }
  },
  methods: {
    itemTitle,
    itemBody,
    submitHomeSearch() {
      const term = this.homeSearch.trim()

      if (term) {
        this.$emit('search', term)
      }
    },
    titleFor(item, key) {
      return itemTitle(item, PUBLIC_ENDPOINTS[key].fields)
    },
    bodyFor(item, key) {
      return itemBody(item, PUBLIC_ENDPOINTS[key].fields)
    }
  }
}
</script>

<template>
  <section class="hero-section">
    <div class="hero-copy">
      <p class="eyebrow">Luz en la Montaña</p>
      <h1>Centro Misionero Escambray</h1>
      <h2>Una iglesia comprometida con la Biblia, empoderada por el Espíritu y activa en las misiones.</h2>
      <p>Desde el Escambray anunciamos esperanza, formamos discípulos y servimos a nuestra comunidad con una fe viva.</p>
      <div class="hero-actions">
        <button @click="$emit('navigate', 'paginas')">
          <i class="fa-solid fa-circle-info"></i>
          Más información
        </button>
        <button class="secondary" @click="$emit('navigate', 'eventos')">
          <i class="fa-solid fa-calendar-days"></i>
          Próximos eventos
        </button>
      </div>
    </div>
    <div class="hero-brand-panel">
      <div class="mountain-mark">
        <img src="@/assets/logo-cme.jpg" alt="Luz en la Montaña Centro Misionero Escambray" />
      </div>
      <div class="hero-verse">
        <span>Mateo 5:14</span>
        <strong>Vosotros sois la luz del mundo.</strong>
      </div>
    </div>
  </section>

  <section class="home-search-band">
    <div>
      <p>¿Buscas algo específico?</p>
      <h2>Encuentra noticias, eventos, recursos y ministerios.</h2>
    </div>
    <form class="home-search" @submit.prevent="submitHomeSearch">
      <input v-model="homeSearch" placeholder="Buscar en Pavel Web" />
      <button>
        <i class="fa-solid fa-magnifying-glass"></i>
        Buscar
      </button>
    </form>
  </section>

  <section class="stats-band" aria-label="Indicadores de la iglesia">
    <div v-for="stat in stats" :key="stat.label" class="stat-item">
      <strong>{{ stat.value }}</strong>
      <span>{{ stat.label }}</span>
    </div>
  </section>

  <section class="about-section">
    <div class="section-media media-window">
      <img src="@/assets/logo-cme.jpg" alt="Centro Misionero Escambray" />
    </div>
    <div class="section-copy">
      <p class="eyebrow"><i class="fa-solid fa-church"></i> Quiénes somos</p>
      <h2>{{ itemTitle(aboutPage, PUBLIC_ENDPOINTS.paginas.fields) }}</h2>
      <p>{{ itemBody(aboutPage, PUBLIC_ENDPOINTS.paginas.fields) }}</p>
      <button class="secondary" @click="$emit('navigate', 'paginas')">Más información</button>
    </div>
  </section>

  <section class="news-feature-section">
    <div class="section-heading">
      <div>
        <p class="eyebrow"><i class="fa-solid fa-newspaper"></i> Noticias destacadas</p>
        <h2>Historias y actualizaciones de la iglesia</h2>
      </div>
      <button class="secondary" @click="$emit('navigate', 'noticias')">Ver todas</button>
    </div>
    <NewsGrid :items="featuredNews" :error="publicErrors.noticias" />
  </section>

  <section class="split-section">
    <div class="section-copy dark-copy">
      <p class="eyebrow"><i class="fa-solid fa-calendar-days"></i> Eventos próximos</p>
      <h2>Reúnete, sirve y crece con la comunidad.</h2>
      <p>Los eventos publicados por el pastor aparecerán aquí automáticamente cuando estén activos y próximos.</p>
      <button class="secondary" @click="$emit('navigate', 'eventos')">Todos los eventos</button>
    </div>
    <EventsGrid :items="upcomingEvents" />
  </section>

  <section class="ministry-section">
    <div class="section-heading centered">
      <div>
        <p class="eyebrow"><i class="fa-solid fa-people-group"></i> Descubre los ministerios</p>
        <h2>Equipando familias, jóvenes, niños y líderes</h2>
      </div>
    </div>
    <div class="tile-grid">
      <article v-for="item in ministries" :key="item.id || item.slug" class="tile-card">
        <div class="tile-icon"><i class="fa-solid fa-hands-praying"></i></div>
        <span v-if="item.categoria" class="tag">{{ item.categoria }}</span>
        <h3>{{ titleFor(item, 'ministerios') }}</h3>
        <p>{{ bodyFor(item, 'ministerios') }}</p>
      </article>
    </div>
  </section>

  <section class="mission-resource-section">
    <div class="section-copy">
      <p class="eyebrow"><i class="fa-solid fa-earth-americas"></i> Misiones</p>
      <h2>Una iglesia enviada</h2>
      <div class="mini-list">
        <article v-for="item in missions" :key="item.id || item.slug">
          <h3>{{ titleFor(item, 'misiones') }}</h3>
          <p>{{ bodyFor(item, 'misiones') }}</p>
        </article>
      </div>
    </div>
    <div class="section-copy resource-panel">
      <p class="eyebrow"><i class="fa-solid fa-folder-open"></i> Recursos</p>
      <h2>Crecimiento espiritual y apoyo ministerial</h2>
      <div class="mini-list">
        <article v-for="item in resources" :key="item.id || item.slug">
          <h3>{{ titleFor(item, 'recursos') }}</h3>
          <p>{{ bodyFor(item, 'recursos') }}</p>
        </article>
      </div>
    </div>
  </section>

  <ContactSection
    :model-value="contactForm"
    :loading="contactLoading"
    :message="contactMessage"
    :error="contactError"
    compact
    @update:model-value="$emit('update:contactForm', $event)"
    @submit="$emit('submit-contact')"
  />

  <footer class="site-footer">
    <img src="@/assets/logo-cme.jpg" alt="Centro Misionero Escambray" />
    <div>
      <strong>Luz en la Montaña</strong>
      <span>Comprometidos con la Biblia, empoderados por el Espíritu, activos en las misiones.</span>
    </div>
    <button class="secondary" @click="$emit('navigate', 'panel')">Acceso pastoral</button>
  </footer>
</template>
