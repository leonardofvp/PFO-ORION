// Manejador de las rutas de los gastos

import express from "express";
import { protegerRuta } from "../middlewares/autenticacionMiddleware.js";
import { verificarRol } from "../middlewares/autorizacionMiddleware.js";
import ROLES from "../utils/roles.js";
import {
    obtenerGastos,
    obtenerGastoPorId,
    formularioCrearGasto,
    crearGasto,
    formularioEditarGasto,
    editarGasto,
    eliminarGasto
} from "../controllers/gastosController.js";

const router = express.Router();

router.use(protegerRuta);
router.use(verificarRol([ROLES.ADMIN.id, ROLES.DIRECTOR_GENERAL.id, ROLES.ADMINISTRACION_CENTRAL.id]));

router.get("/", obtenerGastos);
router.get("/detalle-gasto/:id", obtenerGastoPorId);
router.get("/nuevo-gasto", formularioCrearGasto);
router.post("/nuevo-gasto", crearGasto);
router.get("/editar-gasto/:id", formularioEditarGasto);
router.put("/editar-gasto/:id", editarGasto);
router.delete("/eliminar-gasto/:id", eliminarGasto);

export default router;