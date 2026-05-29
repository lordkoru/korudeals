/**
 * Página de checkout para finalizar la compra.
 * Captura los datos de envío y el método de pago, luego envía el pedido al backend.
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useCreateOrder } from "@/api/OrderApi";
import { useGetMyUser } from "@/api/UserApi";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, shippingCost, total, clearCart } = useCart();
  const { data: user } = useGetMyUser();
  const createOrder = useCreateOrder();

  const [form, setForm] = useState({
    addressLine1: user?.addressLine1 || "",
    city: user?.city || "",
    country: user?.country || "México",
    zipCode: ""
  });
  const [paymentMethod, setPaymentMethod] = useState<"tarjeta" | "paypal" | "efectivo">("tarjeta");

  /** Maneja el envío del pedido al backend. */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Tu carrito está vacío");
      return;
    }

    createOrder.mutate(
      {
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          size: i.size,
          color: i.color
        })),
        shippingAddress: form,
        paymentMethod
      },
      {
        onSuccess: () => {
          toast.success("¡Pedido realizado con éxito!");
          clearCart();
          setTimeout(() => navigate("/orders"), 1500);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Error al procesar el pedido");
        }
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="font-display text-3xl font-bold text-koru-900 mb-6">Finalizar compra</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_400px] gap-8">
        {/* Formulario */}
        <div className="space-y-6">
          {/* Dirección de envío */}
          <div className="card p-6">
            <h2 className="font-semibold text-lg mb-4">Dirección de envío</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">Calle y número</label>
                <input
                  type="text"
                  required
                  value={form.addressLine1}
                  onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
                  className="input-field"
                  placeholder="Av. López Mateos #123"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Ciudad</label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="input-field"
                    placeholder="Zacatecas"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Código Postal</label>
                  <input
                    type="text"
                    required
                    value={form.zipCode}
                    onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
                    className="input-field"
                    placeholder="98000"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">País</label>
                <input
                  type="text"
                  required
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Método de pago */}
          <div className="card p-6">
            <h2 className="font-semibold text-lg mb-4">Método de pago</h2>
            <div className="space-y-2">
              {[
                { id: "tarjeta", name: "Tarjeta de crédito/débito", icon: "💳" },
                { id: "paypal", name: "PayPal", icon: "🅿️" },
                { id: "efectivo", name: "Pago en efectivo (OXXO)", icon: "💵" }
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition ${
                    paymentMethod === method.id
                      ? "border-koru-600 bg-koru-50"
                      : "border-koru-100 hover:border-koru-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id as any)}
                    className="text-koru-600"
                  />
                  <span className="text-2xl">{method.icon}</span>
                  <span className="font-medium">{method.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Resumen */}
        <aside className="card p-6 h-fit sticky top-24">
          <h3 className="font-display text-xl font-bold text-koru-900 mb-4">Resumen</h3>
          <div className="space-y-2 text-sm mb-4">
            {items.map((i) => (
              <div key={`${i.productId}-${i.size}-${i.color}`} className="flex justify-between">
                <span className="text-gray-700">
                  {i.name} ({i.quantity}×)
                </span>
                <span className="font-medium">{formatPrice(i.unitPrice * i.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-koru-100 pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>{shippingCost === 0 ? "Gratis" : formatPrice(shippingCost)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-koru-100">
              <span>Total</span>
              <span className="text-koru-700">{formatPrice(total)}</span>
            </div>
          </div>
          <button
            type="submit"
            disabled={createOrder.isPending}
            className="btn-primary w-full mt-6 inline-flex items-center justify-center gap-2"
          >
            {createOrder.isPending ? (
              "Procesando..."
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" /> Confirmar pedido
              </>
            )}
          </button>
        </aside>
      </form>
    </div>
  );
};

export default CheckoutPage;
