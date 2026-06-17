<script>
import { formatDate, itemBody, itemDate, itemTitle, PUBLIC_ENDPOINTS } from '../config/content'

export default {
  name: 'EventsGrid',
  props: {
    items: {
      type: Array,
      required: true
    },
    dateFallback: {
      type: String,
      default: 'Próximo'
    }
  },
  methods: {
    formatDate,
    title(item) {
      return itemTitle(item, PUBLIC_ENDPOINTS.eventos.fields)
    },
    body(item) {
      return itemBody(item, PUBLIC_ENDPOINTS.eventos.fields)
    },
    date(item) {
      return itemDate(item, PUBLIC_ENDPOINTS.eventos.fields)
    }
  }
}
</script>

<template>
  <div class="stack-list">
    <article v-for="item in items" :key="item.id || item.slug" class="stack-item">
      <span class="date-pill">{{ date(item) ? formatDate(date(item)) : dateFallback }}</span>
      <h3>{{ title(item) }}</h3>
      <p>{{ body(item) }}</p>
    </article>
  </div>
</template>
