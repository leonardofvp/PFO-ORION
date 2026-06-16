import express from"express";
import dotenv from "dotenv";
import methodOverride from "method-override";
import indexRoutes from "./routes/indexRoutes.js";
import obrasRoutes from "./routes/obrasRoutes.js";
import subcontratistasRoutes from "./routes/subcontratistasRoutes.js"
import gastosRoutes from "./routes/gastosRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import pedidosRoutes from "./routes/pedidosRoutes.js";
import { conectarDB } from "./config/db.js"
import ROLES from "./utils/roles.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.locals.ROLES = ROLES;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "pug");
app.set("views", "./views");

app.use("/", indexRoutes);
app.use("/obras", obrasRoutes);
app.use("/subcontratistas", subcontratistasRoutes);
app.use("/gastos", gastosRoutes);
app.use("/login", loginRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/pedidos", pedidosRoutes);

// Se guarda la ejecución en la constante server
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

try {
    await conectarDB();
} catch (error) {
    console.error("Error al iniciar:", error);
}

// Para ver posibles errores
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`El puerto ${PORT} ya está siendo usado por otro programa.`);
    } else {
        console.error('Error inesperado en el servidor:', err);
    }
});