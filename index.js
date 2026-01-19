import app from "./src/app.js";
import { testConnection } from "./src/config/database.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    console.log("Probando conexión a la base de datos...");
    const isConnected = await testConnection();

    if (!isConnected) {
      console.error(
        "No se pudo conectar a la base de datos. Verifica tu configuración en .env",
      );
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log("\n" + "=".repeat(50));
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

process.on("unhandledRejection", (err) => {
  console.error("Error no manejado:", err);
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM recibido, cerrando servidor...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("\n SIGINT recibido, cerrando servidor...");
  process.exit(0);
});

startServer();
