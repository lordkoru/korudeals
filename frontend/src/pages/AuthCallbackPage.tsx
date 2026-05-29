import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useCreateMyUser } from "@/api/UserApi";
import { AuthReturnToState, sanitizeAuthReturnTo } from "@/auth/navigation";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading, isAuthenticated, error } = useAuth0();
  const { mutateAsync: createUser } = useCreateMyUser();
  const hasCreated = useRef(false);
  const [callbackError, setCallbackError] = useState<string | null>(null);
  const returnTo = sanitizeAuthReturnTo(
    (location.state as AuthReturnToState | null)?.returnTo
  );

  useEffect(() => {
    // Esperar a que Auth0 termine de cargar
    if (isLoading) return;

    if (error) {
      setCallbackError(error.message);
      return;
    }

    // Si no está autenticado, mostrar el problema en lugar de ocultarlo.
    if (!isAuthenticated || !user?.sub || !user?.email) {
      setCallbackError("Auth0 no devolvió una sesión autenticada.");
      return;
    }

    // Crear usuario solo una vez
    if (!hasCreated.current) {
      hasCreated.current = true;
      createUser({ auth0Id: user.sub, email: user.email })
        .then(() => navigate(returnTo, { replace: true }))
        .catch((err) => {
          console.error("Error creando usuario:", err);
          setCallbackError(
            "Tu sesión de Auth0 inició, pero no se pudo crear o sincronizar tu usuario."
          );
        });
    }
  }, [user, isLoading, isAuthenticated, error, createUser, navigate, returnTo]);

  if (callbackError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <h1 className="font-display text-2xl font-bold text-koru-900">
            No se pudo completar el inicio de sesión
          </h1>
          <p className="text-gray-600">{callbackError}</p>
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
        <p className="text-gray-600">Iniciando sesión...</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
