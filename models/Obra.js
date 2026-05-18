import mongoose from "mongoose";

// 1. DEFINICIÓN DEL ESQUEMA
const obraSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre de la obra es obligatorio"],
        trim: true
    },
    ubicacion: {
        type: String,
        required: [true, "La ubicación de la obra es obligatoria"],
        trim: true
    },
    presupuesto: {
        type: Number,
        required: [true, "El presupuesto es obligatorio"],
        min: [0, "El presupuesto no puede ser negativo"]
    },
    estado: {
        type: String,
        default: "activa",
        trim: true
    }
}, {
    timestamps: true// agrega fechas de creación y modificación de documentos
});

// 2. CREACIÓN DEL MODELO
const Obra = mongoose.model("Obra", obraSchema);

// 3. EXPORTACIÓN
export default Obra;