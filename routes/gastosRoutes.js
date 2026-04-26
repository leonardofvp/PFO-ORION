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

<<<<<<< HEAD
router.get("/", obtenerGastosJson);
router.get("/:id", obtenerGastoPorId);
router.post("/", crearGasto);
router.put("/:id", editarGasto);
router.delete("/:id", eliminarGasto);

=======
router.get("/", obtenerGastos);
router.get("/detalle-gasto/:id", obtenerGastoPorId);
router.get("/nuevo-gasto", formularioCrearGasto);
router.post("/nuevo-gasto", crearGasto);
router.get("/editar-gasto/:id", formularioEditarGasto);
router.put("/editar-gasto/:id", editarGasto);
router.delete("/eliminar-gasto/:id", eliminarGasto);
>>>>>>> 16db6f239b37aaba7326c782df502544f4cc8586

module.exports = router;