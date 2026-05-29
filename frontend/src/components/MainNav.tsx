/**
 * Barra de navegación principal para resoluciones de escritorio.
 */
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { ShoppingCart, User as UserIcon, Package } from "lucide-react";
import { DEFAULT_LOGIN_RETURN_TO } from "@/auth/navigation";

const MainNav = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      appState: { returnTo: DEFAULT_LOGIN_RETURN_TO }
    });
  };

  return (
    <nav className="flex items-center gap-6">
      <Link to="/" className="text-gray-700 hover:text-koru-600 font-medium transition-colors">
        Inicio
      </Link>
      <Link to="/catalog" className="text-gray-700 hover:text-koru-600 font-medium transition-colors">
        Catálogo
      </Link>

      {isAuthenticated && (
        <>
          <Link to="/orders" className="flex items-center gap-1 text-gray-700 hover:text-koru-600 transition-colors">
            <Package className="w-4 h-4" />
            <span>Mis Pedidos</span>
          </Link>
        </>
      )}

      <Link to="/cart" className="relative text-gray-700 hover:text-koru-600 transition-colors">
        <ShoppingCart className="w-5 h-5" />
      </Link>

      {isAuthenticated ? (
        <div className="flex items-center gap-3">
          <Link to="/profile" className="flex items-center gap-2 text-koru-700 font-medium">
            <UserIcon className="w-4 h-4" />
            <span>{user?.name?.split(" ")[0] || "Perfil"}</span>
          </Link>
          <button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            className="text-sm text-gray-600 hover:text-koru-600 transition-colors"
          >
            Salir
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="btn-primary text-sm"
        >
          Iniciar Sesión
        </button>
      )}
    </nav>
  );
};

export default MainNav;
