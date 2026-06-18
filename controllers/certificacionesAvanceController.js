import CertificacionAvance from "../models/CertificacionAvance.js";
import Obra from "../models/Obra.js";
import Subcontratista from "../models/Subcontratista.js";
import ROLES from "../utils/roles.js";

// CRUD
const obtenerCertificacionesAvance = async (req, res) => {
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
    console.error(error);
    res.status(500).send("Error al cargar la vista");
  }
};

const obtenerCertificacionAvancePorId = async (req, res) => {
  try {
    const certificacionAvance = await CertificacionAvance.findById(
      req.params.id,
    )
      .populate("idObra")
      .populate("idSubcontratista")
      .populate("idDirectorObra");

    if (!certificacionAvance || certificacionAvance.estado === "eliminado") {
      return res.status(404).send("Certificacion de avance no encontrada");
    }

    res.status(200);
    res.render("detalle-certificacion-avance", { certificacionAvance });
  } catch (error) {
    res.status(500).send("Error al buscar certificado de avance");
    console.error(error);
  }
};

const formularioCrearCertificacionAvance = async (req, res) => {
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
    res.status(500).send("Error al cargar el formulario");
  }
};

const crearCertificacionAvance = async (req, res) => {
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
      return res
        .status(400)
        .send("Error de auditoría: El avance acumulado superaría el 100%.");
    }

    const nuevaCertificacionAvance = new CertificacionAvance({
      ...req.body,
      directorObra: req.usuario._id,
    });

    await nuevaCertificacionAvance.save();
    res.redirect(303, "/certificaciones-avance");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear certificado de avance");
  }
};

const formularioEditarCertificacionAvance = async (req, res) => {
  try {
    const certificacionAvance = await CertificacionAvance.findById(
      req.params.id,
    );
    if (!certificacionAvance || certificacionAvance.estado === "eliminado") {
      return res.status(404).send("Certificacion de avance no encontrada");
    }

    res.render("formulario-certificacion-avance", {
      editable: true,
      certificacionAvance: certificacionAvance,
    });
  } catch (error) {
    res.status(500).send("Error al buscar certificado de avance");
    console.error(error);
  }
};

const editarCertificacionAvance = async (req, res) => {
  try {
    const certificacionAvance = await CertificacionAvance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" },
    );

    res.redirect(
      303,
      `/certificaciones-avance/detalle-certificacion-avance/${certificacionAvance.id}`,
    );
  } catch (error) {
    res.status(500).send("Error al actualizar certificado de avance");
    console.error(error);
  }
};

const eliminarCertificacionAvance = async (req, res) => {
  try {
    const certificacionAvance = await CertificacionAvance.findByIdAndUpdate(
      req.params.id,
      { estado: "eliminado" },
      { returnDocument: "after" },
    );

    if (!certificacionAvance) {
      return res.status(404).send("CertificacionAvance no encontrada");
    }

    res.redirect(303, `/certificaciones-avance`);
  } catch (error) {
    res.status(500).send("Error al eliminar certificado de avance");
    console.error(error);
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
