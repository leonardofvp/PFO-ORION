// Manejador de las rutas de las obras

import express, { Router } from "express";
import { verificarRol } from "../middlewares/auth.js";
import ROLES from '../utils/roles.js';
import {
    obtenerObras,
    obtenerObraPorId,
    formularioCrearObra,
    crearObra,
    formularioEditarObra,
    editarObra,
    eliminarObra,
    renderizarAsignacion,
    asignarPersonal
} from "../controllers/obrasController.js";

const router = express.Router();

router.use(verificarRol([ROLES.ADMIN.id, ROLES.DIRECTOR_GENERAL.id]));

router.get("/", obtenerObras);
router.get("/detalle-obra/:id", obtenerObraPorId);
router.get("/nueva-obra", formularioCrearObra);
router.post("/nueva-obra", crearObra);
router.get("/editar-obra/:id", formularioEditarObra);
router.put("/editar-obra/:id", editarObra);
router.delete("/eliminar-obra/:id", eliminarObra);
router.get("/asignar-personal/:id", renderizarAsignacion);
router.post("/asignar-personal/:id", asignarPersonal);

export default router;