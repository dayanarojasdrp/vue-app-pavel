<script>
export default {
  name: 'ContactSection',
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    compact: {
      type: Boolean,
      default: false
    },
    contentPage: {
      type: Object,
      default: null
    },
    uiPages: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:modelValue', 'submit'],
  computed: {
    form: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    },
    heading() {
      if (this.contentPage?.titulo) return this.contentPage.titulo
      return this.compact ? 'Conversemos' : 'Envía un mensaje al equipo pastoral'
    },
    body() {
      return this.contentPage?.resumen || this.contentPage?.contenido || 'Escribe al equipo pastoral y recibe acompañamiento, información o ayuda para integrarte.'
    }
  },
  methods: {
    uiText(key, fallback) {
      return this.uiPages[key]?.titulo || this.uiPages[key]?.resumen || fallback
    },
    updateField(field, value) {
      this.form = { ...this.form, [field]: value }
    }
  }
}
</script>

<template>
  <section :class="compact ? 'contact-footer-section' : 'form-section'">
    <div>
      <p class="eyebrow"><span class="eyebrow-mark"></span> {{ uiText('eyebrow', 'Contacto') }}</p>
      <h2>{{ heading }}</h2>
      <p v-if="compact || contentPage">{{ body }}</p>
    </div>
    <form :class="compact ? 'footer-contact-form' : 'form-grid'" @submit.prevent="$emit('submit')">
      <input :value="form.nombre" required :placeholder="uiText('name', 'Nombre')" @input="updateField('nombre', $event.target.value)" />
      <input :value="form.email" required type="email" :placeholder="uiText('email', 'Email')" @input="updateField('email', $event.target.value)" />
      <input v-if="!compact" :value="form.telefono" :placeholder="uiText('phone', 'Teléfono')" @input="updateField('telefono', $event.target.value)" />
      <input :value="form.asunto" required :placeholder="uiText('subject', 'Asunto')" @input="updateField('asunto', $event.target.value)" />
      <textarea :value="form.mensaje" required :placeholder="uiText('message', 'Mensaje')" @input="updateField('mensaje', $event.target.value)"></textarea>
      <button :disabled="loading">
        <span class="button-mark">→</span>
        {{ loading ? uiText('loadingButton', 'Enviando...') : uiText('button', compact ? 'Enviar' : 'Enviar mensaje') }}
      </button>
      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </section>
</template>
