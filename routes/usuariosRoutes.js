// Manejador de las rutas de los usuarios

import express from "express";
import { verificarRol } from "../middlewares/auth.js";
import ROLES from '../utils/roles.js';

import {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    formularioCrearUsuario,
    crearUsuario,
    formularioEditarUsuario,
    editarUsuario,
    eliminarUsuario
} from "../controllers/usuariosController.js";

const router = express.Router();

router.get("/nuevo-usuario", formularioCrearUsuario);
router.post("/nuevo-usuario", crearUsuario);

router.use(verificarRol([ROLES.ADMIN.id]));

router.get("/", obtenerUsuarios);
router.get("/detalle-usuario/:id", obtenerUsuarioPorId);
router.get("/editar-usuario/:id", formularioEditarUsuario);
router.put("/editar-usuario/:id", editarUsuario);
router.delete("/eliminar-usuario/:id", eliminarUsuario);

export default router;