/**
 * Página de historial de pedidos del usuario.
 */
import { useGetMyOrders } from "@/api/OrderApi";
import { formatPrice, formatDate } from "@/lib/utils";
import { Package, Clock, Truck, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const statusConfig: Record<string, { label: string; color: string; Icon: any }> = {
  pendiente: { label: "Pendiente de pago", color: "bg-amber-100 text-amber-800", Icon: Clock },
  pagado:    { label: "Pagado",            color: "bg-blue-100 text-blue-800",   Icon: CheckCircle2 },
  enviado:   { label: "En camino",         color: "bg-purple-100 text-purple-800", Icon: Truck },
  entregado: { label: "Entregado",         color: "bg-green-100 text-green-800", Icon: CheckCircle2 },
  cancelado: { label: "Cancelado",         color: "bg-red-100 text-red-800",     Icon: XCircle }
};

const OrdersPage = () => {
  const { data: orders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-koru-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="font-display text-2xl font-bold text-gray-700">Aún no tienes pedidos</h2>
        <p className="text-gray-500 mt-2">¡Empieza a comprar tus tenis ideales!</p>
        <Link to="/catalog" className="btn-primary inline-block mt-6">
          Ver Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold text-koru-900 mb-6">Mis pedidos</h1>

      <div className="space-y-4">
        {orders.map((order) => {
          const cfg = statusConfig[order.status];
          return (
            <div key={order._id} className="card p-6">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Pedido</p>
                  <p className="font-mono text-sm font-semibold">#{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(order.createdAt)}</p>
                </div>
                <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${cfg.color}`}>
                  <cfg.Icon className="w-4 h-4" />
                  {cfg.label}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-2 mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>
                      <span className="font-medium">{item.quantity}×</span> {item.name}
                      <span className="text-gray-500"> · Talla {item.size}, {item.color}</span>
                    </span>
                    <span className="font-medium">{formatPrice(item.unitPrice * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-koru-100 pt-3 flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Envío a: {order.shippingAddress.city}, {order.shippingAddress.country}
                </p>
                <p className="font-bold text-lg text-koru-700">{formatPrice(order.total)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersPage;
