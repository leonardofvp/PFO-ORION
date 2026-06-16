// Manejador de las rutas del login

import express from "express";
const router = express.Router();
import { protegerRuta } from "../middlewares/autenticacionMiddleware.js";

import {
  formularioLogin,
  iniciarSesion,
  cerrarSesion,
} from "../controllers/loginController.js";

router.get("/", formularioLogin);
router.post("/", iniciarSesion);
router.post("/logout", protegerRuta, cerrarSesion);

export default router;
