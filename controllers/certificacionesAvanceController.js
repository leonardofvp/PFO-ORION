import CertificacionAvance from "../models/CertificacionAvance.js";
import Obra from "../models/Obra.js";
import Subcontratista from "../models/Subcontratista.js";
import ROLES from "../utils/roles.js";
import { validationResult } from "express-validator";

// CRUD
const obtenerCertificacionesAvance = async (req, res, next) => {
  try {
    const certificacionesAvanceActivas = await CertificacionAvance.find(
      {estado: { $ne: "eliminada" }}
    )
      .populate("idObra")
      .populate("idSubcontratista");

    res.status(200);
    res.render("certificaciones-avance", { certificacionesAvanceActivas });
  } catch (error) {
    next(error);
  }
};

const obtenerCertificacionAvancePorId = async (req, res, next) => {
  try {
    const certificacionAvance = await CertificacionAvance.findById(
      req.params.id,
    )
      .populate("idObra")
      .populate("idSubcontratista")
      .populate("idDirectorObra");

    if (!certificacionAvance || certificacionAvance.estado === "eliminada") {
      const error = new Error("Certificacion no encontrada");
      error.status = 404;
      return next(error);
    }

    res.status(200);
    res.render("detalle-certificacion-avance", { certificacionAvance });
  } catch (error) {
    next(error);
  }
};

const formularioCrearCertificacionAvance = async (req, res, next) => {
  try {
    const obras = await Obra.find({ estado: { $ne: "eliminada" } });
    const subcontratistas = await Subcontratista.find({ estado: "activo" });

    res.render("formulario-certificacion-avance", {
      editable: false,
      certificacionAvance: {},
      obras,
      subcontratistas,
    });
  } catch (error) {
    next(error);
  }
};

const crearCertificacionAvance = async (req, res, next) => {
  try {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      const obras = await Obra.find({ estado: { $ne: "eliminada" } });
      const subcontratistas = await Subcontratista.find({ estado: "activo" });

      return res.render("formulario-certificacion-avance", {
        editable: false,
        certificacionAvance: req.body,
        obras,
        subcontratistas,
        errores: errores.array(),
      });
    }

    const { idObra, idSubcontratista, tareaRealizada, porcentajeAvance } = req.body;

    const valorNuevo = Number(porcentajeAvance);

    const certificacionesPrevias = await CertificacionAvance.find({
      idObra,
      idSubcontratista,
      estado: { $ne: "eliminada" },
    });

    const avanceAcumulado = certificacionesPrevias.reduce(
      (total, cert) => total + Number(cert.porcentajeAvance),
      0,
    );

    if (avanceAcumulado + valorNuevo > 100) {
      const error = new Error(`Error de auditoría: El avance acumulado (${avanceAcumulado}%) superaría el 100% al sumar ${valorNuevo}%.`);
      error.status = 400;
      return next(error);
    }

    const nuevaCertificacionAvance = new CertificacionAvance({
      ...req.body,
      porcentajeAvance: valorNuevo,
      idDirectorObra: req.usuario._id,
    });

    await nuevaCertificacionAvance.save();
    res.redirect(303, "/certificaciones-avance");
  } catch (error) {
    next(error);
  }
};

const formularioEditarCertificacionAvance = async (req, res, next) => {
  try {
    const certificacionAvance = await CertificacionAvance.findById(req.params.id)
      .populate("idObra")
      .populate("idSubcontratista");

    if (!certificacionAvance || certificacionAvance.estado === "eliminada") {
      const error = new Error("Certificación no encontrada");
      error.status = 404;
      return next(error);
    }

    const obras = await Obra.find({ estado: { $ne: "eliminada" } });
    const subcontratistas = await Subcontratista.find({ estado: "activo" });

    res.render("formulario-certificacion-avance", {
      editable: true,
      certificacionAvance,
      obras,
      subcontratistas
    });
  } catch (error) {
    next(error);
  }
};

const editarCertificacionAvance = async (req, res, next) => {
  try {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      const obras = await Obra.find({ estado: { $ne: "eliminada" } });
      const subcontratistas = await Subcontratista.find({ estado: "activo" });

      return res.render("formulario-certificacion-avance", {
        editable: true,
        certificacionAvance: { ...req.body, id: req.params.id },
        obras,
        subcontratistas,
        errores: errores.array(),
      });
    }

    const certificacionAvance = await CertificacionAvance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" },
    );

    if (!certificacionAvance) {
      const error = new Error("Certificación no encontrada");
      error.status = 404;
      return next(error);
    }

    res.redirect(
      303,
      `/certificaciones-avance/detalle-certificacion/${certificacionAvance.id}`,
    );
  } catch (error) {
    next(error);
  }
};

const eliminarCertificacionAvance = async (req, res, next) => {
  try {
    const certificacionAvance = await CertificacionAvance.findByIdAndUpdate(
      req.params.id,
      { estado: "eliminada" },
      { returnDocument: "after" },
    );

    if (!certificacionAvance) {
      const error = new Error("Certificacion no encontrada");
      error.status = 404;
      return next(error);
    }

    res.redirect(303, `/certificaciones-avance`);
  } catch (error) {
    next(error);
  }
};
export {
  obtenerCertificacionesAvance,
  obtenerCertificacionAvancePorId,
  formularioCrearCertificacionAvance,
  crearCertificacionAvance,
  formularioEditarCertificacionAvance,
  editarCertificacionAvance,
  eliminarCertificacionAvance,
};
