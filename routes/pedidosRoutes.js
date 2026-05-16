// Manejador de las rutas de los pedidos

const express = require("express");
const router = express.Router();
const { verificarRol } = require("../middlewares/auth");
const ROLES = require('../utils/roles');

const {
    obtenerPedidos,
    obtenerPedidoPorId,
    formularioCrearPedido,
    crearPedido,
    formularioEditarPedido,
    editarPedido,
    eliminarPedido
} = require("../controllers/pedidosController");

router.use(verificarRol([ROLES.ADMIN.id, ROLES.DIRECTOR_OBRA.id, ROLES.CAPATAZ.id]));

router.get("/", obtenerPedidos);
router.get("/detalle-pedido/:id", obtenerPedidoPorId);
router.get("/nuevo-pedido", formularioCrearPedido);
router.post("/nuevo-pedido", crearPedido);
router.get("/editar-pedido/:id", formularioEditarPedido);
router.put("/editar-pedido/:id", editarPedido);
router.delete("/eliminar-pedido/:id", eliminarPedido);

module.exports = router;