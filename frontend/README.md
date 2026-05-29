# KoruDeals

Plataforma e-commerce para la venta de tenis casuales. Desarrollada con React, TypeScript y Vite, con autenticación segura mediante Auth0 y diseño responsive con Tailwind CSS.

---

## Screenshot

> _Agrega aquí una captura de pantalla de la aplicación._
>
> Sugerencia: `![Vista principal de KoruDeals](./docs/screenshot.png)`

---

## Stack Tecnológico

| Tecnología | Uso |
|---|---|
| React 18 + TypeScript | Framework de UI y tipado estático |
| Vite | Bundler y servidor de desarrollo |
| Tailwind CSS | Estilos utilitarios |
| Radix UI | Componentes accesibles (Dialog, Dropdown, etc.) |
| TanStack Query | Gestión de estado del servidor y caché |
| Auth0 SDK | Autenticación con OAuth 2.0 / JWT |
| Axios | Cliente HTTP |
| React Router v6 | Enrutamiento SPA |
| React Hook Form + Zod | Formularios y validación |
| Sonner | Notificaciones toast |
| Lucide React | Íconos |

---

## Requisitos Previos

- Node.js 18 o superior
- Cuenta en [Auth0](https://auth0.com)
- El [backend de KoruDeals](../backend/README.md) corriendo (local o en Render)

---

## Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Edita .env con tus credenciales reales

# 3. Iniciar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `https://localhost:5173`.

> **Nota sobre HTTPS local:** El proyecto incluye soporte para HTTPS en desarrollo (requerido por Auth0). Si tienes los archivos `private.key` y `certificate.crt` en la carpeta `frontend/`, se usarán automáticamente.

---

## Scripts Disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila TypeScript y genera el bundle de producción (`/dist`) |
| `npm run preview` | Previsualiza el build de producción localmente |

---

## Variables de Entorno

Crea un archivo `.env` basándote en `.env.example`:

| Variable | Descripción |
|---|---|
| `VITE_API_BASE_URL` | URL base del backend (local o producción) |
| `VITE_AUTH0_DOMAIN` | Dominio del tenant de Auth0 |
| `VITE_AUTH0_CLIENT_ID` | Client ID de la aplicación SPA en Auth0 |
| `VITE_AUTH0_CALLBACK_URL` | URL de redirección tras el login |
| `VITE_AUTH0_AUDIENCE` | Identificador de la API en Auth0 |

> **Importante:** Las variables `VITE_*` se embeben en el bundle durante el build. Deben estar configuradas **antes de compilar**, tanto en local como en Render.

---

## Funcionalidades Principales

- Catálogo de productos con filtros por categoría, marca, talla, color y precio
- Búsqueda de productos en tiempo real
- Detalle de producto con selector de talla y color
- Carrito de compras persistente (localStorage)
- Proceso de checkout con dirección de envío y método de pago
- Historial de pedidos con estados de seguimiento
- Reseñas y calificaciones de productos
- Perfil de usuario editable
- Panel de administración (productos y pedidos)
- Autenticación segura con Auth0
- Diseño responsive (mobile first)
- Modo claro

---

## Estructura del Proyecto

```
frontend/
├── public/
│   └── _redirects      # SPA routing para Render
├── src/
│   ├── api/            # Hooks de React Query para cada recurso
│   ├── auth/           # Configuración de Auth0 y rutas protegidas
│   ├── components/     # Componentes reutilizables (Header, Footer, etc.)
│   ├── hooks/          # Hooks personalizados (useCart)
│   ├── layouts/        # Layout principal de la aplicación
│   ├── pages/          # Páginas de la aplicación
│   ├── types.ts        # Tipos TypeScript compartidos
│   └── AppRoutes.tsx   # Definición de rutas
├── .env.example        # Plantilla de variables de entorno
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Despliegue en Render (Static Site)

1. Conecta el repositorio en [Render](https://render.com)
2. Tipo de servicio: **Static Site**
3. Build command: `npm install && npm run build`
4. Publish directory: `dist`
5. Agrega las variables de entorno del `.env.example` en el panel de Render
6. El archivo `public/_redirects` maneja el routing SPA automáticamente

---

## Autores

- Brayan Fernando Ramos Hernandez
- Julio César Chávez Romero
