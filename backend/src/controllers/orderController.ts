/**
 * ═══════════════════════════════════════════════════════════════════
 *  Controlador de Pedidos - KoruDeals
 * ═══════════════════════════════════════════════════════════════════
 *  Maneja la creación, consulta y actualización de pedidos.
 *  Calcula automáticamente el total y verifica el stock disponible
 *  de cada producto antes de procesar la orden.
 * ═══════════════════════════════════════════════════════════════════
 */
import { Request, Response } from "express";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

/**
 * Crea un nuevo pedido a nombre del usuario autenticado.
 * Verifica el stock disponible, descuenta las unidades y calcula
 * automáticamente subtotal y total.
 *
 * @route POST /api/orders
 * @param req - Body con items, shippingAddress y paymentMethod
 * @param res - Response con el pedido creado
 * @returns 201 - Pedido creado correctamente
 * @returns 400 - Stock insuficiente o datos inválidos
 * @returns 500 - Error interno
 */
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    let subtotal = 0;
    const validatedItems = [];

    // Validar cada producto: existencia, stock y precio actual
    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product || !product.isActive) {
        res.status(400).json({
          message: `El producto ${item.productId} no está disponible`
        });
        return;
      }

      if (product.stock < item.quantity) {
        res.status(400).json({
          message: `Stock insuficiente para ${product.name}`
        });
        return;
      }

      // Acumular subtotal con el precio actual del producto
      subtotal += product.price * item.quantity;

      validatedItems.push({
        productId: product._id,
        name: product.name,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        unitPrice: product.price
      });

      // Descontar stock del producto
      product.stock -= item.quantity;
      await product.save();
    }

    // Calcular costo de envío y total
    const shippingCost = subtotal >= 1500 ? 0 : 99; // envío gratis si compra mayor a $1500
    const total = subtotal + shippingCost;

    // Crear y guardar el pedido
    const newOrder = new Order({
      user: req.userId,
      items: validatedItems,
      subtotal,
      shippingCost,
      total,
      shippingAddress,
      paymentMethod,
      status: "pendiente"
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error al crear pedido:", error);
    res.status(500).json({ message: "Error al crear el pedido" });
  }
};

/**
 * Devuelve la lista de pedidos del usuario autenticado.
 *
 * @route GET /api/orders/my-orders
 * @param req - Request con req.userId asignado por jwtParse
 * @param res - Response con los pedidos del usuario
 * @returns 200 - Lista de pedidos
 * @returns 500 - Error interno
 */
export const getMyOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({ user: req.userId })
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ message: "Error al obtener los pedidos" });
  }
};

/**
 * Devuelve TODOS los pedidos del sistema. Solo para administradores.
 *
 * @route GET /api/orders
 * @param req - Request autenticada de administrador
 * @param res - Response con todos los pedidos
 * @returns 200 - Lista completa de pedidos
 * @returns 403 - Sin permisos de administrador (validado en middleware)
 * @returns 500 - Error interno
 */
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ message: "Error al obtener los pedidos" });
  }
};

/**
 * Actualiza el estado de un pedido. Solo accesible para administradores.
 * Estados válidos: pendiente, pagado, enviado, entregado, cancelado.
 *
 * @route PUT /api/orders/:id/status
 * @param req - Params: id del pedido; Body: { status }
 * @param res - Response con el pedido actualizado
 * @returns 200 - Estado actualizado
 * @returns 400 - Estado inválido
 * @returns 404 - Pedido no encontrado
 * @returns 500 - Error interno
 */
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const validStatuses = ["pendiente", "pagado", "enviado", "entregado", "cancelado"];

    if (!validStatuses.includes(status)) {
      res.status(400).json({ message: "Estado de pedido no válido" });
      return;
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!order) {
      res.status(404).json({ message: "Pedido no encontrado" });
      return;
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error al actualizar pedido:", error);
    res.status(500).json({ message: "Error al actualizar el pedido" });
  }
};
