<script>
import api from '../../services/api'
import { ADMIN_CONFIG, errorMessage, formatDate, normalizeList } from '../../config/content'
import ContentEditor from './ContentEditor.vue'

export default {
  name: 'PastorPanel',
  components: {
    ContentEditor
  },
  props: {
    user: {
      type: Object,
      default: null
    },
    login: {
      type: Object,
      required: true
    },
    loginLoading: {
      type: Boolean,
      default: false
    },
    loginError: {
      type: String,
      default: ''
    }
  },
  emits: ['login', 'logout', 'update:login', 'content-changed'],
  data() {
    return {
      ADMIN_CONFIG,
      activeKey: 'noticias',
      contactos: [],
      contactsLoading: false,
      contactsError: ''
    }
  },
  computed: {
    canManagePrivate() {
      return ['admin', 'pastor'].includes(this.user?.role)
    },
    canManageContent() {
      return ['admin', 'pastor', 'editor'].includes(this.user?.role)
    },
    readonly() {
      return !this.canManageContent
    },
    activeConfig() {
      return ADMIN_CONFIG[this.activeKey]
    }
  },
  methods: {
    formatDate,
    updateLogin(field, value) {
      this.$emit('update:login', { ...this.login, [field]: value })
    },
    async selectTab(key) {
      this.activeKey = key

      if (key === 'contactos') {
        await this.fetchContacts()
      }
    },
    async fetchContacts() {
      if (!this.canManagePrivate) return

      this.contactsLoading = true
      this.contactsError = ''

      try {
        const response = await api.get('/contactos', { params: { per_page: 25 } })
        this.contactos = normalizeList(response.data)
      } catch (error) {
        this.contactsError = errorMessage(error)
      } finally {
        this.contactsLoading = false
      }
    },
    async markContact(contact, estado = 'leido') {
      try {
        await api.put(`/contactos/${contact.id}`, { estado })
        await this.fetchContacts()
      } catch (error) {
        this.contactsError = errorMessage(error)
      }
    },
    async deleteContact(contact) {
      if (!window.confirm(`¿Eliminar mensaje de ${contact.nombre}?`)) return

      try {
        await api.delete(`/contactos/${contact.id}`)
        await this.fetchContacts()
      } catch (error) {
        this.contactsError = errorMessage(error)
      }
    }
  }
}
</script>

<template>
  <section class="panel-section">
    <div class="section-heading">
      <div>
        <p class="eyebrow"><i class="fa-solid fa-lock"></i> Panel pastoral</p>
        <h2>Publicación y administración de contenido</h2>
      </div>
      <button v-if="user" class="secondary" @click="$emit('logout')">Cerrar sesión</button>
    </div>

    <form v-if="!user" class="login-box" @submit.prevent="$emit('login')">
      <input :value="login.email" required type="email" placeholder="Email" @input="updateLogin('email', $event.target.value)" />
      <input :value="login.password" required type="password" placeholder="Contraseña" @input="updateLogin('password', $event.target.value)" />
      <button :disabled="loginLoading">
        <i class="fa-solid fa-right-to-bracket"></i>
        {{ loginLoading ? 'Entrando...' : 'Entrar' }}
      </button>
      <p v-if="loginError" class="error">{{ loginError }}</p>
    </form>

    <div v-else class="admin-layout">
      <aside class="admin-sidebar">
        <strong>{{ user.name }}</strong>
        <span>{{ user.email }} · {{ user.role }}</span>
        <button
          v-for="(config, key) in ADMIN_CONFIG"
          :key="key"
          :class="{ active: activeKey === key }"
          @click="selectTab(key)"
        >
          {{ config.title }}
        </button>
        <button
          v-if="canManagePrivate"
          :class="{ active: activeKey === 'contactos' }"
          @click="selectTab('contactos')"
        >
          Contactos
        </button>
      </aside>

      <div class="admin-content">
        <p v-if="!canManageContent" class="error">Tu rol de usuario es de lectura. No puedes publicar ni modificar contenido.</p>

        <ContentEditor
          v-if="activeKey !== 'contactos'"
          :key="activeKey"
          :config="activeConfig"
          :readonly="readonly"
          @changed="$emit('content-changed')"
        />

        <div v-else class="contacts-panel">
          <div class="editor-header">
            <div>
              <p class="eyebrow"><i class="fa-solid fa-envelope"></i> Contactos</p>
              <h3>Mensajes recibidos</h3>
            </div>
            <button class="secondary" @click="fetchContacts">Actualizar</button>
          </div>
          <p v-if="contactsLoading" class="status">Cargando contactos...</p>
          <p v-if="contactsError" class="error">{{ contactsError }}</p>
          <table v-if="!contactsLoading">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Asunto</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="contact in contactos" :key="contact.id">
                <td>{{ contact.nombre }}<br /><small>{{ contact.email }}</small></td>
                <td>{{ contact.asunto }}<br /><small>{{ contact.mensaje }}</small></td>
                <td>{{ contact.estado }}</td>
                <td>{{ contact.created_at ? formatDate(contact.created_at) : '' }}</td>
                <td>
                  <div class="row-actions">
                    <button class="secondary" @click="markContact(contact, 'leido')">Leído</button>
                    <button class="secondary" @click="markContact(contact, 'respondido')">Respondido</button>
                    <button @click="deleteContact(contact)">Eliminar</button>
                  </div>
                </td>
              </tr>
              <tr v-if="!contactos.length">
                <td colspan="5">No hay mensajes todavía.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
