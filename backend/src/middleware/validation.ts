/**
 * ═══════════════════════════════════════════════════════════════════
 *  Middleware de Validación - KoruDeals
 * ═══════════════════════════════════════════════════════════════════
 *  Conjunto de validadores que utilizan express-validator para
 *  asegurar que los datos enviados por el cliente cumplan con el
 *  formato esperado antes de llegar al controlador.
 * ═══════════════════════════════════════════════════════════════════
 */
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware genérico que revisa los resultados de las validaciones
 * y devuelve un error 400 si alguna falló.
 *
 * @param req - Request de Express
 * @param res - Response de Express
 * @param next - Función para continuar al controlador
 */
const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

/**
 * Validador para la actualización del perfil de usuario.
 * Verifica que el nombre y la dirección no estén vacíos.
 */
export const validateUserRequest = [
  body("name").isString().notEmpty().withMessage("El nombre es obligatorio"),
  body("addressLine1").isString().notEmpty().withMessage("La dirección es obligatoria"),
  body("city").isString().notEmpty().withMessage("La ciudad es obligatoria"),
  body("country").isString().notEmpty().withMessage("El país es obligatorio"),
  handleValidationErrors
];

/**
 * Validador para la creación o actualización de productos.
 * Verifica todos los campos obligatorios del esquema.
 */
export const validateProductRequest = [
  body("name").isString().notEmpty().withMessage("El nombre del producto es obligatorio"),
  body("brand").isString().notEmpty().withMessage("La marca es obligatoria"),
  body("description").isString().notEmpty().withMessage("La descripción es obligatoria"),
  body("price").isFloat({ min: 0 }).withMessage("El precio debe ser un número positivo"),
  body("sizes").isArray({ min: 1 }).withMessage("Debe incluir al menos una talla"),
  body("colors").isArray({ min: 1 }).withMessage("Debe incluir al menos un color"),
  body("stock").isInt({ min: 0 }).withMessage("El stock debe ser un entero no negativo"),
  body("imageUrl").isURL().withMessage("La URL de la imagen no es válida"),
  handleValidationErrors
];

/**
 * Validador para la creación de pedidos.
 * Verifica que existan items y la dirección de envío.
 */
export const validateOrderRequest = [
  body("items").isArray({ min: 1 }).withMessage("El pedido debe contener al menos un producto"),
  body("shippingAddress.addressLine1").isString().notEmpty(),
  body("shippingAddress.city").isString().notEmpty(),
  body("shippingAddress.country").isString().notEmpty(),
  body("shippingAddress.zipCode").isString().notEmpty(),
  body("paymentMethod").isIn(["tarjeta", "paypal", "efectivo"])
    .withMessage("Método de pago no válido"),
  handleValidationErrors
];

/**
 * Validador para la creación de reseñas.
 * Verifica el rating (1–5) y el comentario.
 */
export const validateReviewRequest = [
  body("rating").isInt({ min: 1, max: 5 })
    .withMessage("La calificación debe estar entre 1 y 5"),
  body("comment").isString().notEmpty().isLength({ max: 500 })
    .withMessage("El comentario es obligatorio y no debe exceder 500 caracteres"),
  handleValidationErrors
];
