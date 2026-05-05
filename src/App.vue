<script>
import ContactSection from './components/ContactSection.vue'
import NavBar from './components/NavBar.vue'
import PastorPanel from './components/panel/PastorPanel.vue'
import PublicSection from './components/PublicSection.vue'
import TopBar from './components/TopBar.vue'
import HomeView from './views/HomeView.vue'
import {
  errorMessage,
  FALLBACK_CONTENT,
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
    aboutPage() {
      return this.itemsFor('paginas')[0] || FALLBACK_CONTENT.paginas[0]
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
    async fetchHomeContent() {
      this.loadingPublic = true
      await Promise.all(Object.keys(PUBLIC_ENDPOINTS).map((key) => this.fetchPublic(key, true)))
      this.loadingPublic = false
    },
    async navigate(view) {
      if (view === 'inicio') {
        this.activeView = 'inicio'
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      if (PUBLIC_ENDPOINTS[view]) {
        this.activeView = view
        this.activePublicKey = view
        await this.fetchPublic(view)
        return
      }

      this.activeView = view
    },
    async fetchPublic(key, force = false) {
      const config = PUBLIC_ENDPOINTS[key]

      if (!config) return
      if (!force && this.publicContent[key]?.length) return

      this.publicErrors[key] = ''

      try {
        const response = await api.get(config.endpoint, {
          params: {
            per_page: key === 'noticias' ? 9 : 6,
            ...(config.params || {})
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
        await this.fetchPublic(this.activeView, true)
      }
    },
    async runSearch(term) {
      this.searchTerm = term
      this.activeView = 'buscar'
      this.searchLoading = true
      this.searchError = ''

      try {
        const response = await api.get('/buscar', { params: { q: term, per_page: 12 } })
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

      return Object.entries(payload || {}).flatMap(([type, value]) => {
        const items = Array.isArray(value?.data) ? value.data : value
        return Array.isArray(items) ? items.map((item) => ({ ...item, tipo_resultado: type })) : []
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
      const items = this.publicContent[key] || []
      return items.length ? items : FALLBACK_CONTENT[key] || []
    }
  }
}
</script>

<template>
  <div class="site-shell">
    <TopBar @navigate="navigate" @search="runSearch" />
    <NavBar @navigate="navigate" />

    <main class="main-content">
      <HomeView
        v-if="activeView === 'inicio'"
        :about-page="aboutPage"
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
        @refresh="fetchPublic(activePublicKey, true)"
      />

      <section v-else-if="activeView === 'buscar'" class="content-section">
        <div class="section-heading">
          <div>
            <p class="eyebrow"><span class="eyebrow-mark"></span> Búsqueda global</p>
            <h2>Resultados para “{{ searchTerm }}”</h2>
          </div>
        </div>
        <p v-if="searchLoading" class="status">Buscando...</p>
        <p v-else-if="searchError" class="error">{{ searchError }}</p>
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
  margin-top: 120px;
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
}

@media (max-width: 560px) {
  .main-content {
    margin-top: 296px;
  }

  .stats-band {
    grid-template-columns: 1fr;
  }

  .home-search {
    border-radius: 8px;
    display: grid;
  }
}
</style>
