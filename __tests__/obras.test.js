import app from "../app.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import request from "supertest";
import Usuario from "../models/Usuario.js";
import Obra from "../models/Obra.js";
import { ObraBuilder } from "../test-utils/builders/obraBuilder.js";
process.env.JWT_SECRET = "secreto_de_prueba";

describe("Integración: Módulo de Obras", () => {
  let cookieAutenticacion;

  beforeEach(async () => {
    const usuarioTemp = new Usuario({
      _id: new mongoose.Types.ObjectId(),
      nombre: "Admin",
      apellido: "Test",
      email: "admin@test.com",
      rol: "admin",
      estado: "activo",
      salt: "salttest123",
      passwordHash: "hashfalso123"
    });

    const usuarioTest = await usuarioTemp.save({ validateBeforeSave: false });

    const payload = {
      id: usuarioTest._id,
      rol: usuarioTest.rol,
    };

    const tokenReal = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    cookieAutenticacion = `token=${tokenReal};`;
  });

  describe("POST /obras/nueva-obra (crearObra)", () => {
    test("Debería crear una obra nueva y redirigir con status 303", async () => {
      const nuevaObra = new ObraBuilder()
        .conNombre("Torre Central")
        .conPresupuesto(15000000)
        .build();

      const response = await request(app)
        .post("/obras/nueva-obra")
        .set("Cookie", [cookieAutenticacion])
        .type("form")
        .send(nuevaObra);

      expect(response.status).toBe(303);
      expect(response.header.location).toBe("/obras");

      const obraGuardada = await Obra.findOne({ nombre: "Torre Central" });
      expect(obraGuardada).not.toBeNull();
      expect(obraGuardada.estado).toBe("activa");
    });

    test("Debería renderizar el formulario con errores si los datos son inválidos", async () => {
      const obraInvalida = new ObraBuilder().sinNombre().build();

      const response = await request(app)
        .post("/obras/nueva-obra")
        .set("Cookie", [cookieAutenticacion])
        .type("form")
        .send(obraInvalida);

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/html/);
      expect(response.text).toContain("El nombre de la obra es obligatorio");
    });
  });

  describe("GET /obras (obtenerObras)", () => {
    test("Debería renderizar la vista de obras con status 200", async () => {
      const response = await request(app)
        .get("/obras")
        .set("Cookie", [cookieAutenticacion]);

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/html/);
    });
  });

  describe("GET /obras/detalle-obra/:id (obtenerObraPorId)", () => {
    test("Debería renderizar el detalle de una obra existente", async () => {
      const obraPrevia = new ObraBuilder().conNombre("Edificio Norte").build();
      const obraGuardada = await Obra.create(obraPrevia);

      const response = await request(app)
        .get(`/obras/detalle-obra/${obraGuardada._id}`)
        .set("Cookie", [cookieAutenticacion]);

      expect(response.status).toBe(200);
      expect(response.text).toContain("Edificio Norte");
    });

    test("Debería retornar 404 si la obra no existe", async () => {
      const idInexistente = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/obras/detalle-obra/${idInexistente}`)
        .set("Cookie", [cookieAutenticacion]);

      expect(response.status).toBe(404);
    });
  });

  describe("DELETE /obras/eliminar-obra/:id (eliminarObra)", () => {
    test("Debería marcar la obra como eliminada y redirigir", async () => {
      const obraEliminar = await Obra.create(
        new ObraBuilder().conNombre("Complejo Sur").build()
      );

      const response = await request(app)
        .delete(`/obras/eliminar-obra/${obraEliminar._id}`)
        .set("Cookie", [cookieAutenticacion]);

      expect(response.status).toBe(303);
      expect(response.header.location).toBe("/obras");

      const obraActualizada = await Obra.findById(obraEliminar._id);
      expect(obraActualizada.estado).toBe("eliminada");
    });
  });
});