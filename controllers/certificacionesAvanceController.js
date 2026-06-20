import CertificacionAvance from "../models/CertificacionAvance.js";
import Obra from "../models/Obra.js";
import Subcontratista from "../models/Subcontratista.js";
import ROLES from "../utils/roles.js";

// CRUD
const obtenerCertificacionesAvance = async (req, res, next) => {
  try {
    let filtroBusqueda = { estadoRegistro: { $ne: "eliminado" } };

    if (req.usuario.rol === ROLES.DIRECTOR_OBRA.id) {
      filtroBusqueda.directorObra = req.usuario._id;
    }

    const certificacionesAvanceActivas = await CertificacionAvance.find(
      filtroBusqueda,
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

    if (!certificacionAvance || certificacionAvance.estado === "eliminado") {
      const error = new Error("Usuario no encontrada");
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
    const { idObra, idSubcontratista, tareaRealizada, porcentajeAvance } =
      req.body;

    const certificacionesPrevias = await CertificacionAvance.find({
      idObra,
      idSubcontratista,
      tareaRealizada,
      estadoRegistro: { $ne: "eliminado" },
    });

    const avanceAcumulado = certificacionesPrevias.reduce(
      (total, cert) => total + cert.porcentajeAvance,
      0,
    );

    if (avanceAcumulado + Number(porcentajeAvance) > 100) {
      const error = new Error(
        "Error de auditoría: El avance acumulado superaría el 100%.",
      );
      error.status = 400;
      return next(error);
    }

    const nuevaCertificacionAvance = new CertificacionAvance({
      ...req.body,
      directorObra: req.usuario._id,
    });

    await nuevaCertificacionAvance.save();
    res.redirect(303, "/certificaciones-avance");
  } catch (error) {
    next(error);
  }
};

const formularioEditarCertificacionAvance = async (req, res, next) => {
  try {
    const certificacionAvance = await CertificacionAvance.findById(
      req.params.id,
    );

    if (!certificacionAvance || certificacionAvance.estado === "eliminado") {
      const error = new Error("Usuario no encontrada");
      error.status = 404;
      return next(error);
    }

    res.render("formulario-certificacion-avance", {
      editable: true,
      certificacionAvance: certificacionAvance,
    });
  } catch (error) {
    next(error);
  }
};

const editarCertificacionAvance = async (req, res, next) => {
  try {
    const certificacionAvance = await CertificacionAvance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" },
    );

    if (!certificacionAvance) {
      const error = new Error("Usuario no encontrada");
      error.status = 404;
      return next(error);
    }

    res.redirect(
      303,
      `/certificaciones-avance/detalle-certificacion-avance/${certificacionAvance.id}`,
    );
  } catch (error) {
    next(error);
  }
};

const eliminarCertificacionAvance = async (req, res, next) => {
  try {
    const certificacionAvance = await CertificacionAvance.findByIdAndUpdate(
      req.params.id,
      { estado: "eliminado" },
      { returnDocument: "after" },
    );

    if (!certificacionAvance || certificacionAvance.estado === "eliminado") {
      const error = new Error("Usuario no encontrada");
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
