<script>
import api from '../../services/api'
import { errorMessage } from '../../config/content'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const PUBLIC_ASSET_BASE_URL = (
  import.meta.env.VITE_PUBLIC_ASSET_URL ||
  API_BASE_URL.replace(/\/api\/?$/, '')
).replace(/\/$/, '')

export default {
  name: 'UploadField',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    folder: {
      type: String,
      default: 'general'
    },
    label: {
      type: String,
      default: 'Imagen'
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      loading: false,
      error: '',
      localPreview: ''
    }
  },
  computed: {
    previewUrl() {
      if (this.localPreview) return this.localPreview
      if (!this.modelValue) return ''
      if (this.modelValue.startsWith('http')) return this.modelValue
      if (this.modelValue.startsWith('/storage')) return `${PUBLIC_ASSET_BASE_URL}${this.modelValue}`
      if (this.modelValue.startsWith('storage/')) return `${PUBLIC_ASSET_BASE_URL}/${this.modelValue}`
      if (this.modelValue.startsWith('uploads/')) return `${PUBLIC_ASSET_BASE_URL}/storage/${this.modelValue}`
      return this.modelValue
    }
  },
  methods: {
    async upload(event) {
      const file = event.target.files?.[0]

      if (!file) return

      this.localPreview = URL.createObjectURL(file)
      this.loading = true
      this.error = ''

      const formData = new FormData()
      formData.append('imagen', file)
      formData.append('carpeta', this.folder)

      try {
        const response = await api.post('/uploads/imagenes', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        this.$emit('update:modelValue', response.data.url || response.data.path)
      } catch (error) {
        this.error = errorMessage(error)
      } finally {
        this.loading = false
      }
    },
    updateManual(value) {
      this.localPreview = ''
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<template>
  <div class="upload-field">
    <label>{{ label }}</label>
    <div v-if="previewUrl" class="upload-preview">
      <img :src="previewUrl" :alt="label" />
    </div>
    <div class="upload-row">
      <input :value="modelValue" placeholder="URL de imagen" @input="updateManual($event.target.value)" />
      <input type="file" accept="image/*" @change="upload" />
    </div>
    <p v-if="loading" class="status compact">Subiendo imagen...</p>
    <p v-if="error" class="error compact">{{ error }}</p>
  </div>
</template>
