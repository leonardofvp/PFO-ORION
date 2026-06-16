// Manejador de las rutas del index

import express from "express";
import Usuario from "../models/Usuario.js";
import { cargarUsuario } from "../middlewares/autenticacionMiddleware.js";
const router = express.Router();

router.get("/", cargarUsuario, (req, res) => {
  res.render("index", {
  });
});

export default router;
