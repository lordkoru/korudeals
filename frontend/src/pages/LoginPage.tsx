import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DEFAULT_LOGIN_RETURN_TO } from "@/auth/navigation";

const LoginPage = () => {
  const { loginWithRedirect, isAuthenticated, isLoading, error } = useAuth0();
  const navigate = useNavigate();
  const hasStartedLogin = useRef(false);

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      navigate(DEFAULT_LOGIN_RETURN_TO, { replace: true });
      return;
    }

    if (!hasStartedLogin.current && !error) {
      hasStartedLogin.current = true;
      loginWithRedirect({
        appState: { returnTo: DEFAULT_LOGIN_RETURN_TO }
      });
    }
  }, [error, isAuthenticated, isLoading, loginWithRedirect, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <h1 className="font-display text-2xl font-bold text-koru-900">
            No se pudo iniciar sesión
          </h1>
          <p className="text-gray-600">{error.message}</p>
          <button onClick={() => navigate("/", { replace: true })} className="btn-primary">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-koru-300 border-t-koru-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Abriendo inicio de sesión...</p>
      </div>
    </div>
  );
};

export default LoginPage;
