/**
 * Provider de Auth0 que se conecta con React Router para manejar
 * el callback de autenticación correctamente.
 */
import { Auth0Provider, AppState } from "@auth0/auth0-react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { sanitizeAuthReturnTo } from "./navigation";

type Props = { children: ReactNode };

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId || !redirectUri || !audience) {
    console.error("Auth0: faltan variables de entorno. Revisa el archivo .env");
  }

  /** Callback que se ejecuta al regresar del flujo de Auth0. */
  const onRedirectCallback = (appState?: AppState) => {
    navigate("/auth-callback", {
      replace: true,
      state: { returnTo: sanitizeAuthReturnTo(appState?.returnTo) }
    });
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
