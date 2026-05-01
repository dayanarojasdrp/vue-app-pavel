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
    }
  },
  methods: {
    updateField(field, value) {
      this.form = { ...this.form, [field]: value }
    }
  }
}
</script>

<template>
  <section :class="compact ? 'contact-footer-section' : 'form-section'">
    <div>
      <p class="eyebrow"><i class="fa-solid fa-envelope"></i> Contacto</p>
      <h2>{{ compact ? 'Conversemos' : 'Envía un mensaje al equipo pastoral' }}</h2>
      <p v-if="compact">Escribe al equipo pastoral y recibe acompañamiento, información o ayuda para integrarte.</p>
    </div>
    <form :class="compact ? 'footer-contact-form' : 'form-grid'" @submit.prevent="$emit('submit')">
      <input :value="form.nombre" required placeholder="Nombre" @input="updateField('nombre', $event.target.value)" />
      <input :value="form.email" required type="email" placeholder="Email" @input="updateField('email', $event.target.value)" />
      <input v-if="!compact" :value="form.telefono" placeholder="Teléfono" @input="updateField('telefono', $event.target.value)" />
      <input :value="form.asunto" required placeholder="Asunto" @input="updateField('asunto', $event.target.value)" />
      <textarea :value="form.mensaje" required placeholder="Mensaje" @input="updateField('mensaje', $event.target.value)"></textarea>
      <button :disabled="loading">
        <i class="fa-solid fa-paper-plane"></i>
        {{ loading ? 'Enviando...' : compact ? 'Enviar' : 'Enviar mensaje' }}
      </button>
      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </section>
</template>
