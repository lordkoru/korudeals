/**
 * ═══════════════════════════════════════════════════════════════════
 *  Modelo de Pedido - KoruDeals
 * ═══════════════════════════════════════════════════════════════════
 *  Define el esquema de la colección 'orders'. Cada documento
 *  representa una compra realizada por un cliente. Los detalles de
 *  los productos se almacenan como un sub-documento embebido (items)
 *  para optimizar las consultas y mantener la información histórica
 *  del precio aunque el producto cambie en el catálogo.
 * ═══════════════════════════════════════════════════════════════════
 */
import mongoose from "mongoose";

/**
 * Sub-esquema que representa un producto dentro de un pedido.
 * Se guarda el nombre y precio en el momento de la compra para
 * preservar la información aunque el producto se modifique después.
 */
const orderItemSchema = new mongoose.Schema({
  /** Referencia al producto original en la colección 'products'. */
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },

  /** Nombre del producto en el momento de la compra. */
  name: { type: String, required: true },

  /** Cantidad de unidades adquiridas de este producto. */
  quantity: { type: Number, required: true, min: 1 },

  /** Talla seleccionada por el cliente. */
  size: { type: Number, required: true },

  /** Color seleccionado por el cliente. */
  color: { type: String, required: true },

  /** Precio unitario al momento de la compra (no cambia después). */
  unitPrice: { type: Number, required: true, min: 0 }
}, { _id: false });

/**
 * Esquema principal del pedido. Agrupa los items, el total, la
 * dirección de envío, el estado y el método de pago utilizado.
 */
const orderSchema = new mongoose.Schema({
  /** Cliente que realizó el pedido (referencia al modelo User). */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  /** Lista de productos incluidos en este pedido. */
  items: { type: [orderItemSchema], required: true },

  /** Subtotal calculado a partir de los items (sin envío). */
  subtotal: { type: Number, required: true, min: 0 },

  /** Costo de envío en pesos mexicanos. */
  shippingCost: { type: Number, default: 99, min: 0 },

  /** Total final del pedido (subtotal + envío). */
  total: { type: Number, required: true, min: 0 },

  /** Dirección a la cual se enviará el pedido. */
  shippingAddress: {
    addressLine1: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true }
  },

  /**
   * Estado actual del pedido. Cambia conforme el administrador
   * actualiza el flujo de la compra.
   */
  status: {
    type: String,
    enum: ["pendiente", "pagado", "enviado", "entregado", "cancelado"],
    default: "pendiente"
  },

  /** Método de pago utilizado por el cliente. */
  paymentMethod: {
    type: String,
    enum: ["tarjeta", "paypal", "efectivo"],
    default: "tarjeta"
  },

  /** Fecha de creación del pedido. */
  createdAt: { type: Date, default: Date.now },

  /** Última fecha en la que se actualizó el estado del pedido. */
  updatedAt: { type: Date, default: Date.now }
});

/** Modelo exportado, vinculado a la colección 'orders' de MongoDB. */
const Order = mongoose.model("Order", orderSchema);
export default Order;
