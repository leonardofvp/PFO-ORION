import app from "../app.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import request from "supertest";
import Usuario from "../models/Usuario.js";
import Subcontratista from "../models/Subcontratista.js";
import { SubcontratistaBuilder } from "../test-utils/builders/subcontratistaBuilder.js";
import { UsuarioBuilder } from "../test-utils/builders/usuarioBuilder.js";
import ROLES from "../utils/roles.js";
process.env.JWT_SECRET = "secreto_de_prueba";

describe("Integración: Módulo de Subcontratistas", () => {
  let cookieAutenticacion;

  beforeEach(async () => {
    const datosAdmin = new UsuarioBuilder()
      .conNombre("Admin")
      .conRol(ROLES.ADMIN.id)
      .build();

    const usuarioTemp = new Usuario({
      ...datosAdmin,
      _id: new mongoose.Types.ObjectId(),
      salt: "salttest123",
      passwordHash: "hashfalso123",
    });

    const usuarioTest = await usuarioTemp.save({ validateBeforeSave: false });

    const payload = {
      id: usuarioTest._id,
      rol: usuarioTest.rol,
    };

    const tokenReal = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    cookieAutenticacion = `token=${tokenReal};`;
  });

  describe("POST /subcontratistas/nuevo-subcontratista (crearSubcontratista)", () => {
    test("Debería crear un subcontratista nuevo y redirigir con status 303", async () => {
      const nuevoSubcontratista = new SubcontratistaBuilder()
        .conNombre("Metalúrgica Central")
        .conEspecialidad("Estructuras Metálicas")
        .build();

      const response = await request(app)
        .post("/subcontratistas/nuevo-subcontratista")
        .set("Cookie", [cookieAutenticacion])
        .type("form")
        .send(nuevoSubcontratista);

      expect(response.status).toBe(303);
      expect(response.header.location).toBe("/subcontratistas");

      const subGuardado = await Subcontratista.findOne({ nombre: "Metalúrgica Central" });
      expect(subGuardado).not.toBeNull();
      expect(subGuardado.estado).toBe("activo");
    });

    test("Debería renderizar el formulario con errores si falta el nombre o razón social", async () => {
      const subInvalido = new SubcontratistaBuilder().sinNombre().build();

      const response = await request(app)
        .post("/subcontratistas/nuevo-subcontratista")
        .set("Cookie", [cookieAutenticacion])
        .type("form")
        .send(subInvalido);

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/html/);
      expect(response.text).toContain("El nombre o razón social es obligatorio");
    });
  });

  describe("GET /subcontratistas (obtenerSubcontratistas)", () => {
    test("Debería renderizar la vista del listado general con status 200", async () => {
      const response = await request(app)
        .get("/subcontratistas")
        .set("Cookie", [cookieAutenticacion]);

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/html/);
    });
  });

  describe("GET /subcontratistas/detalle-subcontratista/:id (obtenerSubcontratistaPorId)", () => {
    test("Debería renderizar el detalle de un subcontratista existente", async () => {
      const subPrevio = new SubcontratistaBuilder().conNombre("Pisos Industriales SA").build();
      const subGuardado = await Subcontratista.create(subPrevio);

      const response = await request(app)
        .get(`/subcontratistas/detalle-subcontratista/${subGuardado._id}`)
        .set("Cookie", [cookieAutenticacion]);

      expect(response.status).toBe(200);
      expect(response.text).toContain("Pisos Industriales SA");
    });

    test("Debería retornar 404 si el subcontratista no existe", async () => {
      const idInexistente = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/subcontratistas/detalle-subcontratista/${idInexistente}`)
        .set("Cookie", [cookieAutenticacion]);

      expect(response.status).toBe(404);
    });
  });

  describe("DELETE /subcontratistas/eliminar-subcontratista/:id (eliminarSubcontratista)", () => {
    test("Debería marcar al subcontratista como eliminado y redirigir", async () => {
      const subAEliminar = await Subcontratista.create(
        new SubcontratistaBuilder().conNombre("Demoliciones Rapidas").build()
      );

      const response = await request(app)
        .delete(`/subcontratistas/eliminar-subcontratista/${subAEliminar._id}`)
        .set("Cookie", [cookieAutenticacion]);

      expect(response.status).toBe(303);
      expect(response.header.location).toBe("/subcontratistas");

      const subActualizado = await Subcontratista.findById(subAEliminar._id);
      expect(subActualizado.estado).toBe("eliminado");
    });
  });
});