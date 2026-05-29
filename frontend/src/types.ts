/**
 * ═══════════════════════════════════════════════════════════════════
 *  Tipos TypeScript - KoruDeals Frontend
 * ═══════════════════════════════════════════════════════════════════
 *  Definiciones de los tipos utilizados en toda la aplicación.
 *  Reflejan los modelos del backend.
 * ═══════════════════════════════════════════════════════════════════
 */

/** Datos del usuario registrado en KoruDeals. */
export type User = {
  _id: string;
  auth0Id: string;
  email: string;
  name?: string;
  addressLine1?: string;
  city?: string;
  country?: string;
  role: "cliente" | "administrador";
  imageUrl?: string;
};

/** Producto (tenis) del catálogo. */
export type Product = {
  _id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  sizes: number[];
  colors: string[];
  stock: number;
  imageUrl: string;
  gallery?: string[];
  category: "casual" | "deportivo" | "urbano" | "running" | "skate";
  isActive: boolean;
  averageRating: number;
  reviewCount: number;
  createdAt: string;
};

/** Item dentro del carrito de compras (estado local). */
export type CartItem = {
  productId: string;
  name: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
  size: number;
  color: string;
};

/** Item ya almacenado en un pedido confirmado. */
export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  size: number;
  color: string;
  unitPrice: number;
};

/** Pedido completo con todos los items. */
export type Order = {
  _id: string;
  user: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingAddress: {
    addressLine1: string;
    city: string;
    country: string;
    zipCode: string;
  };
  status: "pendiente" | "pagado" | "enviado" | "entregado" | "cancelado";
  paymentMethod: "tarjeta" | "paypal" | "efectivo";
  createdAt: string;
  updatedAt: string;
};

/** Reseña de un producto. */
export type Review = {
  _id: string;
  product: string;
  user: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

/** Respuesta de getProducts con paginación. */
export type ProductsResponse = {
  data: Product[];
  pagination: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
};
