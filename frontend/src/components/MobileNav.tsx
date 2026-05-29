/**
 * Navegación lateral para dispositivos móviles.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Menu, X, ShoppingCart, Package, User as UserIcon, Home, Grid3x3 } from "lucide-react";
import { DEFAULT_LOGIN_RETURN_TO } from "@/auth/navigation";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const handleLogin = () => {
    setOpen(false);
    loginWithRedirect({
      appState: { returnTo: DEFAULT_LOGIN_RETURN_TO }
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-lg hover:bg-koru-100 transition-colors"
        aria-label="Abrir menú"
      >
        <Menu className="w-6 h-6 text-koru-700" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-6 animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-xl font-bold text-koru-700">Menú</h2>
              <button onClick={() => setOpen(false)} aria-label="Cerrar menú">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-koru-50 transition-colors">
                <Home className="w-5 h-5 text-koru-600" />
                <span>Inicio</span>
              </Link>
              <Link to="/catalog" onClick={() => setOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-koru-50 transition-colors">
                <Grid3x3 className="w-5 h-5 text-koru-600" />
                <span>Catálogo</span>
              </Link>
              <Link to="/cart" onClick={() => setOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-koru-50 transition-colors">
                <ShoppingCart className="w-5 h-5 text-koru-600" />
                <span>Carrito</span>
              </Link>

              {isAuthenticated && (
                <>
                  <Link to="/orders" onClick={() => setOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-koru-50 transition-colors">
                    <Package className="w-5 h-5 text-koru-600" />
                    <span>Mis Pedidos</span>
                  </Link>
                  <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-koru-50 transition-colors">
                    <UserIcon className="w-5 h-5 text-koru-600" />
                    <span>Mi Perfil</span>
                  </Link>
                </>
              )}

              <div className="pt-4 mt-4 border-t border-koru-100">
                {isAuthenticated ? (
                  <>
                    <p className="text-sm text-gray-600 px-3 mb-2">{user?.email}</p>
                    <button
                      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                      className="btn-secondary w-full"
                    >
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <button onClick={handleLogin} className="btn-primary w-full">
                    Iniciar Sesión
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
