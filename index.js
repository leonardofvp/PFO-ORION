import express from "express";
import dotenv from "dotenv";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import indexRoutes from "./routes/indexRoutes.js";
import obrasRoutes from "./routes/obrasRoutes.js";
import subcontratistasRoutes from "./routes/subcontratistasRoutes.js";
import gastosRoutes from "./routes/gastosRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import certificacionesAvaceRoutes from "./routes/certificacionesAvaceRoutes.js";
import pedidosRoutes from "./routes/pedidosRoutes.js";
import { conectarDB } from "./config/db.js";
import ROLES from "./utils/roles.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import chatInstitucionalRoutes from "./routes/chatInstitucionalRoutes.js";
import { cargarUsuario } from "./middlewares/autenticacionMiddleware.js";
import { createServer } from "http";
import { Server } from "socket.io";
import configurarChat from "./sockets/chatInstitucional.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);
const io = new Server(httpServer);

configurarChat(io);

app.locals.ROLES = ROLES;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser());

app.set("view engine", "pug");
app.set("views", "./views");

app.use(cargarUsuario);
app.use("/", indexRoutes);
app.use("/obras", obrasRoutes);
app.use("/subcontratistas", subcontratistasRoutes);
app.use("/certificaciones-avance", certificacionesAvaceRoutes);
app.use("/gastos", gastosRoutes);
app.use("/login", loginRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/pedidos", pedidosRoutes);
app.use("/chat-institucional", chatInstitucionalRoutes);

app.use((req, res, next) => {
  console.log("Ruta no encontrada:", req.originalUrl);
  const error = new Error("La página solicitada no existe.");
  error.status = 404;
  next(error);
});

app.use(errorHandler);

try {
  await conectarDB();
  console.log("Conexión a la base de datos establecida.");
} catch (error) {
  console.error("Error al iniciar la base de datos:", error);
}

const server = httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`El puerto ${PORT} ya está siendo usado por otro programa.`);
  } else {
    console.error("Error inesperado en el servidor:", err);
  }
});