// Controller de obras, aca van las funciones para el CRUD de las obras
import { leerArchivo, escribirArchivo } from "../utils/jsonHelper.js";

import Obra from "../models/Obra.js";
import Usuario from "../models/Usuario.js";
import Subcontratista from "../models/Subcontratista.js";
import ROLES from "../utils/roles.js";

// CRUD
const obtenerObrasJson = (req, res) => {
  const obras = leerArchivo("obras.json");
  res.json(obras);
};

const obtenerObras = async (req, res, next) => {
  try {
    const obrasActivas = await Obra.find({ estado: { $ne: "eliminada" } });
    res.status(200).render("obras", { obrasActivas });
  } catch (error) {
    next(error);
  }
};

const obtenerObraPorId = async (req, res, next) => {
  try {
    const obra = await Obra.findById(req.params.id).populate([
      "personalAsignado",
      "subcontratistasAsignados",
    ]);

    if (!obra || obra.estado === "eliminada") {
      const error = new Error("Obra no encontrada");
      error.status = 404;
      return next(error);
    }

    res.status(200).render("detalle-obra", { obra });
  } catch (error) {
    next(error);
  }
};

const formularioCrearObra = (req, res) => {
  res.render(res.locals.vista, {
    editable: false,
    obra: {},
  });
};

const crearObra = async (req, res, next) => {
  try {
    const nuevaObra = new Obra(req.body);
    await nuevaObra.save();
    res.redirect(303, "/obras");
  } catch (error) {
    next(error);
  }
};

const formularioEditarObra = async (req, res, next) => {
  try {
    const obra = await Obra.findById(req.params.id);

    if (!obra || obra.estado === "eliminada") {
      const error = new Error("Obra no encontrada");
      error.status = 404;
      return next(error);
    }

    res.render("formulario-obra", {
      editable: true,
      obra: obra,
    });
  } catch (error) {
    next(error);
  }
};

const editarObra = async (req, res, next) => {
  try {
    const obra = await Obra.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    res.redirect(303, `/obras/detalle-obra/${obra.id}`);
  } catch (error) {
    next(error);
  }
};

const eliminarObra = async (req, res, next) => {
  try {
    const obra = await Obra.findByIdAndUpdate(
      req.params.id,
      { estado: "eliminada" },
      { returnDocument: "after" },
    );

    if (!obra) {
      const error = new Error("Obra no encontrada");
      error.status = 404;
      return next(error);
    }

    res.redirect(303, `/obras`);
  } catch (error) {
    next(error);
  }
};

const renderizarAsignacionPersonal = async (req, res, next) => {
  try {
    const obra = await Obra.findById(req.params.id);
    const usuariosActivos = await Usuario.find({
      _id: { $nin: obra.personalAsignado },
      estado: { $ne: "eliminado" },
      rol: { $nin: [ROLES.ADMIN.id, ROLES.DIRECTOR_GENERAL.id] },
    });
    res.render("asignar-personal", { obra, usuariosActivos });
  } catch (error) {
    next(error);
  }
};

const asignarPersonal = async (req, res, next) => {
  try {
    const idObra = req.params.id;
    const idUsuario = req.body.idUsuario;
    const resultado = await Obra.findByIdAndUpdate(idObra, {
      $addToSet: { personalAsignado: idUsuario },
    });

    if (!resultado) {
      const error = new Error(
        "La obra no existe, no se pudo asignar personal.",
      );
      error.status = 404;
      return next(error);
    }

    res.redirect(303, `/obras/detalle-obra/${idObra}`);
  } catch (error) {
    next(error);
  }
};

const renderizarAsignacionSubcontratista = async (req, res, next) => {
  try {
    const obra = await Obra.findById(req.params.id);
    const subcontratistasActivos = await Subcontratista.find({
      _id: { $nin: obra.subcontratistasAsignados },
      estado: { $ne: "eliminado" },
    });
    res.render("asignar-subcontratista", { obra, subcontratistasActivos });
  } catch (error) {
    next(error);
  }
};

const asignarSubcontratista = async (req, res, next) => {
  try {
    const idObra = req.params.id;
    const idSubcontratista = req.body.idSubcontratista;
    const resultado = await Obra.findByIdAndUpdate(idObra, {
      $addToSet: { subcontratistasAsignados: idSubcontratista },
    });

    if (!resultado) {
      const error = new Error(
        "La obra no existe, no se pudo asignar subcontratista.",
      );
      error.status = 404;
      return next(error);
    }

    res.redirect(303, `/obras/detalle-obra/${idObra}`);
  } catch (error) {
    next(error);
  }
};

export {
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
};
