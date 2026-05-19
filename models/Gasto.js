import mongoose from "mongoose";

const gastoSchema = new mongoose.Schema({
    idObra: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Obra', // Vincula este gasto directamente con el modelo de Obra
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
        default: "pendiente", // El estado inicial por defecto
        trim: true
    },
    fecha: {
        type: Date,
        default: Date.now // Si no se envía fecha, guarda el día y hora actual automáticamente
    }
}, {
    timestamps: true// agrega fechas de creación y modificación de documentos
});

const Gasto = mongoose.model("Gasto", gastoSchema);

export default Gasto;