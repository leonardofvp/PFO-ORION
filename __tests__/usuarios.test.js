import app from "../app.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import request from "supertest";
import Usuario from "../models/Usuario.js";
import ROLES from "../utils/roles.js";
process.env.JWT_SECRET = "secreto_de_prueba";

describe("Integración: Módulo de Usuarios", () => {
  let cookieAutenticacion;

  beforeEach(async () => {
    const usuarioTemp = new Usuario({
      _id: new mongoose.Types.ObjectId(),
      nombre: "Director",
      apellido: "General",
      email: "director@cimientos.com",
      rol: ROLES.ADMIN.id,
      estado: "activo",
      salt: "salttest123",
      passwordHash: "hashfalso123",
    });

    const usuarioTest = await usuarioTemp.save({ validateBeforeSave: false });

    const payload = { id: usuarioTest._id, rol: usuarioTest.rol };
    const tokenReal = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    cookieAutenticacion = `token=${tokenReal};`;
  });

  describe("POST /usuarios/nuevo-usuario", () => {
    test("Debería crear un usuario nuevo y redirigir con status 303", async () => {
      const nuevoUsuario = {
        nombre: "Carlos",
        apellido: "Gomez",
        email: "carlos.gomez@test.com",
        password: "password123",
        rol: ROLES.DIRECTOR_OBRA.id,
        estado: "activo",
      };

      const response = await request(app)
        .post("/usuarios/nuevo-usuario")
        .set("Cookie", [cookieAutenticacion])
        .type("form")
        .send(nuevoUsuario);

      expect(response.status).toBe(303);
      expect(response.header.location).toBe("/login");

      const usuarioGuardado = await Usuario.findOne({
        email: "carlos.gomez@test.com",
      });
      expect(usuarioGuardado).not.toBeNull();
      expect(usuarioGuardado.passwordHash).toBeDefined();
    });

    test("Debería renderizar formulario de error si falta el apellido o email es inválido", async () => {
      const usuarioInvalido = {
        nombre: "Ca",
        email: "correo-sin-arroba.com",
        password: "pass",
        rol: ROLES.DIRECTOR_OBRA.id,
      };

      const response = await request(app)
        .post("/usuarios/nuevo-usuario")
        .set("Cookie", [cookieAutenticacion])
        .type("form")
        .send(usuarioInvalido);

      expect(response.status).toBe(200);
      expect(response.text).toContain("El apellido es obligatorio");
      expect(response.text).toContain("El formato de email no es válido");
    });
  });

  describe("DELETE /usuarios/eliminar-usuario/:id", () => {
    test("Debería marcar el usuario como eliminado en la base de datos", async () => {
      const usuarioAEliminar = await Usuario.create({
        nombre: "Empleado",
        apellido: "Baja",
        email: "baja@test.com",
        rol: ROLES.DIRECTOR_OBRA.id,
        passwordHash: "hash",
        salt: "salt",
        estado: "activo",
      });

      const response = await request(app)
        .delete(`/usuarios/eliminar-usuario/${usuarioAEliminar._id}`)
        .set("Cookie", [cookieAutenticacion]);

      expect(response.status).toBe(303);

      const usuarioActualizado = await Usuario.findById(usuarioAEliminar._id);
      expect(usuarioActualizado.estado).toBe("eliminado");
    });
  });
});
