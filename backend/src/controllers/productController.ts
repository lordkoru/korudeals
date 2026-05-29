/**
 * ═══════════════════════════════════════════════════════════════════
 *  Controlador de Producto - KoruDeals
 * ═══════════════════════════════════════════════════════════════════
 *  Maneja las operaciones CRUD del catálogo de tenis. Las rutas
 *  públicas (consulta) son accesibles para todos, mientras que las
 *  rutas de modificación requieren rol de administrador.
 * ═══════════════════════════════════════════════════════════════════
 */
import { Request, Response } from "express";
import Product from "../models/productModel.js";

/**
 * Obtiene la lista de productos del catálogo, con soporte para
 * filtros opcionales por marca, talla, color, precio y categoría.
 * También permite paginación mediante los query params 'page' y 'limit'.
 *
 * @route GET /api/products
 * @param req - Query: brand, size, color, minPrice, maxPrice, category, page, limit
 * @param res - Response con productos y metadatos de paginación
 * @returns 200 - Lista de productos
 * @returns 500 - Error interno
 */
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    // Construir el filtro dinámico a partir de los query params
    const filter: any = { isActive: true };

    if (req.query.brand) filter.brand = req.query.brand;
    if (req.query.size) filter.sizes = { $in: [Number(req.query.size)] };
    if (req.query.color) filter.colors = { $in: [req.query.color] };
    if (req.query.category) filter.category = String(req.query.category);
    if (req.query.brand) filter.brand = String(req.query.brand);
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
    }

    // Paginación: por defecto 12 productos por página
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Búsqueda por nombre (texto libre)
    if (req.query.search) {
      filter.name = { $regex: String(req.query.search), $options: "i" };
}

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      data: products,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

/**
 * Obtiene un producto específico por su _id.
 *
 * @route GET /api/products/:id
 * @param req - Params: id del producto
 * @param res - Response con el producto
 * @returns 200 - Producto encontrado
 * @returns 404 - Producto no existe
 * @returns 500 - Error interno
 */
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

/**
 * Crea un nuevo producto en el catálogo. Solo accesible para
 * usuarios con rol 'administrador'.
 *
 * @route POST /api/products
 * @param req - Body con los datos del producto
 * @param res - Response con el producto creado
 * @returns 201 - Producto creado correctamente
 * @returns 400 - Datos inválidos (validados antes en middleware)
 * @returns 500 - Error interno
 */
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

/**
 * Actualiza un producto existente. Solo accesible para administradores.
 *
 * @route PUT /api/products/:id
 * @param req - Params: id; Body: campos a actualizar
 * @param res - Response con el producto actualizado
 * @returns 200 - Producto actualizado
 * @returns 404 - Producto no existe
 * @returns 500 - Error interno
 */
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

/**
 * Elimina (desactiva) un producto del catálogo. Por seguridad de los
 * pedidos históricos, no se elimina físicamente sino que se marca
 * como inactivo (isActive = false).
 *
 * @route DELETE /api/products/:id
 * @param req - Params: id del producto
 * @param res - Response confirmando la eliminación
 * @returns 200 - Producto desactivado
 * @returns 404 - Producto no existe
 * @returns 500 - Error interno
 */
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    res.status(200).json({ message: "Producto eliminado del catálogo" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};
