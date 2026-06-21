// Manejador de las rutas de los certificados de avance

import express from "express";
import { protegerRuta } from "../middlewares/autenticacionMiddleware.js";
import { verificarRol } from "../middlewares/autorizacionMiddleware.js";
import { validarCertificacion } from "../middlewares/validacionMiddleware.js";
import ROLES from "../utils/roles.js";
import {
    obtenerCertificacionesAvance,
    obtenerCertificacionAvancePorId,
    formularioCrearCertificacionAvance,
    crearCertificacionAvance,
    formularioEditarCertificacionAvance,
    editarCertificacionAvance,
    eliminarCertificacionAvance
} from "../controllers/certificacionesAvanceController.js";

const router = express.Router();

router.use(protegerRuta);
router.use(verificarRol([ROLES.ADMIN.id, ROLES.DIRECTOR_GENERAL.id, ROLES.ADMINISTRACION_CENTRAL.id, ROLES.DIRECTOR_OBRA.id]));

router.get("/", obtenerCertificacionesAvance);
router.get("/detalle-certificacion/:id", obtenerCertificacionAvancePorId);
router.get("/nueva-certificacion", formularioCrearCertificacionAvance);
router.post("/nueva-certificacion", validarCertificacion, crearCertificacionAvance);
router.get("/editar-certificacion/:id", formularioEditarCertificacionAvance);
router.put("/editar-certificacion/:id", validarCertificacion, editarCertificacionAvance);
router.delete("/eliminar-certificacion/:id", eliminarCertificacionAvance);

export default router;