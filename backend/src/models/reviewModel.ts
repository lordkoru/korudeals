/**
 * ═══════════════════════════════════════════════════════════════════
 *  Modelo de Reseña - KoruDeals
 * ═══════════════════════════════════════════════════════════════════
 *  Define el esquema de la colección 'reviews'. Cada documento
 *  representa una opinión escrita por un cliente sobre un producto
 *  que adquirió previamente. Se guarda una calificación numérica
 *  (1 a 5 estrellas) junto con un comentario en texto libre.
 * ═══════════════════════════════════════════════════════════════════
 */
import mongoose from "mongoose";

/**
 * Esquema de la reseña. Cada usuario puede dejar solo una reseña
 * por producto (la unicidad se valida desde el controlador).
 */
const reviewSchema = new mongoose.Schema({
  /** Referencia al producto reseñado. */
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },

  /** Referencia al usuario que escribió la reseña. */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  /** Nombre del usuario en el momento de escribir la reseña. */
  userName: { type: String, required: true },

  /** Calificación otorgada al producto (escala de 1 a 5 estrellas). */
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },

  /** Comentario escrito por el cliente sobre su experiencia. */
  comment: {
    type: String,
    required: true,
    maxlength: 500
  },

  /** Fecha en la que se publicó la reseña. */
  createdAt: { type: Date, default: Date.now }
});

/** Modelo exportado, vinculado a la colección 'reviews' de MongoDB. */
const Review = mongoose.model("Review", reviewSchema);
export default Review;
