import app from "../app.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import request from "supertest";
import Usuario from "../models/Usuario.js";
import Obra from "../models/Obra.js";
import Pedido from "../models/Pedido.js";
import { PedidoBuilder } from "../test-utils/builders/pedidoBuilder.js";
import { ObraBuilder } from "../test-utils/builders/obraBuilder.js";
import { UsuarioBuilder } from "../test-utils/builders/usuarioBuilder.js";
import ROLES from "../utils/roles.js";
process.env.JWT_SECRET = "secreto_de_prueba";

describe("Integración: Módulo de Pedidos", () => {
  let cookieAutenticacion;
  let usuarioId;

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
    usuarioId = usuarioTest._id.toString();

    const payload = { id: usuarioTest._id, rol: usuarioTest.rol };
    const tokenReal = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    cookieAutenticacion = `token=${tokenReal};`;
  });

  describe("POST /pedidos/nuevo-pedido (crearPedido)", () => {
    test("Debería crear un pedido nuevo y redirigir con status 303", async () => {
      const obraPrevia = await Obra.create(new ObraBuilder().conNombre("Obra Alpha").build());

      const nuevoPedido = new PedidoBuilder()
        .conIdObra(obraPrevia._id.toString())
        .conIdUsuario(usuarioId)
        .conDescripcion("Ladrillos Huecos")
        .conCantidad(500)
        .build();

      const response = await request(app)
        .post("/pedidos/nuevo-pedido")
        .set("Cookie", [cookieAutenticacion])
        .type("form")
        .send(nuevoPedido);

      expect(response.status).toBe(303);
      expect(response.header.location).toBe("/pedidos");

      const pedidoGuardado = await Pedido.findOne({ descripcion: "Ladrillos Huecos" });
      expect(pedidoGuardado).not.toBeNull();
    });

    test("Debería renderizar el formulario con errores si falta la descripción", async () => {
      const obraPrevia = await Obra.create(new ObraBuilder().build());

      const pedidoInvalido = new PedidoBuilder()
        .conIdObra(obraPrevia._id.toString())
        .conIdUsuario(usuarioId)
        .sinDescripcion()
        .build();

      const response = await request(app)
        .post("/pedidos/nuevo-pedido")
        .set("Cookie", [cookieAutenticacion])
        .type("form")
        .send(pedidoInvalido);

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/html/);
      expect(response.text).toContain("obligatori");
    });
  });

  describe("GET /pedidos (obtenerPedidos)", () => {
    test("Debería renderizar la vista general de pedidos con status 200", async () => {
      const response = await request(app)
        .get("/pedidos")
        .set("Cookie", [cookieAutenticacion]);

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/html/);
    });
  });

  describe("GET /pedidos/detalle-pedido/:id (obtenerPedidoPorId)", () => {
    test("Debería renderizar el detalle de un pedido existente", async () => {
      const obraPrevia = await Obra.create(new ObraBuilder().build());

      const pedidoPrevio = new PedidoBuilder()
        .conIdObra(obraPrevia._id.toString())
        .conIdUsuario(usuarioId)
        .conDescripcion("Arena Fina")
        .build();

      const pedidoGuardado = await Pedido.create(pedidoPrevio);

      const response = await request(app)
        .get(`/pedidos/detalle-pedido/${pedidoGuardado._id}`)
        .set("Cookie", [cookieAutenticacion]);

      expect(response.status).toBe(200);
      expect(response.text).toContain("Arena Fina");
    });

    test("Debería retornar 404 si el pedido no existe", async () => {
      const idInexistente = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/pedidos/detalle-pedido/${idInexistente}`)
        .set("Cookie", [cookieAutenticacion]);

      expect(response.status).toBe(404);
    });
  });

  describe("DELETE /pedidos/eliminar-pedido/:id (eliminarPedido)", () => {
    test("Debería marcar el pedido como eliminado y redirigir", async () => {
      const obraPrevia = await Obra.create(new ObraBuilder().build());

      const pedidoAEliminar = await Pedido.create(
        new PedidoBuilder()
          .conIdObra(obraPrevia._id.toString())
          .conIdUsuario(usuarioId)
          .conDescripcion("Pintura Exterior")
          .build()
      );

      const response = await request(app)
        .delete(`/pedidos/eliminar-pedido/${pedidoAEliminar._id}`)
        .set("Cookie", [cookieAutenticacion]);

      expect(response.status).toBe(303);
      expect(response.header.location).toBe("/pedidos");

      const pedidoActualizado = await Pedido.findById(pedidoAEliminar._id);

      expect(pedidoActualizado.estado).toBe("eliminado");
    });
  });
});
