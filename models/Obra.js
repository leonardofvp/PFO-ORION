import mongoose from "mongoose";

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
    },
    personalAsignado: [{
        type: mongoose.Schema.Types.ObjectId,
        Ref: "Usuario"
    }]
}, {
    timestamps: true// agrega fechas de creación y modificación de documentos
});

const Obra = mongoose.model("Obra", obraSchema);

export default Obra;