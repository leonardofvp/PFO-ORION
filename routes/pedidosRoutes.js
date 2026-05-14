// Manejador de las rutas de los pedidos

const express = require("express");
const router = express.Router();
const {
    obtenerPedidos,
    obtenerPedidoPorId,
    formularioCrearPedido,
    crearPedido,
    formularioEditarPedido,
    editarPedido,
    eliminarPedido
} = require("../controllers/pedidosController");

router.get("/", obtenerPedidos);
router.get("/detalle-pedido/:id", obtenerPedidoPorId);
router.get("/nueva-pedido", formularioCrearPedido);
router.post("/nuevo-pedido", crearPedido);
router.get("/editar-pedido/:id", formularioEditarPedido);
router.put("/editar-pedido/:id", editarPedido);
router.delete("/eliminar-pedido/:id", eliminarPedido);

module.exports = router;