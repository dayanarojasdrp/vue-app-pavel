# Despliegue del frontend Vue

Este proyecto se puede publicar gratis en GitHub Pages.

## 1. Variables de GitHub Actions

En GitHub, entra al repo `dayanarojasdrp/vue-app-pavel`:

`Settings` -> `Secrets and variables` -> `Actions` -> `Variables` -> `New repository variable`

Crea estas variables:

```txt
VITE_API_URL=https://TU-DOMINIO-DEL-BACKEND.com/api
VITE_PUBLIC_ASSET_URL=https://TU-DOMINIO-DEL-BACKEND.com
VITE_ADMIN_EMAIL=admin@example.com
```

## 2. Activar GitHub Pages

En el mismo repo:

`Settings` -> `Pages` -> `Build and deployment` -> `Source` -> `GitHub Actions`

## 3. Publicar

Cada push a `main` ejecuta `.github/workflows/deploy-pages.yml`.

La URL esperada es:

```txt
https://dayanarojasdrp.github.io/vue-app-pavel/
```

## 4. Verificar

Abre la web publicada y revisa:

- La home carga contenido desde la API.
- Las imagenes cargan desde `VITE_PUBLIC_ASSET_URL`.
- El panel permite iniciar sesion con el admin configurado.
