// Controller de subcontratistas, aca van las funciones para el CRUD de las subcontratistas
import { leerArchivo, escribirArchivo } from "../utils/jsonHelper.js";

import Subcontratista from "../models/Subcontratista.js";
import { validationResult } from "express-validator";

// CRUD
const obtenerSubcontratistasJson = (req, res) => {
  const subcontratistas = leerArchivo("subcontratistas.json");
  res.json(subcontratistas);
};

const obtenerSubcontratistas = async (req, res, next) => {
  try {
    const subcontratistasActivos = await Subcontratista.find({
      estado: { $ne: "eliminado" },
    });
    res.status(200).render("subcontratistas", { subcontratistasActivos });
  } catch (error) {
    next(error);
  }
};

const obtenerSubcontratistaPorId = async (req, res, next) => {
  try {
    const subcontratista = await Subcontratista.findById(req.params.id);

    if (!subcontratista || subcontratista.estado === "eliminado") {
      const error = new Error("Subcontratista no encontrado");
      error.status = 404;
      return next(error);
    }

    res.status(200).render("detalle-subcontratista", { subcontratista });
  } catch (error) {
    next(error);
  }
};

const formularioCrearSubcontratista = (req, res) => {
  res.render("formulario-subcontratista", {
    editable: false,
    subcontratista: {},
  });
};

const crearSubcontratista = async (req, res, next) => {
  try {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.render("formulario-subcontratista", {
        editable: false,
        subcontratista: { ...req.body },
        errores: errores.array(),
      });
    }

    const nuevaSubcontratista = new Subcontratista(req.body);
    await nuevaSubcontratista.save();
    res.redirect(303, "/subcontratistas");
  } catch (error) {
    next(error);
  }
};

const formularioEditarSubcontratista = async (req, res, next) => {
  try {
    const subcontratista = await Subcontratista.findById(req.params.id);

    if (!subcontratista || subcontratista.estado === "eliminado") {
      const error = new Error("Subcontratista no encontrado");
      error.status = 404;
      return next(error);
    }

    res.render("formulario-subcontratista", {
      editable: true,
      subcontratista: subcontratista,
    });
  } catch (error) {
    next(error);
  }
};

const editarSubcontratista = async (req, res, next) => {
  try {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.render("formulario-subcontratista", {
        editable: true,
        subcontratista: { ...req.body, id: req.params.id },
        errores: errores.array(),
      });
    }

    const subcontratista = await Subcontratista.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    if (!subcontratista) {
      const error = new Error("Subcontratista no encontrado");
      error.status = 404;
      return next(error);
    }

    res.redirect(303, `/subcontratistas/detalle-subcontratista/${subcontratista.id}`);
  } catch (error) {
    next(error);
  }
};

const eliminarSubcontratista = async (req, res, next) => {
  try {
    const subcontratista = await Subcontratista.findByIdAndUpdate(
      req.params.id,
      { estado: "eliminado" },
      { returnDocument: "after" },
    );

    if (!subcontratista) {
      const error = new Error("Subcontratista no encontrado");
      error.status = 404;
      return next(error);
    }

    res.redirect(303, `/subcontratistas`);
  } catch (error) {
    next(error);
  }
};

export {
  obtenerSubcontratistas,
  obtenerSubcontratistaPorId,
  formularioCrearSubcontratista,
  crearSubcontratista,
  formularioEditarSubcontratista,
  editarSubcontratista,
  eliminarSubcontratista,
};
