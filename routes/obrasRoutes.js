// Manejador de las rutas de las obras

import express, { Router } from "express";
import { protegerRuta } from "../middlewares/autenticacionMiddleware.js";
import { verificarRol } from "../middlewares/autorizacionMiddleware.js";
import ROLES from "../utils/roles.js";
import {
  obtenerObras,
  obtenerObraPorId,
  formularioCrearObra,
  crearObra,
  formularioEditarObra,
  editarObra,
  eliminarObra,
  renderizarAsignacionPersonal,
  asignarPersonal,
  renderizarAsignacionSubcontratista,
  asignarSubcontratista,
} from "../controllers/obrasController.js";

const router = express.Router();

router.use(protegerRuta);
router.use(verificarRol([ROLES.ADMIN.id, ROLES.DIRECTOR_GENERAL.id]));

router.get("/", obtenerObras);
router.get("/detalle-obra/:id", obtenerObraPorId);
router.get("/nueva-obra", formularioCrearObra);
router.post("/nueva-obra", crearObra);
router.get("/editar-obra/:id", formularioEditarObra);
router.put("/editar-obra/:id", editarObra);
router.delete("/eliminar-obra/:id", eliminarObra);
router.get("/asignar-personal/:id", renderizarAsignacionPersonal);
router.post("/asignar-personal/:id", asignarPersonal);
router.get("/asignar-subcontratista/:id", renderizarAsignacionSubcontratista);
router.post("/asignar-subcontratista/:id", asignarSubcontratista);

export default router;
