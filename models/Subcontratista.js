import mongoose from 'mongoose';

const subcontratistaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre o razón social es obligatorio'],
        trim: true
    },
    cuit: {
        type: String,
        required: [true, 'El CUIT es obligatorio'],
        unique: true,
        trim: true
    },
    especialidad: {
        type: String,
        required: [true, 'La especialidad es obligatoria (ej. Electricidad, Fletes, Mano de obra)'],
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    estado: {
        type: String,
        default: "activo",
        enum: {
            values: ["activo", "eliminado"],
            message: "{VALUE} no es un estado válido"
        }
    }
}, {
    timestamps: true// agrega fechas de creación y modificación de documentos
});

const Subcontratista = mongoose.model('Subcontratista', subcontratistaSchema);

export default Subcontratista;