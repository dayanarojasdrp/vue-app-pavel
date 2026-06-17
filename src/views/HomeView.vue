<script>
import ContactSection from '../components/ContactSection.vue'
import EventsGrid from '../components/EventsGrid.vue'
import NewsGrid from '../components/NewsGrid.vue'
import { imageUrl, itemBody, itemTitle, PUBLIC_ENDPOINTS } from '../config/content'
import logoCme from '../assets/logo-cme.jpg'

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
      default: null
    },
    pages: {
      type: Object,
      default: () => ({})
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
      quickLinks: [
        { key: 'quickAbout', view: 'paginas', label: 'Sobre', detail: 'Conoce la iglesia', filters: { seccion: 'sobre' }, filterLabel: 'Sobre' },
        { key: 'quickBeliefs', view: 'creencias', label: 'Creencias', detail: 'Cuatro verdades' },
        { key: 'quickNews', view: 'noticias', label: 'Noticias', detail: 'Actualizaciones' },
        { key: 'quickEvents', view: 'eventos', label: 'Eventos', detail: 'Próximas fechas' },
        { key: 'quickMinistries', view: 'ministerios', label: 'Ministerios', detail: 'Áreas de servicio' },
        { key: 'quickMissions', view: 'misiones', label: 'Misiones', detail: 'Proyectos activos' },
        { key: 'quickDonate', view: 'paginas', label: 'Donar', detail: 'Apoya la misión', filters: { seccion: 'donar' }, filterLabel: 'Donar' },
        { key: 'quickContact', view: 'contacto', label: 'Contacto', detail: 'Escríbenos' },
        { key: 'quickPanel', view: 'panel', label: 'Panel', detail: 'Administración' }
      ],
      logoCme
    }
  },
  methods: {
    imageUrl,
    itemTitle,
    itemBody,
    pageTitle(key, fallback) {
      return this.pages[key] ? itemTitle(this.pages[key], PUBLIC_ENDPOINTS.paginas.fields) : fallback
    },
    pageBody(key, fallback) {
      return this.pages[key] ? itemBody(this.pages[key], PUBLIC_ENDPOINTS.paginas.fields) || fallback : fallback
    },
    pageImage(key) {
      return imageUrl(this.pages[key])
    },
    pageSummary(key, fallback) {
      return this.pages[key]?.resumen || this.pages[key]?.contenido || fallback
    },
    quickLinkLabel(link) {
      return this.pageTitle(link.key, link.label)
    },
    quickLinkDetail(link) {
      return this.pageSummary(link.key, link.detail)
    },
    quickLinkFilterLabel(link) {
      return link.filterLabel ? this.quickLinkLabel(link) : ''
    },
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
      <p class="eyebrow">{{ pageTitle('heroEyebrow', 'Luz en la Montaña') }}</p>
      <h1>{{ pageTitle('hero', 'Centro Misionero Escambray') }}</h1>
      <h2>{{ pages.hero?.resumen || 'Una iglesia comprometida con la Biblia, empoderada por el Espíritu y activa en las misiones.' }}</h2>
      <p>{{ pageBody('hero', 'Desde el Escambray anunciamos esperanza, formamos discípulos y servimos a nuestra comunidad con una fe viva.') }}</p>
      <div class="hero-actions">
        <button @click="$emit('navigate', { view: 'paginas', filters: { seccion: 'sobre' }, filterLabel: 'Sobre' })">
          <span class="button-mark">i</span>
          {{ pageTitle('heroPrimaryButton', 'Más información') }}
        </button>
        <button class="secondary" @click="$emit('navigate', 'eventos')">
          <span class="button-mark">+</span>
          {{ pageTitle('heroSecondaryButton', 'Próximos eventos') }}
        </button>
      </div>
    </div>
    <div class="hero-brand-panel">
      <div class="mountain-mark">
        <img :src="pageImage('hero') || logoCme" alt="Luz en la Montaña Centro Misionero Escambray" />
      </div>
      <div class="hero-verse">
        <span>{{ pages.hero?.meta_title || 'Mateo 5:14' }}</span>
        <strong>{{ pages.hero?.meta_description || 'Vosotros sois la luz del mundo.' }}</strong>
      </div>
    </div>
  </section>

  <section class="home-search-band">
    <div>
      <p>{{ pageTitle('search', '¿Buscas algo específico?') }}</p>
      <h2>{{ pageBody('search', 'Encuentra noticias, eventos, páginas y ministerios.') }}</h2>
    </div>
    <form class="home-search" @submit.prevent="submitHomeSearch">
      <input v-model="homeSearch" :placeholder="pageTitle('searchPlaceholder', 'Buscar en Centro Misionero Escambray')" />
      <button>
        <span class="button-mark">⌕</span>
        {{ pageTitle('searchButton', 'Buscar') }}
      </button>
    </form>
  </section>

  <section class="quick-links-section" aria-label="Navegación principal">
    <button
      v-for="link in quickLinks"
      :key="`${link.view}-${link.label}`"
      class="quick-link-card"
      @click="$emit('navigate', { view: link.view, filters: link.filters || {}, filterLabel: quickLinkFilterLabel(link) })"
    >
      <span>{{ quickLinkLabel(link) }}</span>
      <small>{{ quickLinkDetail(link) }}</small>
    </button>
  </section>

  <section v-if="aboutPage" class="about-section">
    <div class="section-media media-window">
      <img :src="imageUrl(aboutPage) || logoCme" alt="Centro Misionero Escambray" />
    </div>
    <div class="section-copy">
      <p class="eyebrow"><span class="eyebrow-mark"></span> {{ pageTitle('aboutEyebrow', 'Quiénes somos') }}</p>
      <h2>{{ itemTitle(aboutPage, PUBLIC_ENDPOINTS.paginas.fields) }}</h2>
      <p>{{ itemBody(aboutPage, PUBLIC_ENDPOINTS.paginas.fields) }}</p>
      <button class="secondary" @click="$emit('navigate', 'paginas')">{{ pageTitle('aboutButton', 'Más información') }}</button>
    </div>
  </section>

  <section v-if="featuredNews.length || publicErrors.noticias" class="news-feature-section">
    <div class="section-heading">
      <div>
        <p class="eyebrow"><span class="eyebrow-mark"></span> {{ pageTitle('newsEyebrow', 'Noticias destacadas') }}</p>
        <h2>{{ pageTitle('news', 'Historias y actualizaciones de la iglesia') }}</h2>
      </div>
      <button class="secondary" @click="$emit('navigate', 'noticias')">{{ pageTitle('newsButton', 'Ver todas') }}</button>
    </div>
    <NewsGrid :items="featuredNews" :error="publicErrors.noticias" />
  </section>

  <section v-if="upcomingEvents.length || publicErrors.eventos" class="split-section">
    <div class="section-copy dark-copy">
      <p class="eyebrow"><span class="eyebrow-mark"></span> {{ pageTitle('eventsEyebrow', 'Eventos próximos') }}</p>
      <h2>{{ pageTitle('events', 'Reúnete, sirve y crece con la comunidad.') }}</h2>
      <p>{{ pageBody('events', 'Los eventos publicados por el pastor aparecerán aquí automáticamente cuando estén activos y próximos.') }}</p>
      <button class="secondary" @click="$emit('navigate', 'eventos')">{{ pageTitle('eventsButton', 'Todos los eventos') }}</button>
    </div>
    <EventsGrid :items="upcomingEvents" :date-fallback="pageTitle('eventDateFallback', 'Próximo')" />
  </section>

  <section v-if="ministries.length || publicErrors.ministerios" class="ministry-section">
    <div class="section-heading centered">
      <div>
        <p class="eyebrow"><span class="eyebrow-mark"></span> {{ pageTitle('ministriesEyebrow', 'Descubre los ministerios') }}</p>
        <h2>{{ pageTitle('ministries', 'Equipando familias, jóvenes, niños y líderes') }}</h2>
      </div>
    </div>
    <div class="tile-grid">
      <article v-for="item in ministries" :key="item.id || item.slug" class="tile-card">
        <div class="tile-icon">CME</div>
        <span v-if="item.categoria" class="tag">{{ item.categoria }}</span>
        <h3>{{ titleFor(item, 'ministerios') }}</h3>
        <p>{{ bodyFor(item, 'ministerios') }}</p>
      </article>
    </div>
  </section>

  <section v-if="missions.length || publicErrors.misiones" class="mission-resource-section single-column">
    <div class="section-copy">
      <p class="eyebrow"><span class="eyebrow-mark"></span> {{ pageTitle('missionsEyebrow', 'Misiones') }}</p>
      <h2>{{ pageTitle('missions', 'Una iglesia enviada') }}</h2>
      <div class="mini-list">
        <article v-for="item in missions" :key="item.id || item.slug">
          <h3>{{ titleFor(item, 'misiones') }}</h3>
          <p>{{ bodyFor(item, 'misiones') }}</p>
        </article>
      </div>
    </div>
  </section>

  <ContactSection
    :model-value="contactForm"
    :loading="contactLoading"
    :message="contactMessage"
    :error="contactError"
    :content-page="pages.contact"
    :ui-pages="{
      eyebrow: pages.contactEyebrow,
      name: pages.contactName,
      email: pages.contactEmail,
      phone: pages.contactPhone,
      subject: pages.contactSubject,
      message: pages.contactMessage,
      button: pages.contactButton,
      loadingButton: pages.contactLoadingButton
    }"
    compact
    @update:model-value="$emit('update:contactForm', $event)"
    @submit="$emit('submit-contact')"
  />

  <footer class="site-footer">
    <img :src="pageImage('footer') || logoCme" alt="Centro Misionero Escambray" />
    <div>
      <strong>{{ pageTitle('footer', 'Luz en la Montaña') }}</strong>
      <span>{{ pageBody('footer', 'Comprometidos con la Biblia, empoderados por el Espíritu, activos en las misiones.') }}</span>
    </div>
    <button class="secondary" @click="$emit('navigate', 'panel')">{{ pageTitle('footerButton', 'Acceso pastoral') }}</button>
  </footer>
</template>
