/**
 * ═══════════════════════════════════════════════════════════════════
 *  Modelo de Usuario - KoruDeals
 * ═══════════════════════════════════════════════════════════════════
 *  Define el esquema de Mongoose para la colección 'users' en MongoDB.
 *  Almacena los datos personales del cliente y administrador, así como
 *  el identificador de Auth0 utilizado para la autenticación.
 *
 *  Roles soportados:
 *    - 'cliente'        : Usuario final que compra tenis
 *    - 'administrador'  : Usuario con permisos de gestión del catálogo
 * ═══════════════════════════════════════════════════════════════════
 */
import mongoose from "mongoose";

/**
 * Esquema del usuario en la base de datos.
 * Cada documento representa una cuenta registrada en KoruDeals.
 */
const userSchema = new mongoose.Schema({
  /** Identificador único proporcionado por Auth0 (sub del JWT). */
  auth0Id: { type: String, required: true, unique: true },

  /** Correo electrónico del usuario, único en toda la colección. */
  email: { type: String, required: true, unique: true },

  /** Nombre completo del usuario. Editable desde el perfil. */
  name: { type: String },

  /** Línea principal de la dirección de envío. */
  addressLine1: { type: String },

  /** Ciudad de residencia para el envío de los pedidos. */
  city: { type: String },

  /** País de residencia para el envío de los pedidos. */
  country: { type: String },

  /**
   * Rol del usuario dentro del sistema.
   * Define qué acciones puede realizar dentro de la plataforma.
   */
  role: {
    type: String,
    enum: ["cliente", "administrador"],
    default: "cliente"
  },

  /** URL de la imagen de perfil (avatar) del usuario. */
  imageUrl: { type: String },

  /** Fecha en la que el usuario se registró en la plataforma. */
  createdAt: { type: Date, default: Date.now }
});

/** Modelo exportado, vinculado a la colección 'users' de MongoDB. */
const User = mongoose.model("User", userSchema);
export default User;
