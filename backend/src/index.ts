/**
 * ═══════════════════════════════════════════════════════════════════
 *  Servidor Principal - KoruDeals API
 * ═══════════════════════════════════════════════════════════════════
 *  Punto de entrada del backend. Inicializa Express, conecta a la
 *  base de datos MongoDB Atlas y registra todas las rutas del API.
 *
 *  Stack:
 *    - Node.js + TypeScript
 *    - Express.js (framework web)
 *    - MongoDB + Mongoose (base de datos)
 *    - Auth0 (autenticación JWT)
 *    - CORS (control de orígenes)
 * ═══════════════════════════════════════════════════════════════════
 */
import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

// Importación de las rutas de cada módulo
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

// ─── Conexión a la base de datos ───────────────────────────────────
mongoose
  .connect(process.env.DB_CONNECTION_STRING as string)
  .then(() => console.log("✅ Base de datos conectada correctamente"))
  .catch((error) => {
    console.error("❌ Error al conectar con la base de datos:", error);
    process.exit(1);
  });

// ─── Inicialización de Express ─────────────────────────────────────
const app = express();

// Middleware para parsear JSON en el body de las peticiones
app.use(express.json());

// Middleware de CORS para permitir peticiones desde el frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

/**
 * Endpoint de salud del servidor.
 * Útil para verificar rápidamente que la API está corriendo.
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "KoruDeals API funcionando correctamente",
    timestamp: new Date().toISOString()
  });
});

// ─── Registro de rutas ─────────────────────────────────────────────
app.use("/api/my/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);

// ─── Inicio del servidor ───────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 KoruDeals API corriendo en el puerto: ${PORT}`);
});
