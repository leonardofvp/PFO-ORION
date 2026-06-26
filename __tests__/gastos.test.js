import app from "../app.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import request from "supertest";
import Obra from "../models/Obra.js";
import Usuario from "../models/Usuario.js";
import Gasto from "../models/Gasto.js";
import { GastoBuilder } from "../test-utils/builders/gastoBuilder.js";
import { ObraBuilder } from "../test-utils/builders/obraBuilder.js";
import { UsuarioBuilder } from "../test-utils/builders/usuarioBuilder.js";
import ROLES from "../utils/roles.js";
process.env.JWT_SECRET = "secreto_de_prueba";

describe("Integración: Módulo de Gastos", () => {
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

    const tokenReal = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    cookieAutenticacion = `token=${tokenReal};`;
  });

  describe("POST /gastos/nuevo-gasto (crearGasto)", () => {
    test("Debería crear un gasto nuevo y redirigir con status 303", async () => {
      const obraPrevia = await Obra.create(
        new ObraBuilder().conNombre("Obra Los Pinos").build(),
      );

      const nuevoGasto = new GastoBuilder()
        .conIdObra(obraPrevia._id.toString())
        .conDescripcion("Compra de cemento extra")
        .conMonto(150000)
        .build();

      const response = await request(app)
        .post("/gastos/nuevo-gasto")
        .set("Cookie", [cookieAutenticacion])
        .type("form")
        .send(nuevoGasto);

      console.log(response.text);

      expect(response.status).toBe(303);
      expect(response.header.location).toBe("/gastos");

      const gastoGuardado = await Gasto.findOne({
        descripcion: "Compra de cemento extra",
      });
      expect(gastoGuardado).not.toBeNull();
      expect(gastoGuardado.monto).toBe(150000);
      expect(gastoGuardado.estado).toBe("pendiente");
    });

    test("Debería renderizar el formulario con errores si falta la descripción", async () => {
      const obraPrevia = await Obra.create(new ObraBuilder().build());

      const gastoInvalido = new GastoBuilder()
        .conIdObra(obraPrevia._id.toString())
        .sinDescripcion()
        .build();

      const response = await request(app)
        .post("/gastos/nuevo-gasto")
        .set("Cookie", [cookieAutenticacion])
        .type("form")
        .send(gastoInvalido);

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/html/);
      expect(response.text).toContain("obligatori");
    });
  });

  describe("GET /gastos (obtenerGastos)", () => {
    test("Debería renderizar la vista del listado general de gastos con status 200", async () => {
      const response = await request(app)
        .get("/gastos")
        .set("Cookie", [cookieAutenticacion]);

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/html/);
    });
  });

  describe("GET /gastos/detalle-gasto/:id (obtenerGastoPorId)", () => {
    test("Debería renderizar el detalle de un gasto existente", async () => {
      const obraPrevia = await Obra.create(new ObraBuilder().build());

      const gastoPrevio = new GastoBuilder()
        .conIdObra(obraPrevia._id.toString())
        .conDescripcion("Alquiler de andamios")
        .build();

      const gastoGuardado = await Gasto.create(gastoPrevio);

      const response = await request(app)
        .get(`/gastos/detalle-gasto/${gastoGuardado._id}`)
        .set("Cookie", [cookieAutenticacion]);

      expect(response.status).toBe(200);
      expect(response.text).toContain("Alquiler de andamios");
    });

    test("Debería retornar 404 si el gasto no existe", async () => {
      const idInexistente = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/gastos/detalle-gasto/${idInexistente}`)
        .set("Cookie", [cookieAutenticacion]);

      expect(response.status).toBe(404);
    });
  });

  describe("DELETE /gastos/eliminar-gasto/:id (eliminarGasto)", () => {
    test("Debería marcar el gasto como eliminado y redirigir", async () => {
      const obraPrevia = await Obra.create(new ObraBuilder().build());

      const gastoAEliminar = await Gasto.create(
        new GastoBuilder()
          .conIdObra(obraPrevia._id.toString())
          .conDescripcion("Pago a proveedores externo")
          .build(),
      );

      const response = await request(app)
        .delete(`/gastos/eliminar-gasto/${gastoAEliminar._id}`)
        .set("Cookie", [cookieAutenticacion]);

      expect(response.status).toBe(303);
      expect(response.header.location).toBe("/gastos");

      const gastoActualizado = await Gasto.findById(gastoAEliminar._id);
      expect(gastoActualizado.estado).toBe("eliminado");
    });
  });
});
