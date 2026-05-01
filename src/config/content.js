export const PUBLIC_ENDPOINTS = {
  noticias: {
    key: 'noticias',
    title: 'Noticias destacadas',
    singular: 'noticia',
    endpoint: '/noticias',
    icon: 'fa-newspaper',
    description: 'Historias, anuncios y testimonios recientes de la comunidad.',
    fields: { title: 'titulo', body: 'resumen', date: 'publicado_en', tag: 'categoria' },
    params: { estado: 'publicado', destacada: 1 }
  },
  eventos: {
    key: 'eventos',
    title: 'Eventos próximos',
    singular: 'evento',
    endpoint: '/eventos',
    icon: 'fa-calendar-days',
    description: 'Reuniones, actividades especiales y convocatorias abiertas.',
    fields: { title: 'titulo', body: 'resumen', date: 'fecha_inicio', tag: 'ciudad' },
    params: { proximos: 1, activo: 1 }
  },
  ministerios: {
    key: 'ministerios',
    title: 'Ministerios',
    singular: 'ministerio',
    endpoint: '/ministerios',
    icon: 'fa-people-group',
    description: 'Áreas de servicio para familias, jóvenes, niños y líderes.',
    fields: { title: 'nombre', body: 'descripcion', tag: 'categoria' },
    params: { activo: 1 }
  },
  misiones: {
    key: 'misiones',
    title: 'Misiones',
    singular: 'misión',
    endpoint: '/misiones',
    icon: 'fa-earth-americas',
    description: 'Proyectos y llamados misioneros activos.',
    fields: { title: 'nombre', body: 'informacion', tag: 'categoria' },
    params: { activo: 1 }
  },
  recursos: {
    key: 'recursos',
    title: 'Recursos',
    singular: 'recurso',
    endpoint: '/recursos',
    icon: 'fa-folder-open',
    description: 'Materiales y enlaces para iglesias, ministerios y discipulado.',
    fields: { title: 'nombre', body: 'informacion', tag: 'tipo' },
    params: { activo: 1 }
  },
  paginas: {
    key: 'paginas',
    title: 'Quiénes somos',
    singular: 'página',
    endpoint: '/paginas',
    icon: 'fa-church',
    description: 'Páginas institucionales publicadas desde la API.',
    fields: { title: 'titulo', body: 'resumen', tag: 'seccion' },
    params: { activo: 1 }
  }
}

export const FALLBACK_CONTENT = {
  noticias: [
    {
      id: 'fallback-noticia-1',
      titulo: 'Una comunidad enviada a servir',
      resumen: 'Publica noticias desde el panel pastoral para que aparezcan destacadas en esta portada.',
      categoria: 'Comunidad'
    },
    {
      id: 'fallback-noticia-2',
      titulo: 'Historias que edifican la iglesia',
      resumen: 'Los testimonios, anuncios y novedades publicados en Laravel se mostrarán aquí.',
      categoria: 'Noticias'
    },
    {
      id: 'fallback-noticia-3',
      titulo: 'Una iglesia activa en su ciudad',
      resumen: 'Marca una noticia como destacada para ocupar este espacio principal.',
      categoria: 'Misión local'
    }
  ],
  eventos: [
    {
      id: 'fallback-evento-1',
      titulo: 'Servicio dominical',
      resumen: 'Añade eventos con fecha, lugar y descripción desde el panel.',
      ciudad: 'Escambray'
    },
    {
      id: 'fallback-evento-2',
      titulo: 'Noche de oración',
      resumen: 'Los eventos activos y próximos se ordenan automáticamente por fecha.',
      ciudad: 'Templo principal'
    }
  ],
  ministerios: [
    { id: 'fallback-min-1', nombre: 'Familias', descripcion: 'Acompañamiento pastoral y formación para el hogar.', categoria: 'Adultos' },
    { id: 'fallback-min-2', nombre: 'Jóvenes', descripcion: 'Espacios de fe, amistad, discipulado y servicio.', categoria: 'Juventud' },
    { id: 'fallback-min-3', nombre: 'Niños', descripcion: 'Enseñanza bíblica cuidadosa para los más pequeños.', categoria: 'Infantil' }
  ],
  misiones: [
    { id: 'fallback-mis-1', nombre: 'Alcance local', informacion: 'Proyectos de compasión y evangelismo en la comunidad.', categoria: 'Local' },
    { id: 'fallback-mis-2', nombre: 'Misiones globales', informacion: 'Una iglesia que ora, envía y participa en la misión.', categoria: 'Global' }
  ],
  recursos: [
    { id: 'fallback-rec-1', nombre: 'Materiales de discipulado', informacion: 'Recursos preparados para el crecimiento espiritual.', tipo: 'Descarga' },
    { id: 'fallback-rec-2', nombre: 'Herramientas ministeriales', informacion: 'Guías, enlaces y documentos para equipos de servicio.', tipo: 'Guía' }
  ],
  paginas: [
    {
      id: 'fallback-pag-1',
      titulo: 'Centro Misionero Escambray',
      resumen: 'Somos una comunidad cristiana comprometida con la Palabra, la adoración, el discipulado y la misión.',
      seccion: 'Sobre'
    }
  ]
}

export const ADMIN_CONFIG = {
  noticias: {
    ...PUBLIC_ENDPOINTS.noticias,
    params: {},
    defaults: { estado: 'borrador', destacada: false },
    formFields: [
      { name: 'titulo', label: 'Título', type: 'text', required: true },
      { name: 'resumen', label: 'Resumen', type: 'textarea' },
      { name: 'contenido', label: 'Contenido', type: 'textarea', required: true },
      { name: 'imagen', label: 'Imagen', type: 'image' },
      { name: 'autor', label: 'Autor', type: 'text' },
      { name: 'publicado_en', label: 'Publicado en', type: 'datetime-local' },
      { name: 'estado', label: 'Estado', type: 'select', options: ['borrador', 'publicado', 'archivado'] },
      { name: 'destacada', label: 'Destacada', type: 'checkbox' },
      { name: 'categoria', label: 'Categoría', type: 'text' },
      { name: 'ministerio_id', label: 'ID de ministerio', type: 'number', required: true },
      { name: 'meta_title', label: 'Meta title', type: 'text' },
      { name: 'meta_description', label: 'Meta description', type: 'textarea' }
    ]
  },
  eventos: {
    ...PUBLIC_ENDPOINTS.eventos,
    params: {},
    defaults: { estado: 'borrador', activo: true, destacado: false },
    formFields: [
      { name: 'titulo', label: 'Título', type: 'text', required: true },
      { name: 'resumen', label: 'Resumen', type: 'textarea' },
      { name: 'descripcion', label: 'Descripción', type: 'textarea', required: true },
      { name: 'imagen', label: 'Imagen', type: 'image' },
      { name: 'categoria', label: 'Categoría', type: 'text' },
      { name: 'fecha_inicio', label: 'Fecha de inicio', type: 'datetime-local', required: true },
      { name: 'fecha_fin', label: 'Fecha de cierre', type: 'datetime-local' },
      { name: 'lugar', label: 'Lugar', type: 'text' },
      { name: 'direccion', label: 'Dirección', type: 'text' },
      { name: 'ciudad', label: 'Ciudad', type: 'text' },
      { name: 'estado', label: 'Estado', type: 'select', options: ['borrador', 'programado', 'cancelado', 'finalizado'] },
      { name: 'destacado', label: 'Destacado', type: 'checkbox' },
      { name: 'activo', label: 'Activo', type: 'checkbox' },
      { name: 'registro_url', label: 'URL de registro', type: 'url' },
      { name: 'capacidad', label: 'Capacidad', type: 'number' }
    ]
  },
  ministerios: {
    ...PUBLIC_ENDPOINTS.ministerios,
    params: {},
    defaults: { activo: true, orden: 0 },
    formFields: [
      { name: 'nombre', label: 'Nombre', type: 'text', required: true },
      { name: 'descripcion', label: 'Descripción', type: 'textarea' },
      { name: 'imagen', label: 'Imagen', type: 'image' },
      { name: 'categoria', label: 'Categoría', type: 'text' },
      { name: 'orden', label: 'Orden', type: 'number' },
      { name: 'activo', label: 'Activo', type: 'checkbox' },
      { name: 'url_externa', label: 'URL externa', type: 'url' }
    ]
  },
  misiones: {
    ...PUBLIC_ENDPOINTS.misiones,
    params: {},
    defaults: { activo: true, orden: 0 },
    formFields: [
      { name: 'nombre', label: 'Nombre', type: 'text', required: true },
      { name: 'informacion', label: 'Información', type: 'textarea', required: true },
      { name: 'imagen', label: 'Imagen', type: 'image' },
      { name: 'categoria', label: 'Categoría', type: 'text' },
      { name: 'orden', label: 'Orden', type: 'number' },
      { name: 'activo', label: 'Activo', type: 'checkbox' },
      { name: 'url_externa', label: 'URL externa', type: 'url' }
    ]
  },
  recursos: {
    ...PUBLIC_ENDPOINTS.recursos,
    params: {},
    defaults: { activo: true, descargable: false, destacado: false, orden: 0 },
    formFields: [
      { name: 'nombre', label: 'Nombre', type: 'text', required: true },
      { name: 'informacion', label: 'Información', type: 'textarea', required: true },
      { name: 'imagen', label: 'Imagen', type: 'image' },
      { name: 'categoria', label: 'Categoría', type: 'text' },
      { name: 'tipo', label: 'Tipo', type: 'text' },
      { name: 'archivo_url', label: 'URL de archivo', type: 'url' },
      { name: 'link', label: 'Link', type: 'url' },
      { name: 'descargable', label: 'Descargable', type: 'checkbox' },
      { name: 'destacado', label: 'Destacado', type: 'checkbox' },
      { name: 'orden', label: 'Orden', type: 'number' },
      { name: 'activo', label: 'Activo', type: 'checkbox' }
    ]
  },
  paginas: {
    ...PUBLIC_ENDPOINTS.paginas,
    params: {},
    defaults: { activo: true, orden: 0 },
    formFields: [
      { name: 'titulo', label: 'Título', type: 'text', required: true },
      { name: 'resumen', label: 'Resumen', type: 'textarea' },
      { name: 'contenido', label: 'Contenido', type: 'textarea', required: true },
      { name: 'imagen', label: 'Imagen', type: 'image' },
      { name: 'seccion', label: 'Sección', type: 'text' },
      { name: 'orden', label: 'Orden', type: 'number' },
      { name: 'activo', label: 'Activo', type: 'checkbox' },
      { name: 'meta_title', label: 'Meta title', type: 'text' },
      { name: 'meta_description', label: 'Meta description', type: 'textarea' }
    ]
  }
}

export function normalizeList(payload) {
  if (Array.isArray(payload)) return payload
  return payload?.data || []
}

export function itemTitle(item, fields = {}) {
  return item?.[fields.title] || item?.titulo || item?.nombre || item?.asunto || 'Sin título'
}

export function itemBody(item, fields = {}) {
  return item?.[fields.body] || item?.resumen || item?.descripcion || item?.informacion || item?.mensaje || ''
}

export function itemMeta(item, fields = {}) {
  return item?.[fields.tag] || item?.estado || ''
}

export function itemDate(item, fields = {}) {
  return item?.[fields.date] || item?.publicado_en || item?.fecha_inicio || item?.created_at || ''
}

export function formatDate(value) {
  if (!value) return ''

  return new Intl.DateTimeFormat('es', {
    dateStyle: 'medium',
    timeStyle: String(value).includes('T') ? 'short' : undefined
  }).format(new Date(value))
}

export function imageUrl(item) {
  if (!item?.imagen) return ''
  if (item.imagen.startsWith('http')) return item.imagen
  if (item.imagen.startsWith('/storage')) return `http://localhost:8000${item.imagen}`
  if (item.imagen.startsWith('uploads/')) return `http://localhost:8000/storage/${item.imagen}`
  return item.imagen
}

export function errorMessage(error) {
  const data = error?.response?.data

  if (data?.message) return data.message
  if (data?.mensaje) return data.mensaje
  if (data?.errors) return Object.values(data.errors).flat().join(' ')

  return 'No se pudo completar la solicitud. Revisa que la API Laravel esté encendida.'
}
