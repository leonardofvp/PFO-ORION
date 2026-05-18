// Manejador de las rutas de los pedidos

import express from "express";
import { verificarRol } from "../middlewares/auth.js";
import ROLES from '../utils/roles.js';
import {
    obtenerPedidos,
    obtenerPedidoPorId,
    formularioCrearPedido,
    crearPedido,
    formularioEditarPedido,
    editarPedido,
    eliminarPedido
} from "../controllers/pedidosController.js";

const router = express.Router();
router.use(verificarRol([ROLES.ADMIN.id, ROLES.DIRECTOR_OBRA.id, ROLES.CAPATAZ.id]));

router.get("/", obtenerPedidos);
router.get("/detalle-pedido/:id", obtenerPedidoPorId);
router.get("/nuevo-pedido", formularioCrearPedido);
router.post("/nuevo-pedido", crearPedido);
router.get("/editar-pedido/:id", formularioEditarPedido);
router.put("/editar-pedido/:id", editarPedido);
router.delete("/eliminar-pedido/:id", eliminarPedido);

export default router;