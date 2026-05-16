// Manejador de las rutas de los usuarios

const express = require("express");
const router = express.Router();
const { verificarRol } = require("../middlewares/auth");
const ROLES = require('../utils/roles');

const {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    formularioCrearUsuario,
    crearUsuario,
    formularioEditarUsuario,
    editarUsuario,
    eliminarUsuario
} = require("../controllers/usuariosController");

router.use(verificarRol([ROLES.ADMIN.id]));

router.get("/", obtenerUsuarios);
router.get("/detalle-usuario/:id", obtenerUsuarioPorId);
router.get("/nueva-usuario", formularioCrearUsuario);
router.post("/nuevo-usuario", crearUsuario);
router.get("/editar-usuario/:id", formularioEditarUsuario);
router.put("/editar-usuario/:id", editarUsuario);
router.delete("/eliminar-usuario/:id", eliminarUsuario);

module.exports = router;