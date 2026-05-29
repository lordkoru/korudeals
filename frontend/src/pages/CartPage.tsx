/**
 * Página del carrito de compras.
 * Muestra los items agregados y un resumen del pedido.
 */
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart, Plus, Minus } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { useAuth0 } from "@auth0/auth0-react";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, subtotal, shippingCost, total } = useCart();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  /** Procede al checkout (login si no está autenticado). */
  const handleCheckout = () => {
    if (!isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: "/checkout" }
      });
      return;
    }
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="font-display text-2xl font-bold text-gray-700">Tu carrito está vacío</h2>
        <p className="text-gray-500 mt-2">¡Agrega algunos tenis para empezar!</p>
        <Link to="/catalog" className="btn-primary inline-block mt-6">
          Ver Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold text-koru-900 mb-6">Tu carrito</h1>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        {/* Lista de items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.size}-${item.color}`}
              className="card p-4 flex gap-4"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg bg-koru-100"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/96x96/d97338/fff?text=👟";
                }}
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  Talla {item.size} · Color {item.color}
                </p>
                <p className="font-bold text-koru-700 mt-1">
                  {formatPrice(item.unitPrice)}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.size, item.color, item.quantity - 1)
                      }
                      className="w-8 h-8 rounded-lg border border-koru-200 hover:bg-koru-50 flex items-center justify-center"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.size, item.color, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded-lg border border-koru-200 hover:bg-koru-50 flex items-center justify-center"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId, item.size, item.color)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <aside className="card p-6 h-fit sticky top-24">
          <h3 className="font-display text-xl font-bold text-koru-900 mb-4">
            Resumen del pedido
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Envío</span>
              <span className="font-medium">
                {shippingCost === 0 ? (
                  <span className="text-green-600">Gratis</span>
                ) : (
                  formatPrice(shippingCost)
                )}
              </span>
            </div>
            {shippingCost > 0 && (
              <p className="text-xs text-koru-600 italic">
                Te faltan {formatPrice(1500 - subtotal)} para envío gratis
              </p>
            )}
            <div className="border-t border-koru-100 pt-3 mt-3 flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold text-xl text-koru-700">{formatPrice(total)}</span>
            </div>
          </div>
          <button onClick={handleCheckout} className="btn-primary w-full mt-6">
            {isAuthenticated ? "Proceder al pago" : "Inicia sesión para continuar"}
          </button>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
