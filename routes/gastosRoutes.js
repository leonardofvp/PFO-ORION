// Manejador de las rutas de los gastos

const express = require("express");
const router = express.Router();
const { verificarRol } = require("../middlewares/auth");
const ROLES = require('../utils/roles');

const {
    obtenerGastos,
    obtenerGastoPorId,
    formularioCrearGasto,
    crearGasto,
    formularioEditarGasto,
    editarGasto,
    eliminarGasto
} = require("../controllers/gastosController");

router.use(verificarRol([ROLES.ADMIN.id, ROLES.ADMINISTRACION_CENTRAL.id]));

router.get("/", obtenerGastos);
router.get("/detalle-gasto/:id", obtenerGastoPorId);
router.get("/nuevo-gasto", formularioCrearGasto);
router.post("/nuevo-gasto", crearGasto);
router.get("/editar-gasto/:id", formularioEditarGasto);
router.put("/editar-gasto/:id", editarGasto);
router.delete("/eliminar-gasto/:id", eliminarGasto);

module.exports = router;