const express = require("express");
const router = express.Router();

const {
    obtenerGastos,
    obtenerGastoPorId,
    formularioCrearGasto,
    crearGasto,
    formularioEditarGasto,
    editarGasto,
    eliminarGasto
} = require("../controllers/gastosController");

router.get("/", obtenerGastos);
router.get("/detalle-gasto/:id", obtenerGastoPorId);
router.get("/nuevo-gasto", formularioCrearGasto);
router.post("/nuevo-gasto", crearGasto);
router.get("/editar-gasto/:id", formularioEditarGasto);
router.put("/editar-gasto/:id", editarGasto);
router.delete("/eliminar-gasto/:id", eliminarGasto);

module.exports = router;