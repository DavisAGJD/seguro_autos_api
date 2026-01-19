import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

// Importar middlewares
import {
  notFound,
  errorHandler,
  requestLogger,
} from "./middlewares/error.middleware.js";

// Importar rutas
import estadisticasRoutes from "./routes/estadisticas.routes.js";
import personasRoutes from "./routes/personas.routes.js";
import polizasRoutes from "./routes/polizas.routes.js";

// Cargar variables de entorno
dotenv.config();

// Crear instancia de Express
const app = express();

// ========================
// Middlewares globales
// ========================

// CORS - Permitir peticiones de otros orígenes
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  }),
);

// Body Parser - Parsear JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan - Logger de HTTP requests (solo en desarrollo)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Logger personalizado
app.use(requestLogger);

// ========================
// Rutas
// ========================

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API de Seguro de Autos",
    version: "1.0.0",
    endpoints: {
      estadisticas: "/api/estadisticas",
      personas: "/api/personas",
      polizas: "/api/polizas",
    },
    documentation: {
      estadisticas: {
        resumen: "GET /api/estadisticas/resumen",
        total_accidentes: "GET /api/estadisticas/accidentes/total",
        total_infracciones: "GET /api/estadisticas/infracciones/total",
        horas_accidentes: "GET /api/estadisticas/accidentes/horas",
        municipios_accidentes: "GET /api/estadisticas/accidentes/municipios",
        mayor_indice: "GET /api/estadisticas/personas/mayor-indice?limit=10",
        menor_indice: "GET /api/estadisticas/personas/menor-indice?limit=10",
      },
      personas: {
        listar: "GET /api/personas",
        obtener: "GET /api/personas/:id",
        historial: "GET /api/personas/:id/historial",
        crear: "POST /api/personas",
        actualizar: "PUT /api/personas/:id",
        eliminar: "DELETE /api/personas/:id",
      },
      polizas: {
        listar: "GET /api/polizas",
        activas: "GET /api/polizas/activas",
        obtener: "GET /api/polizas/:id",
        crear: "POST /api/polizas",
        actualizar: "PUT /api/polizas/:id",
        eliminar: "DELETE /api/polizas/:id",
      },
    },
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// Montar rutas de la API
app.use("/api/estadisticas", estadisticasRoutes);
app.use("/api/personas", personasRoutes);
app.use("/api/polizas", polizasRoutes);

// ========================
// Manejo de errores
// ========================

// 404 - Ruta no encontrada
app.use(notFound);

// Error handler global
app.use(errorHandler);

export default app;
