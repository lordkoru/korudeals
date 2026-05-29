/**
 * ═══════════════════════════════════════════════════════════════════
 *  Rutas de Reseñas - KoruDeals
 * ═══════════════════════════════════════════════════════════════════
 *  Define los endpoints para gestionar las reseñas de productos.
 *  Las consultas son públicas; crear/eliminar requiere autenticación.
 *
 *  Base path: /api/reviews
 * ═══════════════════════════════════════════════════════════════════
 */
import express from "express";
import {
  getProductReviews,
  createReview,
  deleteReview
} from "../controllers/reviewController.js";
import { jwtCheck, jwtParse } from "../middleware/auth.js";
import { validateReviewRequest } from "../middleware/validation.js";

const router = express.Router();

/**
 * GET /api/reviews/product/:productId
 * Devuelve todas las reseñas de un producto. Ruta pública.
 */
router.get("/product/:productId", getProductReviews);

/**
 * POST /api/reviews/product/:productId
 * Crea una nueva reseña para un producto. Requiere autenticación.
 */
router.post(
  "/product/:productId",
  jwtCheck,
  jwtParse,
  validateReviewRequest,
  createReview
);

/**
 * DELETE /api/reviews/:id
 * Elimina una reseña. Solo el autor puede eliminarla.
 */
router.delete("/:id", jwtCheck, jwtParse, deleteReview);

export default router;
