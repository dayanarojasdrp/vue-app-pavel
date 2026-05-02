<script>
import api from '../../services/api'
import { errorMessage, formatDate, itemDate, itemTitle, normalizeList } from '../../config/content'
import UploadField from './UploadField.vue'

export default {
  name: 'ContentEditor',
  components: {
    UploadField
  },
  props: {
    config: {
      type: Object,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: ['changed'],
  data() {
    return {
      items: [],
      form: {},
      editingId: null,
      loading: false,
      saving: false,
      deletingId: null,
      error: '',
      message: ''
    }
  },
  computed: {
    isEditing() {
      return Boolean(this.editingId)
    },
    titleField() {
      return this.config.fields?.title || 'titulo'
    }
  },
  watch: {
    config: {
      immediate: true,
      handler() {
        this.resetForm()
        this.fetchItems()
      }
    }
  },
  methods: {
    formatDate,
    itemTitle,
    itemDate,
    async fetchItems() {
      this.loading = true
      this.error = ''

      try {
        const response = await api.get(this.config.endpoint, { params: { per_page: 25 } })
        this.items = normalizeList(response.data)
      } catch (error) {
        this.error = errorMessage(error)
      } finally {
        this.loading = false
      }
    },
    resetForm() {
      const form = { ...(this.config.defaults || {}) }

      for (const field of this.config.formFields || []) {
        if (!(field.name in form)) {
          form[field.name] = field.type === 'checkbox' ? false : ''
        }
      }

      this.form = form
      this.editingId = null
      this.message = ''
      this.error = ''
    },
    editItem(item) {
      const nextForm = { ...(this.config.defaults || {}) }

      for (const field of this.config.formFields || []) {
        let value = item[field.name]

        if (field.type === 'datetime-local' && value) {
          value = String(value).slice(0, 16)
        }

        if (field.type === 'checkbox') {
          value = Boolean(value)
        }

        nextForm[field.name] = value ?? (field.type === 'checkbox' ? false : '')
      }

      this.form = nextForm
      this.editingId = item.id
      this.message = ''
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    payload() {
      const payload = {}

      for (const field of this.config.formFields || []) {
        const value = this.form[field.name]

        if (field.type === 'checkbox') {
          payload[field.name] = Boolean(value)
          continue
        }

        if (value === '' || value === null || value === undefined) {
          continue
        }

        if (field.type === 'number') {
          payload[field.name] = Number(value)
          continue
        }

        payload[field.name] = value
      }

      return payload
    },
    async save() {
      if (this.readonly) return

      this.saving = true
      this.error = ''
      this.message = ''

      try {
        if (this.isEditing) {
          await api.patch(`${this.config.endpoint}/${this.editingId}`, this.payload())
          this.message = 'Contenido actualizado.'
        } else {
          await api.post(this.config.endpoint, this.payload())
          this.message = 'Contenido publicado en el panel.'
        }

        await this.fetchItems()
        this.resetForm()
        this.$emit('changed')
      } catch (error) {
        this.error = errorMessage(error)
      } finally {
        this.saving = false
      }
    },
    async remove(item) {
      if (this.readonly) return
      if (!window.confirm(`¿Eliminar "${itemTitle(item, this.config.fields)}"?`)) return

      this.deletingId = item.id
      this.error = ''
      this.message = ''

      try {
        await api.delete(`${this.config.endpoint}/${item.id}`)
        this.message = 'Contenido eliminado.'
        await this.fetchItems()
        this.$emit('changed')
      } catch (error) {
        this.error = errorMessage(error)
      } finally {
        this.deletingId = null
      }
    },
    updateField(name, value) {
      this.form = { ...this.form, [name]: value }
    }
  }
}
</script>

<template>
  <div class="content-editor">
    <div class="editor-header">
      <div>
        <p class="eyebrow"><span class="eyebrow-mark"></span> {{ config.title }}</p>
        <h3>{{ isEditing ? `Editar ${config.singular}` : `Crear ${config.singular}` }}</h3>
      </div>
      <button class="secondary" @click="fetchItems">Actualizar listado</button>
    </div>

    <p v-if="readonly" class="status">Tu rol permite ver contenido, pero no crear, editar ni eliminar.</p>

    <form class="editor-form" @submit.prevent="save">
      <template v-for="field in config.formFields" :key="field.name">
        <label v-if="field.type === 'checkbox'" class="check-field">
          <input
            type="checkbox"
            :checked="Boolean(form[field.name])"
            :disabled="readonly"
            @change="updateField(field.name, $event.target.checked)"
          />
          {{ field.label }}
        </label>

        <UploadField
          v-else-if="field.type === 'image'"
          :model-value="form[field.name]"
          :folder="config.key"
          :label="field.label"
          @update:model-value="updateField(field.name, $event)"
        />

        <label v-else>
          {{ field.label }}
          <select
            v-if="field.type === 'select'"
            :value="form[field.name]"
            :required="field.required"
            :disabled="readonly"
            @change="updateField(field.name, $event.target.value)"
          >
            <option value="">Seleccionar</option>
            <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
          </select>
          <textarea
            v-else-if="field.type === 'textarea'"
            :value="form[field.name]"
            :required="field.required"
            :disabled="readonly"
            @input="updateField(field.name, $event.target.value)"
          ></textarea>
          <input
            v-else
            :type="field.type"
            :value="form[field.name]"
            :required="field.required"
            :disabled="readonly"
            @input="updateField(field.name, $event.target.value)"
          />
        </label>
      </template>

      <div class="editor-actions">
        <button :disabled="readonly || saving">
          <span class="button-mark">✓</span>
          {{ saving ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Publicar' }}
        </button>
        <button type="button" class="secondary" @click="resetForm">Limpiar</button>
      </div>
    </form>

    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div class="editor-list">
      <h3>Listado</h3>
      <p v-if="loading" class="status">Cargando contenido...</p>
      <table v-else>
        <thead>
          <tr>
            <th>Título</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ itemTitle(item, config.fields) }}</td>
            <td>{{ item.estado || (item.activo === false ? 'inactivo' : 'activo') }}</td>
            <td>{{ itemDate(item, config.fields) ? formatDate(itemDate(item, config.fields)) : '' }}</td>
            <td>
              <div class="row-actions">
                <button type="button" class="secondary" @click="editItem(item)">Editar</button>
                <button type="button" :disabled="readonly || deletingId === item.id" @click="remove(item)">
                  {{ deletingId === item.id ? 'Eliminando...' : 'Eliminar' }}
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="!items.length">
            <td colspan="4">No hay contenido todavía.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
