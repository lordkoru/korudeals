/**
 * ═══════════════════════════════════════════════════════════════════
 *  Controlador de Reseñas - KoruDeals
 * ═══════════════════════════════════════════════════════════════════
 *  Gestiona las reseñas de productos. Cuando se crea o elimina una
 *  reseña, se recalcula automáticamente el promedio (averageRating)
 *  y el contador (reviewCount) del producto correspondiente.
 * ═══════════════════════════════════════════════════════════════════
 */
import { Request, Response } from "express";
import Review from "../models/reviewModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

/**
 * Recalcula y actualiza el rating promedio y la cantidad de reseñas
 * de un producto en base a las reseñas almacenadas.
 *
 * @param productId - _id del producto a recalcular
 */
const recalculateProductRating = async (productId: string): Promise<void> => {
  const reviews = await Review.find({ product: productId });
  const reviewCount = reviews.length;

  if (reviewCount === 0) {
    await Product.findByIdAndUpdate(productId, {
      averageRating: 0,
      reviewCount: 0
    });
    return;
  }

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const averageRating = parseFloat((sum / reviewCount).toFixed(2));

  await Product.findByIdAndUpdate(productId, {
    averageRating,
    reviewCount
  });
};

/**
 * Obtiene las reseñas de un producto específico, ordenadas por fecha.
 *
 * @route GET /api/reviews/product/:productId
 * @param req - Params: productId
 * @param res - Response con la lista de reseñas
 * @returns 200 - Lista de reseñas
 * @returns 500 - Error interno
 */
export const getProductReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error al obtener reseñas:", error);
    res.status(500).json({ message: "Error al obtener las reseñas" });
  }
};

/**
 * Crea una nueva reseña para un producto. Cada usuario solo puede
 * dejar una reseña por producto. Después de guardar, se recalcula
 * el promedio del producto.
 *
 * @route POST /api/reviews/product/:productId
 * @param req - Params: productId; Body: { rating, comment }
 * @param res - Response con la reseña creada
 * @returns 201 - Reseña creada
 * @returns 400 - El usuario ya reseñó este producto
 * @returns 404 - Producto no encontrado
 * @returns 500 - Error interno
 */
export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.productId as string;
    const { rating, comment } = req.body;

    // Verificar que el producto exista
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    // Verificar que el usuario no haya reseñado ya este producto
    const existing = await Review.findOne({
      product: productId,
      user: req.userId
    });
    if (existing) {
      res.status(400).json({ message: "Ya dejaste una reseña para este producto" });
      return;
    }

    // Obtener el nombre del usuario para mostrarlo en la reseña
    const user = await User.findById(req.userId);
    const userName = user?.name || "Anónimo";

    const newReview = new Review({
      product: productId,
      user: req.userId,
      userName,
      rating,
      comment
    });

    await newReview.save();
    await recalculateProductRating(productId);

    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error al crear reseña:", error);
    res.status(500).json({ message: "Error al crear la reseña" });
  }
};

/**
 * Elimina una reseña. Solo el autor de la reseña puede eliminarla.
 *
 * @route DELETE /api/reviews/:id
 * @param req - Params: id de la reseña
 * @param res - Response confirmando la eliminación
 * @returns 200 - Reseña eliminada
 * @returns 403 - El usuario no es el autor
 * @returns 404 - Reseña no encontrada
 * @returns 500 - Error interno
 */
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      res.status(404).json({ message: "Reseña no encontrada" });
      return;
    }

    // Solo el autor puede eliminar su propia reseña
    if (review.user.toString() !== req.userId) {
      res.status(403).json({ message: "No tienes permiso para eliminar esta reseña" });
      return;
    }

    const productId = review.product.toString();
    await review.deleteOne();
    await recalculateProductRating(productId);

    res.status(200).json({ message: "Reseña eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar reseña:", error);
    res.status(500).json({ message: "Error al eliminar la reseña" });
  }
};
