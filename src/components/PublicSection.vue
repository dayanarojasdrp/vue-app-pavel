<script>
import { formatDate, imageUrl, itemBody, itemDate, itemMeta, itemTitle } from '../config/content'

export default {
  name: 'PublicSection',
  props: {
    config: {
      type: Object,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    error: {
      type: String,
      default: ''
    },
    filterLabel: {
      type: String,
      default: ''
    },
    headerPage: {
      type: Object,
      default: null
    },
    uiPages: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['refresh'],
  methods: {
    formatDate,
    imageUrl,
    title(item) {
      return itemTitle(item, this.config.fields)
    },
    body(item) {
      return itemBody(item, this.config.fields)
    },
    meta(item) {
      return itemMeta(item, this.config.fields)
    },
    date(item) {
      return itemDate(item, this.config.fields)
    },
    headerTitle() {
      return this.headerPage ? itemTitle(this.headerPage, { title: 'titulo' }) : this.config.title
    },
    headerDescription() {
      return this.headerPage ? itemBody(this.headerPage, { body: 'resumen' }) || this.config.description : this.config.description
    },
    uiText(key, fallback) {
      return this.uiPages[key]?.titulo || this.uiPages[key]?.resumen || this.uiPages[key]?.contenido || fallback
    }
  }
}
</script>

<template>
  <section class="content-section">
    <div class="section-heading">
      <div>
        <p class="eyebrow"><span class="eyebrow-mark"></span> {{ headerTitle() }}</p>
        <h2>{{ headerDescription() }}</h2>
        <span v-if="filterLabel" class="active-filter-pill">{{ filterLabel }}</span>
      </div>
      <button class="secondary" @click="$emit('refresh')">{{ uiText('refresh', 'Actualizar') }}</button>
    </div>

    <p v-if="error" class="status">{{ error }}</p>
    <p v-else-if="!items.length" class="status">
      {{ uiText('empty', 'Todavía no hay contenido publicado en esta sección.') }}
    </p>
    <div v-else class="content-grid">
      <article v-for="item in items" :key="item.id || item.slug" class="content-card">
        <img v-if="imageUrl(item)" :src="imageUrl(item)" :alt="title(item)" />
        <div v-else class="image-fallback small"><span>CME</span></div>
        <span v-if="meta(item)" class="tag">{{ meta(item) }}</span>
        <h3>{{ title(item) }}</h3>
        <p>{{ body(item) }}</p>
        <small v-if="date(item)">{{ formatDate(date(item)) }}</small>
      </article>
    </div>
  </section>
</template>
