import mongoose from "mongoose";
import ROLES from "../utils/roles.js";
import crypto from "node:crypto";

const roles = Object.values(ROLES).map((rol) => rol.id);

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    apellido: {
      type: String,
      required: [true, "El apellido es obligatorio"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      required: [true, "El rol es obligatorio"],
      enum: {
        values: roles,
        message: "{VALUE} no es un rol válido para el sistema",
      },
      trim: true,
    },
    estado: {
      type: String,
      default: "activo",
      enum: {
        values: ["activo", "eliminado"],
        message: "{VALUE} no es un estado válido",
      },
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

usuarioSchema.statics.crearPasswordSeguro = function (password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const passwordHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return { salt, passwordHash };
};

usuarioSchema.methods.validarPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
    .toString("hex");
  return this.passwordHash === hash;
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
