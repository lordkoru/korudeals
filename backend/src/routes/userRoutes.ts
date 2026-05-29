/**
 * ═══════════════════════════════════════════════════════════════════
 *  Rutas de Usuario - KoruDeals
 * ═══════════════════════════════════════════════════════════════════
 *  Define los endpoints relacionados con la entidad Usuario.
 *  Todas las rutas requieren autenticación mediante JWT (Auth0).
 *
 *  Base path: /api/my/user
 * ═══════════════════════════════════════════════════════════════════
 */
import express from "express";
import { createUser, updateUser, getCurrentUser } from "../controllers/userController.js";
import { jwtCheck, jwtParse } from "../middleware/auth.js";
import { validateUserRequest } from "../middleware/validation.js";

const router = express.Router();

/**
 * POST /api/my/user
 * Crea un nuevo usuario en la base de datos.
 * Este endpoint es llamado automáticamente al iniciar sesión por
 * primera vez con Auth0.
 */
router.post("/", jwtCheck, createUser);

/**
 * GET /api/my/user
 * Devuelve los datos del usuario autenticado.
 */
router.get("/", jwtCheck, jwtParse, getCurrentUser);

/**
 * PUT /api/my/user
 * Actualiza los datos del perfil del usuario autenticado.
 */
router.put("/", jwtCheck, jwtParse, validateUserRequest, updateUser);

export default router;
