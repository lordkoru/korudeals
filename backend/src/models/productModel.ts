/**
 * ═══════════════════════════════════════════════════════════════════
 *  Modelo de Producto - KoruDeals
 * ═══════════════════════════════════════════════════════════════════
 *  Define el esquema de Mongoose para la colección 'products'.
 *  Cada documento representa un par de tenis casuales en el catálogo
 *  de la tienda. Incluye información de marca, tallas disponibles,
 *  colores, precio y existencias.
 * ═══════════════════════════════════════════════════════════════════
 */
import mongoose from "mongoose";

/**
 * Esquema del producto (tenis) que se vende en KoruDeals.
 * Las tallas y colores son arreglos para soportar múltiples variantes.
 */
const productSchema = new mongoose.Schema({
  /** Nombre comercial del producto. Ej: "Nike Air Force 1". */
  name: { type: String, required: true },

  /** Marca del tenis. Ej: "Nike", "Adidas", "Puma". */
  brand: { type: String, required: true },

  /** Descripción detallada del producto: materiales, uso, etc. */
  description: { type: String, required: true },

  /** Precio por unidad en pesos mexicanos (MXN). */
  price: { type: Number, required: true, min: 0 },

  /** Tallas disponibles. Ej: [25, 25.5, 26, 27]. */
  sizes: { type: [Number], required: true, default: [] },

  /** Colores disponibles. Ej: ["Negro", "Blanco", "Rojo"]. */
  colors: { type: [String], required: true, default: [] },

  /** Cantidad total de unidades en inventario. */
  stock: { type: Number, required: true, default: 0, min: 0 },

  /** URL principal de la imagen del producto. */
  imageUrl: { type: String, required: true },

  /** Galería opcional con más imágenes del producto. */
  gallery: { type: [String], default: [] },

  /**
   * Categoría general del calzado.
   * Permite filtrar el catálogo por estilo.
   */
  category: {
    type: String,
    enum: ["casual", "deportivo", "urbano", "running", "skate"],
    default: "casual"
  },

  /** Indica si el producto está activo en el catálogo. */
  isActive: { type: Boolean, default: true },

  /** Calificación promedio calculada a partir de las reseñas (0–5). */
  averageRating: { type: Number, default: 0, min: 0, max: 5 },

  /** Número total de reseñas que tiene este producto. */
  reviewCount: { type: Number, default: 0 },

  /** Fecha de alta del producto en el catálogo. */
  createdAt: { type: Date, default: Date.now }
});

/** Modelo exportado, vinculado a la colección 'products' de MongoDB. */
const Product = mongoose.model("Product", productSchema);
export default Product;
