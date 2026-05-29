/**
 * ═══════════════════════════════════════════════════════════════════
 *  Rutas de Pedidos - KoruDeals
 * ═══════════════════════════════════════════════════════════════════
 *  Define los endpoints para crear y consultar pedidos. Los clientes
 *  ven solo sus propios pedidos; los administradores ven todos.
 *
 *  Base path: /api/orders
 * ═══════════════════════════════════════════════════════════════════
 */
import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} from "../controllers/orderController.js";
import { jwtCheck, jwtParse, isAdmin } from "../middleware/auth.js";
import { validateOrderRequest } from "../middleware/validation.js";

const router = express.Router();

/**
 * POST /api/orders
 * Crea un nuevo pedido para el usuario autenticado.
 */
router.post("/", jwtCheck, jwtParse, validateOrderRequest, createOrder);

/**
 * GET /api/orders/my-orders
 * Devuelve los pedidos del usuario autenticado.
 */
router.get("/my-orders", jwtCheck, jwtParse, getMyOrders);

/**
 * GET /api/orders
 * Devuelve TODOS los pedidos. Solo administradores.
 */
router.get("/", jwtCheck, jwtParse, isAdmin, getAllOrders);

/**
 * PUT /api/orders/:id/status
 * Actualiza el estado de un pedido. Solo administradores.
 */
router.put("/:id/status", jwtCheck, jwtParse, isAdmin, updateOrderStatus);

export default router;
