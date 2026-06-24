import dotenv from "dotenv";
import app from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { getUri, conectarDB } from "./config/db.js";
import configurarChat from "./sockets/chatInstitucional.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);
const io = new Server(httpServer);

const uri = getUri();

configurarChat(io);

try {
  await conectarDB(uri);
  console.log("Conexión a la base de datos establecida.");

  const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(
        `El puerto ${PORT} ya está siendo usado por otro programa.`,
      );
    } else {
      console.error("Error inesperado en el servidor:", err);
    }
  });
} catch (error) {
  console.error("Error al iniciar la base de datos:", error);
}
