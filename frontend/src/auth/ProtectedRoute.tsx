/**
 * Componente que protege rutas privadas. Si el usuario no está
 * autenticado, inicia el login y conserva la ruta a la que quería entrar.
 */
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getAuthReturnTo } from "./navigation";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: getAuthReturnTo(location) }
      });
    }
  }, [isAuthenticated, isLoading, location, loginWithRedirect]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-koru-300 border-t-koru-600 rounded-full animate-spin" />
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
