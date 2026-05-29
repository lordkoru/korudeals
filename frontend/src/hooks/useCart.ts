/**
 * ═══════════════════════════════════════════════════════════════════
 *  Hook useCart - KoruDeals
 * ═══════════════════════════════════════════════════════════════════
 *  Maneja el carrito de compras del usuario en el lado del cliente.
 *  Persiste el estado en localStorage para que el carrito sobreviva
 *  recargas de página.
 * ═══════════════════════════════════════════════════════════════════
 */
import { useEffect, useState, useCallback } from "react";
import { CartItem } from "@/types";

const STORAGE_KEY = "korudeals_cart";

/**
 * Hook personalizado para gestionar el carrito de compras.
 * @returns API del carrito: items, addToCart, removeFromCart, updateQuantity, clearCart, total
 */
export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persistir en localStorage cada vez que cambie el carrito
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  /** Agrega un producto al carrito o suma cantidad si ya existe. */
  const addToCart = useCallback((newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.productId === newItem.productId &&
          i.size === newItem.size &&
          i.color === newItem.color
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      return [...prev, newItem];
    });
  }, []);

  /** Elimina un producto del carrito por su id+talla+color. */
  const removeFromCart = useCallback(
    (productId: string, size: number, color: string) => {
      setItems((prev) =>
        prev.filter(
          (i) =>
            !(i.productId === productId && i.size === size && i.color === color)
        )
      );
    },
    []
  );

  /** Actualiza la cantidad de un item específico. */
  const updateQuantity = useCallback(
    (productId: string, size: number, color: string, quantity: number) => {
      if (quantity < 1) return;
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && i.size === size && i.color === color
            ? { ...i, quantity }
            : i
        )
      );
    },
    []
  );

  /** Vacía completamente el carrito. */
  const clearCart = useCallback(() => setItems([]), []);

  /** Subtotal calculado a partir de los items. */
  const subtotal = items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0);

  /** Costo de envío: gratis si compra > $1500 */
  const shippingCost = subtotal >= 1500 || subtotal === 0 ? 0 : 99;

  /** Total final con envío. */
  const total = subtotal + shippingCost;

  /** Cantidad total de items en el carrito. */
  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0);

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    shippingCost,
    total,
    itemCount
  };
};
