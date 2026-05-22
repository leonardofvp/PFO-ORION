// Manejador de las rutas de los subcontratistas

import express from "express";
import { verificarRol } from "../middlewares/auth.js";
import ROLES from '../utils/roles.js';

import {
    obtenerSubcontratistas,
    obtenerSubcontratistaPorId,
    formularioCrearSubcontratista,
    crearSubcontratista,
    formularioEditarSubcontratista,
    editarSubcontratista,
    eliminarSubcontratista
} from "../controllers/subcontratistasController.js";

const router = express.Router();

router.use(verificarRol([ROLES.ADMIN.id, ROLES.DIRECTOR_GENERAL.id]));

router.get("/", obtenerSubcontratistas);
router.get("/detalle-subcontratista/:id", obtenerSubcontratistaPorId);
router.get("/nuevo-subcontratista", formularioCrearSubcontratista);
router.post("/nuevo-subcontratista", crearSubcontratista);
router.get("/editar-subcontratista/:id", formularioEditarSubcontratista);
router.put("/editar-subcontratista/:id", editarSubcontratista);
router.delete("/eliminar-subcontratista/:id", eliminarSubcontratista);

export default router;