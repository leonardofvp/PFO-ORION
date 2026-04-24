require("dotenv").config();

const methodOverride = require('method-override');
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const indexRoutes = require("./routes/indexRoutes");
const obrasRoutes = require("./routes/obrasRoutes");
const gastosRoutes = require("./routes/gastosRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "pug");
app.set("views", "./views");

app.use("/", indexRoutes);
app.use("/obras", obrasRoutes);
app.use("/gastos", gastosRoutes);

// Se guarda la ejecución en la constante server
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Para ver posibles errores
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`El puerto ${PORT} ya está siendo usado por otro programa.`);
    } else {
        console.error('Error inesperado en el servidor:', err);
    }
});