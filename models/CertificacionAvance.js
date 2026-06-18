import mongoose from "mongoose";

const certificacionAvanceSchema = new mongoose.Schema({
  idObra: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Obra",
    required: true,
  },
  idSubcontratista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcontratista",
    required: true,
  },
  tareaRealizada: {
    type: String,
    required: true,
  },
  porcentajeAvance: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  idDirectorObra: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  estadoFinanzas: {
    type: String,
    enum: ["Pendiente", "Habilitado para Pago", "Pagado"],
    default: "Pendiente",
  },
  fechaCertificacion: {
    type: Date,
    default: Date.now,
  },
  estadoRegistro: {
    type: String,
    enum: ["activo", "eliminado"],
    default: "activo",
  },
});

export default mongoose.model("CertificacionAvance", certificacionAvanceSchema);
