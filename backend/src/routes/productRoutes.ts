/**
 * ═══════════════════════════════════════════════════════════════════
 *  Rutas de Producto - KoruDeals
 * ═══════════════════════════════════════════════════════════════════
 *  Define los endpoints del catálogo de tenis. Las consultas son
 *  públicas (no requieren login), pero las modificaciones requieren
 *  rol de administrador.
 *
 *  Base path: /api/products
 * ═══════════════════════════════════════════════════════════════════
 */
import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { jwtCheck, jwtParse, isAdmin } from "../middleware/auth.js";
import { validateProductRequest } from "../middleware/validation.js";

const router = express.Router();

/**
 * GET /api/products
 * Devuelve el catálogo de productos con filtros y paginación.
 * Ruta pública - no requiere autenticación.
 */
router.get("/", getProducts);

/**
 * GET /api/products/:id
 * Devuelve los detalles de un producto específico.
 * Ruta pública.
 */
router.get("/:id", getProductById);

/**
 * POST /api/products
 * Crea un nuevo producto. Solo administradores.
 */
router.post("/", jwtCheck, jwtParse, isAdmin, validateProductRequest, createProduct);

/**
 * PUT /api/products/:id
 * Actualiza un producto existente. Solo administradores.
 */
router.put("/:id", jwtCheck, jwtParse, isAdmin, updateProduct);

/**
 * DELETE /api/products/:id
 * Desactiva un producto del catálogo (soft delete). Solo administradores.
 */
router.delete("/:id", jwtCheck, jwtParse, isAdmin, deleteProduct);

export default router;
