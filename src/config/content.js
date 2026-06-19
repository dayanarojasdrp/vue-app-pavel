export const MINISTRY_CATEGORIES = [
  'Adultos y familias',
  'Jóvenes',
  'Niños',
  'Líderes y ministros',
  'Educación'
]

export const PAGE_SECTIONS = [
  'inicio-hero',
  'inicio-hero-etiqueta',
  'inicio-hero-boton-principal',
  'inicio-hero-boton-secundario',
  'inicio-busqueda',
  'inicio-busqueda-placeholder',
  'inicio-busqueda-boton',
  'inicio-enlaces',
  'inicio-enlace-sobre',
  'inicio-enlace-creencias',
  'inicio-enlace-noticias',
  'inicio-enlace-eventos',
  'inicio-enlace-ministerios',
  'inicio-enlace-misiones',
  'inicio-enlace-donar',
  'inicio-enlace-contacto',
  'inicio-enlace-panel',
  'inicio-sobre-etiqueta',
  'inicio-sobre-boton',
  'inicio-noticias',
  'inicio-noticias-etiqueta',
  'inicio-noticias-boton',
  'inicio-eventos',
  'inicio-eventos-etiqueta',
  'inicio-eventos-boton',
  'inicio-ministerios',
  'inicio-ministerios-etiqueta',
  'inicio-misiones',
  'inicio-misiones-etiqueta',
  'nav-inicio',
  'nav-sobre',
  'nav-creencias',
  'nav-creencias-cardinales',
  'nav-creencias-fundamentales',
  'nav-creencias-normas',
  'nav-ministerios',
  'nav-ministerios-todos',
  'nav-ministerios-adultos',
  'nav-ministerios-jovenes',
  'nav-ministerios-ninos',
  'nav-ministerios-lideres',
  'nav-ministerios-educacion',
  'nav-misiones',
  'nav-donar',
  'nav-contacto',
  'top-noticias',
  'top-eventos',
  'top-ministerios',
  'top-panel',
  'social-facebook',
  'social-instagram',
  'social-x',
  'social-youtube',
  'social-correo',
  'buscar',
  'buscar-etiqueta',
  'buscar-cargando',
  'buscar-vacio',
  'listado-boton-actualizar',
  'listado-vacio',
  'evento-fecha-proximo',
  'sobre',
  'creencias',
  'creencia-salvacion',
  'creencia-bautismo',
  'creencia-sanidad',
  'creencia-venida',
  'donar',
  'contacto',
  'contacto-etiqueta',
  'contacto-nombre',
  'contacto-email',
  'contacto-telefono',
  'contacto-asunto',
  'contacto-mensaje',
  'contacto-boton',
  'contacto-boton-cargando',
  'footer',
  'footer-boton-panel',
  'horarios',
  'liderazgo',
  'iglesia'
]

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://centromisionero.infinityfreeapp.com/api'
const PUBLIC_ASSET_BASE_URL = (
  import.meta.env.VITE_PUBLIC_ASSET_URL ||
  API_BASE_URL.replace(/\/api\/?$/, '')
).replace(/\/$/, '')

export const PUBLIC_ENDPOINTS = {
  noticias: {
    key: 'noticias',
    title: 'Noticias destacadas',
    singular: 'noticia',
    endpoint: '/noticias',
    icon: 'fa-newspaper',
    description: 'Historias, anuncios y testimonios recientes de la comunidad.',
    fields: { title: 'titulo', body: 'resumen', date: 'publicado_en', tag: 'categoria' },
    params: { estado: 'publicado' }
  },
  eventos: {
    key: 'eventos',
    title: 'Eventos próximos',
    singular: 'evento',
    endpoint: '/eventos',
    icon: 'fa-calendar-days',
    description: 'Reuniones, actividades especiales y convocatorias abiertas.',
    fields: { title: 'titulo', body: 'resumen', date: 'fecha_inicio', tag: 'ciudad' },
    params: { activo: true, estado: 'programado', proximos: true }
  },
  ministerios: {
    key: 'ministerios',
    title: 'Ministerios',
    singular: 'ministerio',
    endpoint: '/ministerios',
    icon: 'fa-people-group',
    description: 'Áreas de servicio para familias, jóvenes, niños y líderes.',
    fields: { title: 'nombre', body: 'descripcion', tag: 'categoria' },
    params: { activo: true }
  },
  misiones: {
    key: 'misiones',
    title: 'Misiones',
    singular: 'misión',
    endpoint: '/misiones',
    icon: 'fa-earth-americas',
    description: 'Proyectos y llamados misioneros activos.',
    fields: { title: 'nombre', body: 'informacion', tag: 'categoria' },
    params: { activo: true }
  },
  recursos: {
    key: 'recursos',
    title: 'Recursos',
    singular: 'recurso',
    endpoint: '/recursos',
    icon: 'fa-folder-open',
    description: 'Materiales y enlaces para iglesias, ministerios y discipulado.',
    fields: { title: 'nombre', body: 'informacion', tag: 'tipo' },
    params: { activo: true }
  },
  paginas: {
    key: 'paginas',
    title: 'Quiénes somos',
    singular: 'página',
    endpoint: '/paginas',
    icon: 'fa-church',
    description: 'Páginas institucionales publicadas desde la API.',
    fields: { title: 'titulo', body: 'resumen', tag: 'seccion' },
    params: { activo: true }
  }
}

export const FALLBACK_CONTENT = {
  noticias: [],
  eventos: [],
  ministerios: [],
  misiones: [],
  recursos: [],
  paginas: []
}

const PAGE_FORM_FIELDS = [
  { name: 'titulo', label: 'Título', type: 'text', required: true },
  { name: 'slug', label: 'Slug', type: 'text' },
  { name: 'resumen', label: 'Resumen', type: 'textarea' },
  { name: 'contenido', label: 'Contenido', type: 'textarea', required: true },
  { name: 'imagen', label: 'Imagen', type: 'image' },
  { name: 'seccion', label: 'Sección', type: 'select', options: PAGE_SECTIONS },
  { name: 'orden', label: 'Orden', type: 'number' },
  { name: 'activo', label: 'Activo', type: 'checkbox' },
  { name: 'meta_title', label: 'Meta title', type: 'text' },
  { name: 'meta_description', label: 'Meta description', type: 'textarea' }
]

const SOCIAL_LINK_SECTIONS = [
  'social-facebook',
  'social-instagram',
  'social-x',
  'social-youtube',
  'social-correo'
]

const SOCIAL_LINK_FIELDS = [
  { name: 'titulo', label: 'Nombre visible', type: 'text', required: true },
  { name: 'slug', label: 'Slug', type: 'text' },
  { name: 'contenido', label: 'Descripción interna', type: 'textarea', required: true },
  { name: 'seccion', label: 'Red social', type: 'select', options: SOCIAL_LINK_SECTIONS, required: true },
  { name: 'meta_title', label: 'URL o correo', type: 'text', required: true },
  { name: 'activo', label: 'Activo', type: 'checkbox' },
  { name: 'orden', label: 'Orden', type: 'number' }
]

const PUBLIC_TEXT_SECTIONS = PAGE_SECTIONS.filter((section) => (
  section.startsWith('inicio-') ||
  section.startsWith('nav-') ||
  section.startsWith('top-') ||
  section.startsWith('buscar') ||
  section.startsWith('listado-') ||
  section.startsWith('evento-fecha-') ||
  section.startsWith('contacto-') ||
  section.startsWith('footer')
)).filter((section) => !SOCIAL_LINK_SECTIONS.includes(section))

export const ADMIN_CONFIG = {
  sobrePagina: {
    ...PUBLIC_ENDPOINTS.paginas,
    key: 'sobre',
    title: 'Sobre público',
    singular: 'bloque de sobre',
    description: 'Historia, misión, liderazgo, estructura y datos de la iglesia.',
    params: { seccion: 'sobre' },
    defaults: { seccion: 'sobre', activo: true, orden: 0 },
    formFields: PAGE_FORM_FIELDS
      .filter((field) => field.name !== 'seccion')
      .map((field) => (field.name === 'imagen' ? { ...field, label: 'Foto de la iglesia o liderazgo' } : field))
  },
  contactoPagina: {
    ...PUBLIC_ENDPOINTS.paginas,
    key: 'contacto',
    title: 'Contacto público',
    singular: 'sección de contacto',
    params: { seccion: 'contacto' },
    defaults: { seccion: 'contacto', activo: true, orden: 0 },
    formFields: PAGE_FORM_FIELDS.filter((field) => field.name !== 'seccion')
  },
  donarPagina: {
    ...PUBLIC_ENDPOINTS.paginas,
    key: 'donar',
    title: 'Donar / QR',
    singular: 'sección de donar',
    params: { seccion: 'donar' },
    defaults: { seccion: 'donar', activo: true, orden: 0 },
    formFields: PAGE_FORM_FIELDS
      .filter((field) => field.name !== 'seccion')
      .map((field) => (field.name === 'imagen' ? { ...field, label: 'Foto del código QR' } : field))
  },
  redesSociales: {
    ...PUBLIC_ENDPOINTS.paginas,
    key: 'redes-sociales',
    title: 'Redes sociales',
    singular: 'enlace social',
    description: 'Links de Facebook, Instagram, X, YouTube y correo de la barra superior.',
    params: {},
    sectionFilter: SOCIAL_LINK_SECTIONS,
    defaults: { activo: true, orden: 0 },
    formFields: SOCIAL_LINK_FIELDS
  },
  textosPublicos: {
    ...PUBLIC_ENDPOINTS.paginas,
    key: 'textos-publicos',
    title: 'Textos públicos',
    singular: 'texto público',
    description: 'Etiquetas, botones, navegación, búsqueda, footer y textos pequeños del sitio.',
    params: {},
    sectionFilter: PUBLIC_TEXT_SECTIONS,
    defaults: { activo: true, orden: 0 },
    formFields: [
      { name: 'titulo', label: 'Texto principal', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text' },
      { name: 'resumen', label: 'Texto secundario', type: 'textarea' },
      { name: 'contenido', label: 'Contenido o descripción', type: 'textarea', required: true },
      { name: 'seccion', label: 'Lugar donde aparece', type: 'select', options: PUBLIC_TEXT_SECTIONS, required: true },
      { name: 'activo', label: 'Activo', type: 'checkbox' },
      { name: 'orden', label: 'Orden', type: 'number' },
      { name: 'meta_title', label: 'Dato extra corto', type: 'text' },
      { name: 'meta_description', label: 'Dato extra largo', type: 'textarea' }
    ]
  },
  noticias: {
    ...PUBLIC_ENDPOINTS.noticias,
    params: {},
    defaults: { estado: 'borrador', destacada: false },
    formFields: [
      { name: 'titulo', label: 'Título', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text' },
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
      { name: 'slug', label: 'Slug', type: 'text' },
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
      { name: 'slug', label: 'Slug', type: 'text' },
      { name: 'descripcion', label: 'Descripción', type: 'textarea' },
      { name: 'imagen', label: 'Imagen', type: 'image' },
      { name: 'categoria', label: 'Categoría', type: 'select', options: MINISTRY_CATEGORIES },
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
      { name: 'slug', label: 'Slug', type: 'text' },
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
      { name: 'slug', label: 'Slug', type: 'text' },
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
    formFields: PAGE_FORM_FIELDS
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
  return item?.[fields.body] || item?.resumen || item?.contenido || item?.descripcion || item?.informacion || item?.mensaje || ''
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

  const rawImage = String(item.imagen).trim()

  if (!rawImage) return ''
  if (/^https?:\/\//i.test(rawImage)) return encodeURI(rawImage)

  const cleanPath = rawImage.replace(/^\/+/, '')

  if (cleanPath.startsWith('storage/')) {
    return encodeURI(`${PUBLIC_ASSET_BASE_URL}/${cleanPath}`)
  }

  if (cleanPath.startsWith('uploads/')) {
    return encodeURI(`${PUBLIC_ASSET_BASE_URL}/storage/${cleanPath}`)
  }

  return encodeURI(`${PUBLIC_ASSET_BASE_URL}/${cleanPath}`)
}

export function errorMessage(error) {
  const data = error?.response?.data

  if (data?.message) return data.message
  if (data?.mensaje) return data.mensaje
  if (data?.errors) return Object.values(data.errors).flat().join(' ')

  return 'No se pudo completar la solicitud. Revisa que la API Laravel esté encendida.'
}
