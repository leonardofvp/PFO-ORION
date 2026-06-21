import mongoose from "mongoose";

const gastoSchema = new mongoose.Schema({
    idObra: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Obra',
        required: [true, "El ID de la obra es obligatorio"]
    },
    descripcion: {
        type: String,
        required: [true, "La descripción del gasto es obligatoria"],
        trim: true
    },
    monto: {
        type: Number,
        required: [true, "El monto del gasto es obligatorio"],
        min: [0, "El monto no puede ser un número negativo"]
    },
    estado: {
        type: String,
        default: "pendiente",
        trim: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Gasto = mongoose.model("Gasto", gastoSchema);

export default Gasto;