<script>
import { formatDate, imageUrl, itemBody, itemDate, itemMeta, itemTitle, PUBLIC_ENDPOINTS } from '../config/content'

export default {
  name: 'NewsGrid',
  props: {
    items: {
      type: Array,
      required: true
    },
    error: {
      type: String,
      default: ''
    }
  },
  methods: {
    formatDate,
    imageUrl,
    title(item) {
      return itemTitle(item, PUBLIC_ENDPOINTS.noticias.fields)
    },
    body(item) {
      return itemBody(item, PUBLIC_ENDPOINTS.noticias.fields)
    },
    meta(item) {
      return itemMeta(item, PUBLIC_ENDPOINTS.noticias.fields)
    },
    date(item) {
      return itemDate(item, PUBLIC_ENDPOINTS.noticias.fields)
    }
  }
}
</script>

<template>
  <p v-if="error" class="status">{{ error }}</p>
  <div class="featured-layout">
    <article v-for="(item, index) in items" :key="item.id || item.slug" :class="['feature-card', { large: index === 0 }]">
      <img v-if="imageUrl(item)" :src="imageUrl(item)" :alt="title(item)" />
      <div v-else class="image-fallback"><span>CME</span></div>
      <div class="feature-body">
        <span v-if="meta(item)" class="tag">{{ meta(item) }}</span>
        <h3>{{ title(item) }}</h3>
        <p>{{ body(item) }}</p>
        <small v-if="date(item)">{{ formatDate(date(item)) }}</small>
      </div>
    </article>
  </div>
</template>
