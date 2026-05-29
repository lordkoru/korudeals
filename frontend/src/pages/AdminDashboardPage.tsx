/**
 * Panel de administración - gestión de productos y pedidos.
 * Solo accesible para usuarios con rol 'administrador'.
 */
import { useState } from "react";
import { useGetProducts, useCreateProduct, useDeleteProduct } from "@/api/ProductApi";
import { useGetAllOrders, useUpdateOrderStatus } from "@/api/OrderApi";
import { useGetMyUser } from "@/api/UserApi";
import { formatPrice, formatDate } from "@/lib/utils";
import { toast } from "sonner";
import { Trash2, Plus, Package, ShoppingBag } from "lucide-react";

const AdminDashboardPage = () => {
  const [tab, setTab] = useState<"products" | "orders">("products");
  const { data: user } = useGetMyUser();

  if (user && user.role !== "administrador") {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600">Acceso denegado</h2>
        <p className="text-gray-600 mt-2">Esta sección es solo para administradores.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold text-koru-900 mb-2">
        Panel de Administración
      </h1>
      <p className="text-gray-600 mb-6">Gestiona productos y pedidos de KoruDeals</p>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-koru-100 mb-6">
        <button
          onClick={() => setTab("products")}
          className={`flex items-center gap-2 px-4 py-2 font-medium border-b-2 transition ${
            tab === "products"
              ? "border-koru-600 text-koru-700"
              : "border-transparent text-gray-600 hover:text-koru-600"
          }`}
        >
          <ShoppingBag className="w-4 h-4" /> Productos
        </button>
        <button
          onClick={() => setTab("orders")}
          className={`flex items-center gap-2 px-4 py-2 font-medium border-b-2 transition ${
            tab === "orders"
              ? "border-koru-600 text-koru-700"
              : "border-transparent text-gray-600 hover:text-koru-600"
          }`}
        >
          <Package className="w-4 h-4" /> Pedidos
        </button>
      </div>

      {tab === "products" ? <ProductsPanel /> : <OrdersPanel />}
    </div>
  );
};

/** Sub-componente: gestión de productos */
const ProductsPanel = () => {
  const [showForm, setShowForm] = useState(false);
  const { data, isLoading } = useGetProducts({ limit: 50 });
  const createProduct = useCreateProduct();
  const deleteProduct = useDeleteProduct();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    description: "",
    price: 0,
    sizes: "25,26,27",
    colors: "Negro,Blanco",
    stock: 10,
    imageUrl: "https://placehold.co/400x400/d97338/fff?text=Tenis",
    category: "casual"
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createProduct.mutate(
      {
        name: form.name,
        brand: form.brand,
        description: form.description,
        price: Number(form.price),
        sizes: form.sizes.split(",").map((s) => Number(s.trim())),
        colors: form.colors.split(",").map((c) => c.trim()),
        stock: Number(form.stock),
        imageUrl: form.imageUrl,
        category: form.category as any
      },
      {
        onSuccess: () => {
          toast.success("Producto creado");
          setShowForm(false);
          setForm({ ...form, name: "", brand: "", description: "" });
        },
        onError: () => toast.error("Error al crear producto")
      }
    );
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar este producto del catálogo?")) return;
    deleteProduct.mutate(id, {
      onSuccess: () => toast.success("Producto eliminado"),
      onError: () => toast.error("Error al eliminar")
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Productos del catálogo</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Nuevo producto
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="card p-6 mb-6 grid md:grid-cols-2 gap-3">
          <input className="input-field" placeholder="Nombre" required value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="input-field" placeholder="Marca" required value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })} />
          <textarea className="input-field md:col-span-2" placeholder="Descripción" required
            value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input className="input-field" type="number" placeholder="Precio" required value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
          <input className="input-field" type="number" placeholder="Stock" required value={form.stock}
            onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} />
          <input className="input-field" placeholder="Tallas (separadas por coma)" required
            value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} />
          <input className="input-field" placeholder="Colores (separados por coma)" required
            value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} />
          <input className="input-field md:col-span-2" placeholder="URL de imagen" required
            value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
          <select className="input-field" value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option value="casual">Casual</option>
            <option value="deportivo">Deportivo</option>
            <option value="urbano">Urbano</option>
            <option value="running">Running</option>
            <option value="skate">Skate</option>
          </select>
          <button type="submit" className="btn-primary md:col-span-2" disabled={createProduct.isPending}>
            {createProduct.isPending ? "Creando..." : "Guardar producto"}
          </button>
        </form>
      )}

      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-koru-100">
              <tr>
                <th className="text-left p-3">Producto</th>
                <th className="text-left p-3">Marca</th>
                <th className="text-left p-3">Precio</th>
                <th className="text-left p-3">Stock</th>
                <th className="text-left p-3">Reseñas</th>
                <th className="text-right p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((p) => (
                <tr key={p._id} className="border-t border-koru-50">
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3 text-gray-600">{p.brand}</td>
                  <td className="p-3">{formatPrice(p.price)}</td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3">⭐ {p.averageRating.toFixed(1)} ({p.reviewCount})</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/** Sub-componente: gestión de pedidos */
const OrdersPanel = () => {
  const { data: orders, isLoading } = useGetAllOrders();
  const updateStatus = useUpdateOrderStatus();

  const handleUpdateStatus = (id: string, status: string) => {
    updateStatus.mutate({ id, status }, {
      onSuccess: () => toast.success("Estado actualizado"),
      onError: () => toast.error("Error al actualizar")
    });
  };

  if (isLoading) return <p>Cargando pedidos...</p>;
  if (!orders || orders.length === 0) {
    return <p className="text-center py-12 text-gray-500">No hay pedidos registrados.</p>;
  }

  return (
    <div className="space-y-4">
      {orders.map((order: any) => (
        <div key={order._id} className="card p-4">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <p className="font-mono text-xs text-gray-500">#{order._id.slice(-8).toUpperCase()}</p>
              <p className="font-semibold">{order.user?.name || "Usuario"}</p>
              <p className="text-sm text-gray-600">{order.user?.email}</p>
              <p className="text-xs text-gray-500 mt-1">{formatDate(order.createdAt)}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg text-koru-700">{formatPrice(order.total)}</p>
              <p className="text-xs text-gray-500">{order.items.length} producto(s)</p>
            </div>
            <select
              value={order.status}
              onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
              className="input-field max-w-[180px]"
            >
              <option value="pendiente">Pendiente</option>
              <option value="pagado">Pagado</option>
              <option value="enviado">Enviado</option>
              <option value="entregado">Entregado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboardPage;
