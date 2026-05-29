# 🟠 KoruDeals — Plataforma E-commerce de Tenis Casuales

Aplicación web full-stack para la venta de tenis casuales, desarrollada como
proyecto final de la materia **Aseguramiento de Aplicaciones Web** del
Instituto Tecnológico de Zacatecas.

---

## 🛠️ Stack Tecnológico

### Backend
- **Node.js** + **TypeScript**
- **Express.js** (framework web)
- **MongoDB Atlas** + **Mongoose** (base de datos NoSQL)
- **Auth0** (autenticación con JWT)
- **express-validator** (validación de datos)
- **CORS** + **dotenv**

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** (utility-first styling)
- **ShadCN / Radix UI** (componentes accesibles)
- **React Router v6** (enrutamiento)
- **TanStack Query** (gestión de estado del servidor)
- **Auth0 React** (integración con Auth0)
- **Lucide React** (íconos)
- **Sonner** (notificaciones toast)

---

## 📁 Estructura del Proyecto

```
KoruDeals/
├── backend/
│   ├── src/
│   │   ├── models/         # Esquemas de Mongoose (User, Product, Order, Review)
│   │   ├── controllers/    # Lógica de negocio
│   │   ├── routes/         # Endpoints de la API REST
│   │   ├── middleware/     # Auth, validación
│   │   └── index.ts        # Servidor Express
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/            # Hooks de React Query
    │   ├── auth/           # Auth0 provider y rutas protegidas
    │   ├── components/     # UI components (Header, Footer, ProductCard, etc.)
    │   ├── hooks/          # Custom hooks (useCart)
    │   ├── layouts/        # Layout global
    │   ├── pages/          # Páginas (Home, Catalog, Cart, Admin, etc.)
    │   ├── lib/            # Utilidades
    │   ├── types.ts        # Tipos TypeScript
    │   └── main.tsx        # Punto de entrada
    ├── package.json
    ├── vite.config.ts
    └── tailwind.config.js
```

---

## 🚀 Instalación

### Requisitos previos
- **Node.js** 18+ y **npm** 9+
- Cuenta gratuita en **[MongoDB Atlas](https://cloud.mongodb.com)**
- Cuenta gratuita en **[Auth0](https://auth0.com)**

### 1. Clonar el repositorio
```bash
git clone <tu-repo>
cd KoruDeals
```

### 2. Configurar el Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edita `.env` con tus credenciales:
```env
DB_CONNECTION_STRING=mongodb+srv://USUARIO:PASSWORD@cluster.mongodb.net/korudeals?retryWrites=true&w=majority
AUTH0_AUDIENCE=KoruDealsApiBackEnd
AUTH0_ISSUER_BASE_URL=https://tu-dominio.us.auth0.com/
PORT=3000
```

### 3. Configurar el Frontend

```bash
cd ../frontend
npm install
cp .env.example .env
```

Edita `.env`:
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_AUTH0_DOMAIN=tu-dominio.us.auth0.com
VITE_AUTH0_CLIENT_ID=TU_CLIENT_ID
VITE_AUTH0_CALLBACK_URL=https://localhost:5173/auth-callback
VITE_AUTH0_AUDIENCE=KoruDealsApiBackEnd
```

### 4. (Opcional) Configurar HTTPS local
Para usar HTTPS en desarrollo (necesario para Auth0):
```bash
cd frontend
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 \
  -keyout private.key -out certificate.crt
```

### 5. Ejecutar el proyecto

**Terminal 1** (backend):
```bash
cd backend
npm run dev
```

**Terminal 2** (frontend):
```bash
cd frontend
npm run dev
```

Abre tu navegador en `https://localhost:5173` 🚀

---

## 📡 Endpoints de la API

### Usuarios — `/api/my/user`
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST   | /    | Crear usuario | JWT |
| GET    | /    | Obtener perfil del usuario | JWT |
| PUT    | /    | Actualizar perfil | JWT |

### Productos — `/api/products`
| Método | Ruta  | Descripción | Auth |
|--------|-------|-------------|------|
| GET    | /     | Listar productos (con filtros) | Pública |
| GET    | /:id  | Detalle de un producto | Pública |
| POST   | /     | Crear producto | Admin |
| PUT    | /:id  | Actualizar producto | Admin |
| DELETE | /:id  | Eliminar producto (soft) | Admin |

### Pedidos — `/api/orders`
| Método | Ruta            | Descripción | Auth |
|--------|-----------------|-------------|------|
| POST   | /               | Crear pedido | JWT |
| GET    | /my-orders      | Mis pedidos | JWT |
| GET    | /               | Todos los pedidos | Admin |
| PUT    | /:id/status     | Actualizar estado | Admin |

### Reseñas — `/api/reviews`
| Método | Ruta                    | Descripción | Auth |
|--------|-------------------------|-------------|------|
| GET    | /product/:productId     | Reseñas de un producto | Pública |
| POST   | /product/:productId     | Crear reseña | JWT |
| DELETE | /:id                    | Eliminar reseña | JWT |

---

## 👥 Autores

- **Brayan Fernando Ramos Hernández** — L2245066@itz.edu.mx
- **Julio César Chávez Romero** — L22450159@itz.edu.mx

**Docente:** Dr. Jaime Iván López Veyna

**Materia:** Aseguramiento de Aplicaciones Web — Octavo B — ITZ — 2026

---

## 📝 Licencia

Proyecto académico, uso libre para fines educativos.
