// Manejador de las rutas de los usuarios

import express from "express";
import { protegerRuta } from "../middlewares/autenticacionMiddleware.js";
import { verificarRol } from "../middlewares/autorizacionMiddleware.js";
import { validarUsuario } from "../middlewares/validacionMiddleware.js";
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
router.post("/nuevo-usuario", validarUsuario, crearUsuario);

router.use(protegerRuta);

router.get("/detalle-usuario/:id", obtenerUsuarioPorId);
router.get("/editar-usuario/:id", formularioEditarUsuario);
router.put("/editar-usuario/:id", validarUsuario, editarUsuario);

router.use(verificarRol([ROLES.ADMIN.id]));

router.get("/", obtenerUsuarios);
router.delete("/eliminar-usuario/:id", eliminarUsuario);

export default router;