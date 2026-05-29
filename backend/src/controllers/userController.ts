/**
 * ═══════════════════════════════════════════════════════════════════
 *  Controlador de Usuario - KoruDeals
 * ═══════════════════════════════════════════════════════════════════
 *  Contiene la lógica de negocio para las operaciones relacionadas
 *  con la entidad Usuario. Cada función responde a una ruta de la
 *  API REST y retorna respuestas HTTP en formato JSON.
 * ═══════════════════════════════════════════════════════════════════
 */
import { Request, Response } from "express";
import User from "../models/userModel.js";

/**
 * Crea un nuevo usuario en la base de datos a partir del auth0Id
 * recibido en el body. Si el usuario ya existe, retorna el documento
 * existente sin crear un duplicado.
 *
 * @route POST /api/my/user
 * @param req - Request con { auth0Id, email } en el body
 * @param res - Response con el usuario creado o existente
 * @returns 201 - Usuario creado correctamente
 * @returns 200 - El usuario ya existía
 * @returns 500 - Error interno del servidor
 */
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { auth0Id } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      res.status(200).send();
      return;
    }

    // Crear nuevo documento de usuario
    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

/**
 * Actualiza la información del perfil del usuario autenticado.
 * Solo permite modificar campos personales (nombre, dirección, etc.).
 *
 * @route PUT /api/my/user
 * @param req - Request con los datos actualizados en el body
 * @param res - Response con el usuario actualizado
 * @returns 200 - Usuario actualizado correctamente
 * @returns 404 - Usuario no encontrado
 * @returns 500 - Error interno del servidor
 */
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, addressLine1, city, country } = req.body;

    // Buscar usuario por su _id (proporcionado por jwtParse)
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    // Actualizar solo los campos editables
    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

/**
 * Devuelve la información del usuario autenticado.
 *
 * @route GET /api/my/user
 * @param req - Request con req.userId asignado por jwtParse
 * @param res - Response con los datos del usuario
 * @returns 200 - Datos del usuario
 * @returns 404 - Usuario no encontrado
 * @returns 500 - Error interno del servidor
 */
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};
