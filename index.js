require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const obrasRoutes = require("./routes/obrasRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", "./views");


app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
