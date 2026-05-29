import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    port: 5173,
    // Configuración HTTPS para integración con Auth0.
    // Coloca los archivos private.key y certificate.crt en la carpeta frontend.
    // Si aún no los tienes, comenta toda la sección 'https'.
    ...(fs.existsSync("./private.key") && fs.existsSync("./certificate.crt")
      ? {
          https: {
            key: fs.readFileSync("./private.key"),
            cert: fs.readFileSync("./certificate.crt")
          }
        }
      : {})
  }
});
