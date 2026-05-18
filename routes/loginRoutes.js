// Manejador de las rutas del login

import express from "express";
const router = express.Router();

import {
    formularioLogin,
	obtenerUsuario
} from "../controllers/loginController.js";

router.get("/", formularioLogin);
router.post("/", obtenerUsuario);

export default router;
