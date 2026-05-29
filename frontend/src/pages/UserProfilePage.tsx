/**
 * Página de perfil de usuario para editar la información personal.
 */
import { useEffect, useState } from "react";
import { useGetMyUser, useUpdateMyUser } from "@/api/UserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { Save, User as UserIcon } from "lucide-react";

const UserProfilePage = () => {
  const { user: auth0User } = useAuth0();
  const { data: dbUser, isLoading } = useGetMyUser();
  const updateUser = useUpdateMyUser();

  const [form, setForm] = useState({
    name: "",
    addressLine1: "",
    city: "",
    country: ""
  });

  // Sincronizar datos cuando lleguen de la BD
  useEffect(() => {
    if (dbUser) {
      setForm({
        name: dbUser.name || "",
        addressLine1: dbUser.addressLine1 || "",
        city: dbUser.city || "",
        country: dbUser.country || ""
      });
    }
  }, [dbUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser.mutate(form, {
      onSuccess: () => toast.success("Perfil actualizado"),
      onError: () => toast.error("Error al actualizar el perfil")
    });
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center">Cargando perfil...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-koru-900 mb-6">Mi perfil</h1>

      <div className="card p-6 mb-6 flex items-center gap-4">
        <div className="bg-koru-200 p-4 rounded-full">
          <UserIcon className="w-8 h-8 text-koru-700" />
        </div>
        <div>
          <p className="font-semibold text-lg text-koru-900">{auth0User?.name}</p>
          <p className="text-sm text-gray-600">{auth0User?.email}</p>
          <p className="text-xs text-koru-600 mt-1 capitalize">
            Rol: {dbUser?.role || "cliente"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        <h2 className="font-semibold text-lg">Datos personales y dirección</h2>

        <div>
          <label className="text-sm font-medium text-gray-700">Nombre completo</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-field"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Dirección</label>
          <input
            type="text"
            required
            value={form.addressLine1}
            onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
            className="input-field"
            placeholder="Calle, número, colonia"
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
            />
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

        <button
          type="submit"
          disabled={updateUser.isPending}
          className="btn-primary inline-flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {updateUser.isPending ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
};

export default UserProfilePage;
