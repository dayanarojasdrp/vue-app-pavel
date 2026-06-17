<script>
import ContactSection from './components/ContactSection.vue'
import NavBar from './components/NavBar.vue'
import PastorPanel from './components/panel/PastorPanel.vue'
import PublicSection from './components/PublicSection.vue'
import TopBar from './components/TopBar.vue'
import CoreDoctrinesView from './views/CoreDoctrinesView.vue'
import HomeView from './views/HomeView.vue'
import {
  errorMessage,
  imageUrl,
  itemBody,
  itemDate,
  itemMeta,
  itemTitle,
  normalizeList,
  PUBLIC_ENDPOINTS
} from './config/content'
import api, { getAuthToken, setAuthToken } from './services/api'

export default {
  components: {
    ContactSection,
    CoreDoctrinesView,
    HomeView,
    NavBar,
    PastorPanel,
    PublicSection,
    TopBar
  },
  data() {
    return {
      PUBLIC_ENDPOINTS,
      activeView: 'inicio',
      activePublicKey: 'noticias',
      activePublicFilters: {},
      activePublicFilterLabel: '',
      publicContent: {},
      publicErrors: {},
      loadingPublic: false,
      searchTerm: '',
      searchResults: [],
      searchLoading: false,
      searchError: '',
      user: null,
      login: {
        email: '',
        password: ''
      },
      loginLoading: false,
      loginError: '',
      contactForm: {
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
      },
      contactLoading: false,
      contactMessage: '',
      contactError: ''
    }
  },
  computed: {
    publicConfig() {
      return PUBLIC_ENDPOINTS[this.activePublicKey]
    },
    publicItems() {
      return this.itemsFor(this.activePublicKey)
    },
    pages() {
      return this.itemsFor('paginas')
    },
    aboutPage() {
      return this.pageFor('sobre') || this.pages.find((page) => page.slug === 'sobre-nosotros' || page.slug === 'sobre') || null
    },
    homePages() {
      return {
        hero: this.pageFor('inicio-hero'),
        heroEyebrow: this.pageFor('inicio-hero-etiqueta'),
        heroPrimaryButton: this.pageFor('inicio-hero-boton-principal'),
        heroSecondaryButton: this.pageFor('inicio-hero-boton-secundario'),
        search: this.pageFor('inicio-busqueda'),
        searchPlaceholder: this.pageFor('inicio-busqueda-placeholder'),
        searchButton: this.pageFor('inicio-busqueda-boton'),
        links: this.pageFor('inicio-enlaces'),
        quickAbout: this.pageFor('inicio-enlace-sobre'),
        quickBeliefs: this.pageFor('inicio-enlace-creencias'),
        quickNews: this.pageFor('inicio-enlace-noticias'),
        quickEvents: this.pageFor('inicio-enlace-eventos'),
        quickMinistries: this.pageFor('inicio-enlace-ministerios'),
        quickMissions: this.pageFor('inicio-enlace-misiones'),
        quickDonate: this.pageFor('inicio-enlace-donar'),
        quickContact: this.pageFor('inicio-enlace-contacto'),
        quickPanel: this.pageFor('inicio-enlace-panel'),
        aboutEyebrow: this.pageFor('inicio-sobre-etiqueta'),
        aboutButton: this.pageFor('inicio-sobre-boton'),
        news: this.pageFor('inicio-noticias'),
        newsEyebrow: this.pageFor('inicio-noticias-etiqueta'),
        newsButton: this.pageFor('inicio-noticias-boton'),
        events: this.pageFor('inicio-eventos'),
        eventsEyebrow: this.pageFor('inicio-eventos-etiqueta'),
        eventsButton: this.pageFor('inicio-eventos-boton'),
        eventDateFallback: this.pageFor('evento-fecha-proximo'),
        ministries: this.pageFor('inicio-ministerios'),
        ministriesEyebrow: this.pageFor('inicio-ministerios-etiqueta'),
        missions: this.pageFor('inicio-misiones'),
        missionsEyebrow: this.pageFor('inicio-misiones-etiqueta'),
        contact: this.pageFor('contacto'),
        contactEyebrow: this.pageFor('contacto-etiqueta'),
        contactName: this.pageFor('contacto-nombre'),
        contactEmail: this.pageFor('contacto-email'),
        contactPhone: this.pageFor('contacto-telefono'),
        contactSubject: this.pageFor('contacto-asunto'),
        contactMessage: this.pageFor('contacto-mensaje'),
        contactButton: this.pageFor('contacto-boton'),
        contactLoadingButton: this.pageFor('contacto-boton-cargando'),
        footer: this.pageFor('footer'),
        footerButton: this.pageFor('footer-boton-panel')
      }
    },
    contactPages() {
      return {
        eyebrow: this.pageFor('contacto-etiqueta'),
        name: this.pageFor('contacto-nombre'),
        email: this.pageFor('contacto-email'),
        phone: this.pageFor('contacto-telefono'),
        subject: this.pageFor('contacto-asunto'),
        message: this.pageFor('contacto-mensaje'),
        button: this.pageFor('contacto-boton'),
        loadingButton: this.pageFor('contacto-boton-cargando')
      }
    },
    publicListUiPages() {
      return {
        refresh: this.pageFor('listado-boton-actualizar'),
        empty: this.pageFor('listado-vacio')
      }
    },
    searchPages() {
      return {
        eyebrow: this.pageFor('buscar-etiqueta'),
        loading: this.pageFor('buscar-cargando'),
        empty: this.pageFor('buscar-vacio')
      }
    },
    publicHeaderPage() {
      return this.pageFor(this.activePublicFilters?.seccion) || this.pageFor(this.activePublicKey)
    },
    topBarPages() {
      return {
        search: this.pageFor('buscar'),
        noticias: this.pageFor('top-noticias'),
        eventos: this.pageFor('top-eventos'),
        ministerios: this.pageFor('top-ministerios'),
        panel: this.pageFor('top-panel'),
        facebook: this.pageFor('social-facebook'),
        instagram: this.pageFor('social-instagram'),
        x: this.pageFor('social-x'),
        youtube: this.pageFor('social-youtube'),
        correo: this.pageFor('social-correo')
      }
    },
    navPages() {
      return {
        inicio: this.pageFor('nav-inicio'),
        sobre: this.pageFor('nav-sobre'),
        creencias: this.pageFor('nav-creencias'),
        creenciasCardinales: this.pageFor('nav-creencias-cardinales'),
        creenciasFundamentales: this.pageFor('nav-creencias-fundamentales'),
        creenciasNormas: this.pageFor('nav-creencias-normas'),
        ministerios: this.pageFor('nav-ministerios'),
        ministeriosTodos: this.pageFor('nav-ministerios-todos'),
        ministeriosAdultos: this.pageFor('nav-ministerios-adultos'),
        ministeriosJovenes: this.pageFor('nav-ministerios-jovenes'),
        ministeriosNinos: this.pageFor('nav-ministerios-ninos'),
        ministeriosLideres: this.pageFor('nav-ministerios-lideres'),
        ministeriosEducacion: this.pageFor('nav-ministerios-educacion'),
        misiones: this.pageFor('nav-misiones'),
        donar: this.pageFor('nav-donar'),
        contacto: this.pageFor('nav-contacto')
      }
    },
    featuredNews() {
      return this.itemsFor('noticias').slice(0, 6)
    },
    upcomingEvents() {
      return this.itemsFor('eventos').slice(0, 3)
    },
    ministries() {
      return this.itemsFor('ministerios').slice(0, 4)
    },
    missions() {
      return this.itemsFor('misiones').slice(0, 3)
    },
    resources() {
      return this.itemsFor('recursos').slice(0, 3)
    }
  },
  async mounted() {
    await this.fetchHomeContent()

    if (getAuthToken()) {
      await this.loadUser()
    }
  },
  methods: {
    imageUrl,
    itemTitle,
    itemBody,
    itemMeta,
    itemDate,
    pageFor(section) {
      if (!section) return null
      return this.pages.find((page) => page.seccion === section || page.slug === section) || null
    },
    pageTitle(page, fallback) {
      return page?.titulo || fallback
    },
    pageBody(page, fallback) {
      return page?.resumen || page?.contenido || fallback
    },
    async fetchHomeContent() {
      this.loadingPublic = true
      await Promise.all(Object.keys(PUBLIC_ENDPOINTS).map((key) => this.fetchPublic(key, true)))
      this.loadingPublic = false
    },
    async navigate(target) {
      const view = typeof target === 'string' ? target : target.view
      const filters = typeof target === 'string' ? {} : target.filters || {}
      const filterLabel = typeof target === 'string' ? '' : target.filterLabel || ''

      if (view === 'inicio') {
        this.activeView = 'inicio'
        this.activePublicFilters = {}
        this.activePublicFilterLabel = ''
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      if (PUBLIC_ENDPOINTS[view]) {
        this.activeView = view
        this.activePublicKey = view
        this.activePublicFilters = filters
        this.activePublicFilterLabel = filterLabel
        await this.fetchPublic(view, true, filters)
        return
      }

      this.activeView = view
      this.activePublicFilters = {}
      this.activePublicFilterLabel = ''
    },
    async fetchPublic(key, force = false, filters = {}) {
      const config = PUBLIC_ENDPOINTS[key]
      const hasFilters = Object.keys(filters || {}).length > 0

      if (!config) return
      if (!force && !hasFilters && this.publicContent[key]?.length) return

      this.publicErrors[key] = ''

      try {
        const response = await api.get(config.endpoint, {
          params: {
            per_page: key === 'paginas' ? 100 : key === 'ministerios' ? 50 : key === 'noticias' ? 9 : 6,
            ...(config.params || {}),
            ...(filters || {})
          }
        })
        this.publicContent[key] = normalizeList(response.data)
      } catch (error) {
        this.publicErrors[key] = errorMessage(error)
        this.publicContent[key] = []
      }
    },
    async refreshPublicAfterChange() {
      await this.fetchHomeContent()

      if (PUBLIC_ENDPOINTS[this.activeView]) {
        await this.fetchPublic(this.activeView, true, this.activePublicFilters)
      }
    },
    async runSearch(term) {
      this.searchTerm = term
      this.activeView = 'buscar'
      this.searchLoading = true
      this.searchError = ''

      try {
        const response = await api.get('/buscar', { params: { q: term, limit: 20 } })
        this.searchResults = this.normalizeSearch(response.data)
      } catch (error) {
        this.searchError = errorMessage(error)
      } finally {
        this.searchLoading = false
      }
    },
    normalizeSearch(payload) {
      if (Array.isArray(payload)) return payload
      if (Array.isArray(payload?.data)) return payload.data

      const groups = payload?.results || payload || {}

      return Object.entries(groups).flatMap(([type, value]) => {
        const items = Array.isArray(value?.data) ? value.data : value
        return Array.isArray(items)
          ? items.map((item) => ({
              ...item,
              titulo: item.titulo || item.nombre || item.title,
              resumen: item.resumen || item.descripcion || item.informacion || item.summary,
              categoria: item.categoria || item.category || item.section || item.type || type,
              imagen: item.imagen || item.image,
              tipo_resultado: item.tipo_resultado || item.type || type
            }))
          : []
      })
    },
    async loginUser() {
      this.loginLoading = true
      this.loginError = ''

      try {
        const response = await api.post('/login', this.login)
        setAuthToken(response.data.token)
        this.user = response.data.user
        this.login = { ...this.login, password: '' }
      } catch (error) {
        this.loginError = errorMessage(error)
      } finally {
        this.loginLoading = false
      }
    },
    async loadUser() {
      try {
        const response = await api.get('/user')
        this.user = response.data
      } catch {
        setAuthToken(null)
        this.user = null
      }
    },
    async logoutUser() {
      try {
        await api.post('/logout')
      } finally {
        setAuthToken(null)
        this.user = null
      }
    },
    async submitContact() {
      this.contactLoading = true
      this.contactMessage = ''
      this.contactError = ''

      try {
        const response = await api.post('/contactos', this.contactForm)
        this.contactMessage = response.data?.mensaje || 'Mensaje enviado correctamente.'
        this.contactForm = { nombre: '', email: '', telefono: '', asunto: '', mensaje: '' }
      } catch (error) {
        this.contactError = errorMessage(error)
      } finally {
        this.contactLoading = false
      }
    },
    itemsFor(key) {
      return this.publicContent[key] || []
    }
  }
}
</script>

<template>
  <div class="site-shell">
    <TopBar :pages="topBarPages" @navigate="navigate" @search="runSearch" />
    <NavBar :pages="navPages" @navigate="navigate" />

    <main class="main-content">
      <HomeView
        v-if="activeView === 'inicio'"
        :about-page="aboutPage"
        :pages="homePages"
        :featured-news="featuredNews"
        :upcoming-events="upcomingEvents"
        :ministries="ministries"
        :missions="missions"
        :public-errors="publicErrors"
        :contact-form="contactForm"
        :contact-loading="contactLoading"
        :contact-message="contactMessage"
        :contact-error="contactError"
        @navigate="navigate"
        @search="runSearch"
        @update:contact-form="contactForm = $event"
        @submit-contact="submitContact"
      />

      <PublicSection
        v-else-if="PUBLIC_ENDPOINTS[activeView]"
        :config="publicConfig"
        :items="publicItems"
        :error="publicErrors[activePublicKey]"
        :filter-label="activePublicFilterLabel"
        :header-page="publicHeaderPage"
        :ui-pages="publicListUiPages"
        @refresh="fetchPublic(activePublicKey, true, activePublicFilters)"
      />

      <CoreDoctrinesView v-else-if="activeView === 'creencias'" :pages="pages" />

      <section v-else-if="activeView === 'buscar'" class="content-section">
        <div class="section-heading">
          <div>
            <p class="eyebrow"><span class="eyebrow-mark"></span> {{ pageTitle(searchPages.eyebrow, 'Búsqueda global') }}</p>
            <h2>Resultados para “{{ searchTerm }}”</h2>
          </div>
        </div>
        <p v-if="searchLoading" class="status">{{ pageTitle(searchPages.loading, 'Buscando...') }}</p>
        <p v-else-if="searchError" class="error">{{ searchError }}</p>
        <p v-else-if="!searchResults.length" class="status">{{ pageBody(searchPages.empty, 'No hay resultados publicados para esa búsqueda.') }}</p>
        <div v-else class="content-grid">
          <article v-for="item in searchResults" :key="`${item.tipo_resultado || 'resultado'}-${item.id}`" class="content-card">
            <span class="tag">{{ item.tipo_resultado || item.categoria || 'resultado' }}</span>
            <h3>{{ itemTitle(item, { title: 'titulo', body: 'resumen', tag: 'categoria' }) }}</h3>
            <p>{{ itemBody(item, { title: 'titulo', body: 'resumen', tag: 'categoria' }) }}</p>
          </article>
        </div>
      </section>

      <ContactSection
        v-else-if="activeView === 'contacto'"
        v-model="contactForm"
        :content-page="pageFor('contacto')"
        :ui-pages="contactPages"
        :loading="contactLoading"
        :message="contactMessage"
        :error="contactError"
        @submit="submitContact"
      />

      <PastorPanel
        v-else-if="activeView === 'panel'"
        :user="user"
        :login="login"
        :login-loading="loginLoading"
        :login-error="loginError"
        @update:login="login = $event"
        @login="loginUser"
        @logout="logoutUser"
        @content-changed="refreshPublicAfterChange"
      />
    </main>
  </div>
</template>

<style>
.site-shell {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(244, 211, 72, 0.16), transparent 32rem),
    linear-gradient(180deg, #fbfaf6 0%, #f2efe8 46%, #ffffff 100%);
  color: #162119;
}

.main-content {
  margin-top: 112px;
}

.hero-section {
  align-items: center;
  background:
    linear-gradient(135deg, rgba(9, 36, 22, 0.97), rgba(14, 58, 33, 0.86)),
    radial-gradient(circle at 82% 18%, rgba(248, 211, 55, 0.38), transparent 18rem);
  color: #fff;
  display: grid;
  gap: 2rem;
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.8fr);
  min-height: calc(100vh - 120px);
  padding: clamp(3rem, 6vw, 5.5rem) clamp(1rem, 6vw, 6rem);
  position: relative;
  overflow: hidden;
}

.hero-section::after {
  background:
    linear-gradient(135deg, transparent 52%, rgba(255, 255, 255, 0.08) 52%),
    linear-gradient(45deg, transparent 54%, rgba(255, 255, 255, 0.06) 54%);
  bottom: -4rem;
  content: "";
  height: 20rem;
  left: 0;
  position: absolute;
  right: 0;
  transform: skewY(-4deg);
}

.hero-copy {
  max-width: 840px;
  position: relative;
  z-index: 1;
}

.hero-copy h1,
.hero-copy h2,
.section-heading h2,
.section-copy h2 {
  line-height: 1.05;
  margin: 0;
}

.hero-copy h1 {
  font-size: clamp(3rem, 7vw, 7.8rem);
  font-weight: 950;
  letter-spacing: -0.03em;
  line-height: 0.95;
  max-width: 980px;
  text-transform: uppercase;
}

.hero-copy h2 {
  color: #f6e86f;
  font-size: clamp(1.2rem, 2vw, 1.85rem);
  font-weight: 850;
  margin-top: 1rem;
  max-width: 780px;
}

.hero-copy p,
.section-copy p {
  font-size: 1.08rem;
  line-height: 1.7;
  max-width: 660px;
}

.hero-copy p:not(.eyebrow) {
  color: rgba(255, 255, 255, 0.86);
  font-size: 1.18rem;
}

.hero-brand-panel {
  align-self: center;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.46);
  border-radius: 8px;
  box-shadow: 0 34px 90px rgba(0, 0, 0, 0.34);
  color: #162119;
  display: grid;
  gap: 1rem;
  padding: clamp(1rem, 3vw, 2rem);
  position: relative;
  z-index: 1;
}

.mountain-mark {
  background: #fff;
  border-radius: 8px;
  display: grid;
  min-height: 310px;
  overflow: hidden;
  place-items: center;
}

.mountain-mark img {
  display: block;
  max-height: 100%;
  object-fit: contain;
  width: 100%;
}

.hero-verse {
  align-items: center;
  background: #101812;
  border-radius: 8px;
  color: #fff;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  padding: 1rem;
}

.hero-verse span {
  color: #f3d23f;
  font-weight: 900;
}

.hero-verse strong {
  font-weight: 850;
  text-align: right;
}

.eyebrow {
  align-items: center;
  display: flex;
  gap: 0.45rem;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0;
  margin: 0 0 0.8rem;
  text-transform: uppercase;
}

.eyebrow-mark {
  background: linear-gradient(180deg, #f5d740, #0a6d32);
  border-radius: 999px;
  display: inline-block;
  height: 1.05em;
  transform: rotate(18deg);
  width: 0.28em;
}

.button-mark {
  align-items: center;
  background: rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  display: inline-flex;
  font-weight: 900;
  height: 1.35rem;
  justify-content: center;
  line-height: 1;
  width: 1.35rem;
}

button.secondary .button-mark {
  background: rgba(16, 24, 18, 0.08);
}

.hero-section .eyebrow {
  color: #f3d23f;
  font-size: 0.9rem;
}

.hero-actions,
.upload-controls,
.row-actions,
.editor-actions,
.upload-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

button {
  align-items: center;
  background: #101812;
  border: 1px solid #101812;
  border-radius: 999px;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-weight: 800;
  gap: 0.45rem;
  min-height: 42px;
  padding: 0.62rem 1.05rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

button.secondary {
  background: #fff;
  color: #101812;
}

button:hover:not(:disabled) {
  box-shadow: 0 14px 28px rgba(16, 24, 18, 0.16);
  transform: translateY(-1px);
}

button:disabled {
  cursor: progress;
  opacity: 0.65;
}

.home-search-band,
.quick-links-section,
.stats-band,
.about-section,
.news-feature-section,
.split-section,
.ministry-section,
.mission-resource-section,
.contact-footer-section,
.site-footer,
.content-section,
.form-section,
.panel-section {
  margin: 0 auto;
  max-width: 1180px;
  padding: 3.5rem 1rem;
}

.home-search-band {
  align-items: center;
  background: #fff;
  border: 1px solid rgba(16, 24, 18, 0.1);
  border-radius: 8px;
  box-shadow: 0 18px 60px rgba(24, 31, 27, 0.08);
  display: grid;
  gap: 1.5rem;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 520px);
  margin-top: -2.6rem;
  position: relative;
  z-index: 2;
}

.home-search-band p {
  font-weight: 800;
  margin: 0 0 0.35rem;
}

.home-search-band h2 {
  font-size: clamp(1.4rem, 3vw, 2.4rem);
  line-height: 1.1;
  margin: 0;
}

.home-search {
  background: #101812;
  border-radius: 999px;
  display: flex;
  gap: 0.5rem;
  padding: 0.45rem;
}

.home-search input {
  background: transparent;
  border: 0;
  color: #fff;
}

.home-search input::placeholder {
  color: rgba(255, 255, 255, 0.74);
}

.home-search button {
  background: #fff;
  border-color: #fff;
  color: #111;
}

.quick-links-section {
  display: grid;
  gap: 0.85rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding-top: 1.2rem;
}

.quick-link-card {
  align-items: flex-start;
  background: #fff;
  border: 1px solid rgba(16, 24, 18, 0.12);
  border-radius: 8px;
  color: #101812;
  display: grid;
  gap: 0.3rem;
  justify-items: start;
  min-height: 96px;
  padding: 1rem;
  text-align: left;
}

.quick-link-card span {
  font-size: 1.05rem;
  font-weight: 950;
  text-transform: uppercase;
}

.quick-link-card small {
  color: #65635e;
  font-weight: 750;
}

.quick-link-card:hover {
  background: #101812;
  color: #fff;
}

.quick-link-card:hover small {
  color: rgba(255, 255, 255, 0.74);
}

.stats-band {
  background:
    linear-gradient(135deg, #101812, #123c25),
    radial-gradient(circle at top right, rgba(243, 210, 63, 0.32), transparent 20rem);
  color: #fff;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  max-width: none;
  padding-left: clamp(1rem, 7vw, 6rem);
  padding-right: clamp(1rem, 7vw, 6rem);
}

.stat-item {
  border-left: 1px solid rgba(255, 255, 255, 0.25);
  padding-left: 1rem;
}

.stat-item strong {
  display: block;
  font-size: clamp(2rem, 5vw, 4.5rem);
  line-height: 1;
}

.stat-item span {
  color: #d8d8d8;
  display: block;
  margin-top: 0.5rem;
  text-transform: uppercase;
}

.about-section,
.split-section,
.mission-resource-section,
.contact-footer-section {
  align-items: center;
  display: grid;
  gap: 2rem;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}

.media-window {
  background: #fff;
  border: 1px solid #e4ded5;
  border-radius: 8px;
  display: grid;
  min-height: 430px;
  overflow: hidden;
  place-items: center;
  padding: 2rem;
}

.media-window img {
  display: block;
  height: auto;
  max-height: 420px;
  object-fit: contain;
  width: 100%;
}

.section-copy h2,
.section-heading h2 {
  font-size: clamp(2rem, 4vw, 4.2rem);
  font-weight: 950;
  letter-spacing: -0.025em;
}

.section-heading,
.editor-header {
  align-items: flex-end;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.section-heading.centered {
  justify-content: center;
  text-align: center;
}

.section-heading.centered .eyebrow {
  justify-content: center;
}

.featured-layout {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1.15fr 1fr 1fr;
}

.feature-card {
  background: #fff;
  border: 1px solid rgba(16, 24, 18, 0.1);
  border-radius: 8px;
  box-shadow: 0 18px 50px rgba(24, 31, 27, 0.07);
  display: grid;
  overflow: hidden;
}

.feature-card.large {
  grid-row: span 2;
}

.feature-card img,
.image-fallback {
  aspect-ratio: 16 / 10;
  background:
    radial-gradient(circle at 70% 20%, rgba(243, 210, 63, 0.3), transparent 13rem),
    linear-gradient(135deg, #0f2f1f, #123c25);
  color: #fff;
  display: grid;
  font-size: 1.2rem;
  font-weight: 950;
  letter-spacing: 0.08em;
  object-fit: cover;
  place-items: center;
  text-transform: uppercase;
  width: 100%;
}

.feature-card.large img,
.feature-card.large .image-fallback {
  aspect-ratio: 1 / 1;
}

.feature-body {
  padding: 1rem;
}

.feature-body h3,
.content-card h3,
.tile-card h3,
.stack-item h3,
.mini-list h3 {
  font-size: 1.24rem;
  font-weight: 900;
  line-height: 1.22;
  margin: 0.65rem 0;
}

.feature-body p,
.content-card p,
.tile-card p,
.stack-item p,
.mini-list p {
  color: #4d4a45;
  line-height: 1.55;
}

.split-section {
  background:
    linear-gradient(135deg, #101812, #123c25),
    radial-gradient(circle at bottom left, rgba(243, 210, 63, 0.24), transparent 20rem);
  color: #fff;
  max-width: none;
  padding-left: clamp(1rem, 7vw, 6rem);
  padding-right: clamp(1rem, 7vw, 6rem);
}

.dark-copy p {
  color: #e1e1e1;
}

.stack-list,
.mini-list,
.editor-list {
  display: grid;
  gap: 1rem;
}

.stack-item {
  background: #fff;
  border-radius: 8px;
  color: #111;
  padding: 1rem;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.18);
}

.date-pill,
.tag {
  background: #eef7ef;
  color: #184d2c;
  border-radius: 999px;
  display: inline-flex;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.3rem 0.65rem;
}

.active-filter-pill {
  background: #101812;
  border-radius: 999px;
  color: #fff;
  display: inline-flex;
  font-size: 0.82rem;
  font-weight: 850;
  margin-top: 0.8rem;
  padding: 0.45rem 0.75rem;
}

.tile-grid,
.content-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.tile-card,
.content-card,
.login-box,
.upload-box,
.content-editor,
.contacts-panel {
  background: #fff;
  border: 1px solid rgba(16, 24, 18, 0.1);
  border-radius: 8px;
  box-shadow: 0 18px 50px rgba(24, 31, 27, 0.06);
  padding: 1rem;
}

.tile-card {
  min-height: 260px;
}

.tile-icon {
  align-items: center;
  background: linear-gradient(135deg, #133f26, #101812);
  border-radius: 999px;
  color: #fff;
  display: inline-flex;
  font-size: 0.78rem;
  font-weight: 950;
  height: 46px;
  justify-content: center;
  margin-bottom: 1rem;
  width: 46px;
}

.mission-resource-section {
  align-items: stretch;
}

.mission-resource-section.single-column {
  grid-template-columns: 1fr;
}

.mission-resource-section.single-column .section-copy {
  max-width: 920px;
}

.resource-panel {
  background: #fff;
  border: 1px solid rgba(16, 24, 18, 0.1);
  border-radius: 8px;
  padding: 2rem;
}

.mini-list {
  margin-top: 1.25rem;
}

.mini-list article {
  border-top: 1px solid #ddd4ca;
  padding-top: 1rem;
}

.contact-footer-section {
  background:
    linear-gradient(135deg, #101812, #0f2f1f),
    radial-gradient(circle at 75% 25%, rgba(243, 210, 63, 0.22), transparent 18rem);
  color: #fff;
  max-width: none;
  padding-left: clamp(1rem, 7vw, 6rem);
  padding-right: clamp(1rem, 7vw, 6rem);
}

.contact-footer-section p {
  color: #e5e5e5;
  line-height: 1.7;
}

.footer-contact-form,
.form-grid,
.login-box,
.editor-form {
  display: grid;
  gap: 0.8rem;
}

.editor-form {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.footer-contact-form {
  background: #fff;
  border-radius: 8px;
  color: #111;
  padding: 1rem;
}

.form-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

label,
.upload-field {
  display: grid;
  font-weight: 700;
  gap: 0.4rem;
}

input,
textarea,
select {
  border: 1px solid #d8d1c7;
  border-radius: 8px;
  font: inherit;
  min-height: 44px;
  padding: 0.75rem;
  width: 100%;
}

textarea {
  grid-column: 1 / -1;
  min-height: 150px;
  resize: vertical;
}

.upload-field,
.editor-actions {
  grid-column: 1 / -1;
}

.check-field {
  align-items: center;
  display: flex;
  flex-direction: row;
}

.check-field input {
  min-height: auto;
  width: auto;
}

.upload-preview {
  border: 1px solid #e2ded7;
  border-radius: 8px;
  max-width: 320px;
  overflow: hidden;
}

.upload-preview img {
  aspect-ratio: 16 / 9;
  display: block;
  object-fit: cover;
  width: 100%;
}

.footer-contact-form textarea {
  grid-column: auto;
}

.form-grid button {
  justify-self: start;
}

.site-footer {
  align-items: center;
  background: #fff;
  border-top: 1px solid #e2ded7;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  max-width: none;
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
}

.site-footer img {
  border-radius: 8px;
  height: 68px;
  object-fit: contain;
  width: 112px;
}

.site-footer div {
  display: grid;
  flex: 1;
}

.site-footer span {
  color: #5d5851;
}

.content-section,
.form-section,
.panel-section {
  max-width: 1180px;
}

.doctrines-page {
  background: #f7f4ee;
}

.doctrines-hero {
  align-items: flex-end;
  background: #f3f1ed;
  display: grid;
  min-height: 315px;
  padding: clamp(3rem, 8vw, 8rem) clamp(1.25rem, 6vw, 6rem) 2.2rem;
}

.doctrines-hero h1 {
  color: #171a17;
  font-size: clamp(3rem, 7vw, 7rem);
  font-weight: 950;
  letter-spacing: -0.05em;
  line-height: 0.92;
  margin: 0;
  max-width: 1050px;
}

.doctrine-link-grid {
  background: #fff;
  border-bottom: 1px solid rgba(16, 24, 18, 0.1);
  border-top: 1px solid rgba(16, 24, 18, 0.1);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.doctrine-link-grid a {
  align-items: center;
  color: #111;
  display: flex;
  font-size: clamp(1.05rem, 1.8vw, 1.8rem);
  font-weight: 900;
  min-height: 120px;
  padding: 1.25rem clamp(1rem, 3vw, 2.5rem);
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.doctrine-link-grid a + a {
  border-left: 1px solid rgba(16, 24, 18, 0.1);
}

.doctrine-link-grid a:hover {
  background: #101812;
  color: #fff;
}

.jump-panel {
  align-items: center;
  background: #101812;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 1rem clamp(1.25rem, 6vw, 6rem);
}

.jump-panel strong {
  color: #f5d740;
  font-weight: 900;
  margin-right: 0.75rem;
}

.jump-panel a {
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  color: #fff;
  font-weight: 800;
  padding: 0.45rem 0.85rem;
  text-decoration: none;
}

.doctrines-intro {
  align-items: center;
  display: grid;
  gap: clamp(2rem, 5vw, 5rem);
  grid-template-columns: minmax(0, 1fr) minmax(280px, 420px);
  margin: 0 auto;
  max-width: 1180px;
  padding: clamp(3rem, 7vw, 7rem) 1rem;
}

.doctrines-intro h2 {
  color: #111;
  font-size: clamp(2.25rem, 5vw, 5rem);
  font-weight: 950;
  letter-spacing: -0.045em;
  line-height: 0.98;
  margin: 0 0 1rem;
}

.doctrines-intro p {
  color: #4a504b;
  font-size: 1.08rem;
  line-height: 1.75;
  max-width: 720px;
}

.doctrines-logo-card {
  background: #fff;
  border: 1px solid rgba(16, 24, 18, 0.1);
  border-radius: 8px;
  box-shadow: 0 24px 70px rgba(16, 24, 18, 0.08);
  padding: 1.25rem;
}

.doctrines-logo-card img {
  display: block;
  object-fit: contain;
  width: 100%;
}

.doctrine-detail-list {
  display: grid;
  gap: 1rem;
  margin: 0 auto;
  max-width: 1180px;
  padding: 0 1rem clamp(3rem, 7vw, 7rem);
}

.doctrine-detail-card {
  align-items: start;
  background: #fff;
  border: 1px solid rgba(16, 24, 18, 0.1);
  border-radius: 8px;
  display: grid;
  gap: 1rem;
  grid-template-columns: 90px 1fr;
  padding: clamp(1rem, 3vw, 2rem);
}

.doctrine-detail-card span {
  color: #0d3b24;
  font-size: 2.4rem;
  font-weight: 950;
  line-height: 1;
}

.doctrine-detail-card h3 {
  font-size: clamp(1.6rem, 3vw, 3rem);
  font-weight: 950;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 0 0 0.75rem;
}

.doctrine-detail-card p {
  color: #4a504b;
  font-size: 1.05rem;
  line-height: 1.7;
  margin: 0;
}

.content-card {
  min-height: 260px;
}

.content-card img {
  aspect-ratio: 16 / 9;
  border-radius: 6px;
  display: block;
  margin-bottom: 1rem;
  object-fit: cover;
  width: 100%;
}

.image-fallback.small {
  aspect-ratio: 16 / 9;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.success,
.status,
.error {
  border-radius: 8px;
  margin-top: 1rem;
  padding: 0.8rem 1rem;
}

.success {
  background: #e8f5e9;
  color: #1b5e20;
}

.status {
  background: #eef4f8;
  color: #21485c;
}

.status.compact,
.error.compact {
  margin: 0;
}

.error {
  background: #fdeaea;
  color: #8a1c1c;
}

.admin-layout {
  display: grid;
  gap: 1rem;
  grid-template-columns: 250px minmax(0, 1fr);
}

.admin-sidebar {
  align-self: start;
  background: #111;
  border-radius: 8px;
  color: #fff;
  display: grid;
  gap: 0.55rem;
  padding: 1rem;
}

.admin-sidebar span {
  color: #c8c8c8;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.admin-sidebar button {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.2);
  justify-content: flex-start;
}

.admin-sidebar button.active {
  background: #fff;
  color: #111;
}

.admin-content {
  min-width: 0;
}

table {
  background: #fff;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
}

th,
td {
  border-bottom: 1px solid #ece6df;
  padding: 0.8rem;
  text-align: left;
  vertical-align: top;
}

td small {
  color: #5d5851;
  display: inline-block;
  line-height: 1.4;
  max-width: 420px;
}

.upload-box {
  margin-top: 1rem;
}

@media (max-width: 980px) {
  .main-content {
    margin-top: 240px;
  }

  .hero-section {
    grid-template-columns: 1fr;
    min-height: calc(100vh - 240px);
  }

  .hero-brand-panel {
    max-width: 560px;
  }

  .home-search-band,
  .about-section,
  .split-section,
  .mission-resource-section,
  .contact-footer-section,
  .admin-layout,
  .form-grid,
  .editor-form {
    display: grid;
    grid-template-columns: 1fr;
  }

  .stats-band {
    grid-template-columns: repeat(2, 1fr);
  }

  .quick-links-section {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .featured-layout {
    grid-template-columns: 1fr;
  }

  .feature-card.large {
    grid-row: auto;
  }

  .site-footer,
  .editor-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .doctrine-link-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .doctrines-intro {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .main-content {
    margin-top: 296px;
  }

  .stats-band {
    grid-template-columns: 1fr;
  }

  .quick-links-section {
    grid-template-columns: 1fr;
  }

  .home-search {
    border-radius: 8px;
    display: grid;
  }

  .doctrine-link-grid {
    grid-template-columns: 1fr;
  }

  .doctrine-link-grid a {
    min-height: 84px;
  }

  .doctrine-detail-card {
    grid-template-columns: 1fr;
  }
}
</style>
