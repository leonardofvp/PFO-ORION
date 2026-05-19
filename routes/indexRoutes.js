// Manejador de las rutas del index

import express from "express";
import Usuario from "../models/Usuario.js"
const router = express.Router();

router.get("/", (req, res) =>{
    res.render("index" , {
        usuarioLogueado: !!global.usuarioLogueado,
        usuario: global.usuarioLogueado
    });
});

export default router;