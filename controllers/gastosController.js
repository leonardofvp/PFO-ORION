// Controller de gastos, aca van las funciones para el CRUD de las gastos
import { leerArchivo, escribirArchivo } from "../utils/jsonHelper.js";

import Gasto from "../models/Gasto.js";
import Obra from "../models/Obra.js";
import { validationResult } from "express-validator";

// CRUD
const obtenerGastosJson = (req, res) => {
  const gastos = leerArchivo("gastos.json");
  res.json(gastos);
};

const obtenerGastos = async (req, res, next) => {
  try {
    const gastosActivos = await Gasto.find({
      estado: { $ne: "eliminado" },
    }).populate("idObra");

    res.status(200).render("gastos", { gastosActivos });
  } catch (error) {
    next(error);
  }
};

const obtenerGastoPorId = async (req, res, next) => {
  try {
    const gasto = await Gasto.findById(req.params.id).populate("idObra");

    if (!gasto || gasto.estado === "eliminado") {
      const error = new Error("Gasto no encontrado");
      error.status = 404;
      return next(error);
    }

    res.status(200).render("detalle-gasto", { gasto });
  } catch (error) {
    next(error);
  }
};

const formularioCrearGasto = async (req, res, next) => {
  try {
    const obras = await Obra.find({ estado: { $ne: "eliminado" } });

    res.render("formulario-gasto", {
      editable: false,
      gasto: {},
      obras,
    });
  } catch (error) {
    next(error);
  }
};

const crearGasto = async (req, res, next) => {
  try {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      const obras = await Obra.find({ estado: { $ne: "eliminado" } });
      return res.render("formulario-gasto", {
        editable: false,
        gasto: {},
        obras,
        errores: errores.array(),
      });
    }

    const nuevaGasto = new Gasto(req.body);
    await nuevaGasto.save();

    res.redirect(303, "/gastos");
  } catch (error) {
    next(error);
  }
};

const formularioEditarGasto = async (req, res, next) => {
  try {
    const gasto = await Gasto.findById(req.params.id).populate("idObra");

    if (!gasto || gasto.estado === "eliminado") {
      const error = new Error("Gasto no encontrado");
      error.status = 404;
      return next(error);
    }

    res.render("formulario-gasto", {
      editable: true,
      gasto: gasto,
      obras: {},
    });
  } catch (error) {
    next(error);
  }
};

const editarGasto = async (req, res, next) => {
  try {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      const obraOriginal = await Obra.findById(req.body.idObra);

      return res.render("formulario-gasto", {
        editable: true,
        gasto: {
          ...req.body,
          id: req.params.id,
          idObra: {
            id: obraOriginal._id,
            nombre: obraOriginal.nombre
          }
        },
        errores: errores.array(),
      });
    }

    const gasto = await Gasto.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });

    if (!gasto) {
      const error = new Error("Gasto no encontrado");
      error.status = 404;
      return next(error);
    }

    res.redirect(303, `/gastos/detalle-gasto/${gasto.id}`);
  } catch (error) {
    next(error);
  }
};

const eliminarGasto = async (req, res, next) => {
  try {
    const gasto = await Gasto.findByIdAndUpdate(
      req.params.id,
      { estado: "eliminado" },
      { returnDocument: "after" },
    );

    if (!gasto) {
      const error = new Error("Gasto no encontrado");
      error.status = 404;
      return next(error);
    }

    res.redirect(303, `/gastos`);
  } catch (error) {
    next(error);
  }
};

export {
  obtenerGastos,
  obtenerGastoPorId,
  formularioCrearGasto,
  crearGasto,
  formularioEditarGasto,
  editarGasto,
  eliminarGasto,
};
