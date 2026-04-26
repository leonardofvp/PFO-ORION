// Manejador de las rutas de las obras

const express = require("express");
const router = express.Router();
const {
    obtenerObras,
    obtenerObraPorId,
    formularioCrearObra,
    crearObra,
    formularioEditarObra,
    editarObra,
    eliminarObra
} = require("../controllers/obrasController");

router.get("/", obtenerObras);
router.get("/detalle-obra/:id", obtenerObraPorId);
router.get("/nueva-obra", formularioCrearObra);
router.post("/nueva-obra", crearObra);
router.get("/editar-obra/:id", formularioEditarObra);
router.put("/editar-obra/:id", editarObra);
router.delete("/eliminar-obra/:id", eliminarObra);

module.exports = router;