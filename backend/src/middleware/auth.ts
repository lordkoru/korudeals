/**
 * ═══════════════════════════════════════════════════════════════════
 *  Middleware de Autenticación - KoruDeals
 * ═══════════════════════════════════════════════════════════════════
 *  Contiene los middlewares encargados de:
 *    1. Verificar que el JWT enviado por el cliente sea válido (jwtCheck)
 *    2. Decodificar el token y obtener el usuario asociado (jwtParse)
 *    3. Validar que el usuario tenga rol de administrador (isAdmin)
 *
 *  Auth0 emite los JWT que se reciben en el header 'Authorization'
 *  con el formato 'Bearer <token>'.
 * ═══════════════════════════════════════════════════════════════════
 */
import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

/**
 * Extiende la interfaz Request de Express para añadir
 * propiedades personalizadas que usaremos en los controladores.
 */
declare global {
  namespace Express {
    interface Request {
      auth0Id: string;
      userId: string;
    }
  }
}

/**
 * Middleware que valida el JWT contra los servidores de Auth0.
 * Si el token es inválido o está ausente, devuelve 401.
 */
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256"
});

/**
 * Middleware que decodifica el JWT (sin verificar firma) para
 * obtener el auth0Id del usuario y buscar su _id en la base de datos.
 *
 * @param req - Request de Express con el header Authorization
 * @param res - Response de Express
 * @param next - Función next() para continuar al siguiente middleware
 * @returns void - Responde 401 si no encuentra al usuario
 */
export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { authorization } = req.headers;

  // Verificar que el header de autorización exista y sea de tipo Bearer
  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).json({ message: "No autorizado" });
    return;
  }

  // Extraer el token quitando el prefijo 'Bearer '
  const token = authorization.split(" ")[1];

  try {
    // Decodificar el token sin verificar la firma (ya la verificó jwtCheck)
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub;

    // Buscar el usuario en la base de datos por su auth0Id
    const user = await User.findOne({ auth0Id });
    if (!user) {
      res.status(401).json({ message: "Usuario no encontrado" });
      return;
    }

    // Adjuntar los datos del usuario a la request para usarlos después
    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();

    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
    return;
  }
};

/**
 * Middleware que verifica que el usuario autenticado tenga el rol
 * 'administrador'. Debe usarse después de jwtCheck y jwtParse.
 *
 * @param req - Request con req.userId definido por jwtParse
 * @param res - Response de Express
 * @param next - Función para continuar
 * @returns void - Responde 403 si el usuario no es administrador
 */
export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.userId);

    if (!user || user.role !== "administrador") {
      res.status(403).json({ message: "Acceso denegado: se requiere rol administrador" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Error al verificar permisos" });
    return;
  }
};
