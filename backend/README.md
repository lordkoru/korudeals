# KoruDeals API

REST API para la plataforma e-commerce de tenis **KoruDeals**. Construida con Node.js, Express y TypeScript, con autenticación segura mediante Auth0 y base de datos MongoDB Atlas.

---

## Stack Tecnológico

| Tecnología | Uso |
|---|---|
| Node.js + TypeScript | Entorno de ejecución y tipado |
| Express.js | Framework web REST API |
| MongoDB Atlas + Mongoose | Base de datos NoSQL y ODM |
| Auth0 + JWT | Autenticación y autorización |
| express-validator | Validación de datos de entrada |
| dotenv | Gestión de variables de entorno |

---

## Requisitos Previos

- Node.js 18 o superior
- Cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
- Cuenta en [Auth0](https://auth0.com) con una API configurada

---

## Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Edita .env con tus credenciales reales

# 3. (Opcional) Cargar datos de ejemplo
npx tsx src/seed.ts

# 4. Iniciar servidor en desarrollo
npm run dev
```

El servidor inicia en `http://localhost:3000`.

---

## Scripts Disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor con recarga automática |
| `npm run build` | Compila TypeScript a JavaScript (`/dist`) |
| `npm start` | Inicia el servidor compilado (producción) |

---

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

| Variable | Descripción |
|---|---|
| `DB_CONNECTION_STRING` | URI de conexión a MongoDB Atlas |
| `AUTH0_AUDIENCE` | Identificador de la API en Auth0 |
| `AUTH0_ISSUER_BASE_URL` | URL base del tenant de Auth0 |
| `FRONTEND_URL` | URL del frontend (para CORS) |
| `PORT` | Puerto del servidor (por defecto: 3000) |

---

## Endpoints Principales

### Estado del servidor

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| `GET` | `/health` | Verifica que la API esté activa | No |

### Usuarios

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| `POST` | `/api/my/user` | Crea el usuario en el primer login | JWT |
| `GET` | `/api/my/user` | Obtiene el perfil del usuario autenticado | JWT |
| `PUT` | `/api/my/user` | Actualiza el perfil del usuario | JWT |

### Productos

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| `GET` | `/api/products` | Lista productos con filtros y paginación | No |
| `GET` | `/api/products/:id` | Obtiene un producto por ID | No |
| `POST` | `/api/products` | Crea un producto nuevo | JWT + Admin |
| `PUT` | `/api/products/:id` | Actualiza un producto existente | JWT + Admin |
| `DELETE` | `/api/products/:id` | Desactiva un producto (soft delete) | JWT + Admin |

### Pedidos

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| `POST` | `/api/orders` | Crea un pedido desde el carrito | JWT |
| `GET` | `/api/orders/my-orders` | Lista los pedidos del usuario autenticado | JWT |
| `GET` | `/api/orders` | Lista todos los pedidos del sistema | JWT + Admin |
| `PUT` | `/api/orders/:id/status` | Actualiza el estado de un pedido | JWT + Admin |

### Reseñas

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| `GET` | `/api/reviews/product/:productId` | Obtiene las reseñas de un producto | No |
| `POST` | `/api/reviews/product/:productId` | Crea una reseña para un producto | JWT |
| `DELETE` | `/api/reviews/:id` | Elimina una reseña propia | JWT |

---

## Estructura del Proyecto

```
backend/
├── src/
│   ├── controllers/    # Lógica de negocio de cada recurso
│   ├── models/         # Esquemas de Mongoose (MongoDB)
│   ├── routes/         # Definición de rutas Express
│   ├── middleware/     # Auth (JWT), validación, roles
│   ├── index.ts        # Punto de entrada del servidor
│   └── seed.ts         # Script para cargar datos de ejemplo
├── .env.example        # Plantilla de variables de entorno
├── package.json
└── tsconfig.json
```

---

## Despliegue en Render

1. Conecta el repositorio en [Render](https://render.com)
2. Tipo de servicio: **Web Service**
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Agrega las variables de entorno del `.env.example` en el panel de Render

---

## Autores

- Brayan Fernando Ramos Hernandez
- Julio César Chávez Romero
