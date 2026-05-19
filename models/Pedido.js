import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
    idObra: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Obra', // Vincula obligatoriamente el pedido al ID de la obra para asegurar la trazabilidad financiera
        required: [true, "El ID de la obra es obligatorio"]
    },
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', // Vincula al usuario autenticado (Capataz o Director de Obra) que genera la solicitud
        required: [true, "El ID del usuario solicitante es obligatorio"]
    },
    fecha: {
        type: Date,
        default: Date.now // Se genera de forma automática al momento de la carga
    },
    tipo: {
        type: String,
        required: [true, "El tipo de insumo (Material/Servicio) es obligatorio"],
        enum: {
            values: ["material", "servicio"],
            message: "{VALUE} no es un tipo válido (debe ser 'material' o 'servicio')"
        },
        trim: true
    },
    descripcion: {
        type: String,
        required: [true, "La descripción del pedido es obligatoria"],
        trim: true
    },
    cantidad: {
        type: Number,
        required: [true, "La cantidad es obligatoria"],
        min: [1, "La cantidad mínima debe ser al menos 1"]
    },
    unidad: {
        type: String,
        required: [true, "La unidad de medida es obligatoria (ej: bolsas, m3, viajes)"],
        trim: true
    },
    estado: {
        type: String,
        default: "pendiente", // Inicia en estado "pendiente"
        enum: {
            values: ["pendiente", "aprobado", "entregado", "rechazado"],
            message: "{VALUE} no es un estado válido"
        },
        trim: true
    },
    observaciones: {
        type: String,
        default: "",
        trim: true
    }
}, {
    timestamps: true// agrega fechas de creación y modificación de documentos
});

const Pedido = mongoose.model("Pedido", pedidoSchema);

export default Pedido;