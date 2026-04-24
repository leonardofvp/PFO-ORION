const express = require("express");
const router = express.Router();

const {
    obtenerGastosJson,
    obtenerGastoPorId,
    crearGasto,
    editarGasto,
    eliminarGasto
} = require("../controllers/gastosController");

router.get("/", obtenerGastosJson);
router.get("/:id", obtenerGastoPorId);
router.post("/", crearGasto);
router.put("/modificar/:id", editarGasto);
router.delete("/eliminar/:id", eliminarGasto);


module.exports = router;