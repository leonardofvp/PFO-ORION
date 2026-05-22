import mongoose from "mongoose";
import ROLES from "../utils/roles.js";

const rolesFiltrados = Object.values(ROLES).filter(rol => rol.id != ROLES.ADMIN.id);
const rolesPermitidos = rolesFiltrados.map(rol => rol.id);

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true
    },
    apellido: {
        type: String,
        required: [true, "El apellido es obligatorio"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "El correo electrónico es obligatorio"],
        unique: true, // Evita que se registren dos usuarios con el mismo email
        lowercase: true, // Guarda el email siempre en minúsculas para evitar duplicados por mayúsculas
        trim: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    rol: {
        type: String,
        required: [true, "El rol es obligatorio"],
        enum: {
            values: rolesPermitidos,
            message: "{VALUE} no es un rol válido para el sistema"
        },
        trim: true
    },
    estado: {
        type: String,
        default: "activo",
        enum: {
            values: ["activo", "eliminado"],
            message: "{VALUE} no es un estado válido"
        },
        trim: true
    }
}, {
    timestamps: true// agrega fechas de creación y modificación de documentos
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;