import app from "../app.js";
import request from "supertest";
import Usuario from "../models/Usuario.js";
import { UsuarioBuilder } from "../test-utils/builders/usuarioBuilder.js";
process.env.JWT_SECRET = "secreto_de_prueba";

describe("Integración: Módulo de Autenticación (Login)", () => {
  beforeEach(async () => {
    const { salt, passwordHash } = Usuario.crearPasswordSeguro("password123");

    const datosUsuario = new UsuarioBuilder()
      .conEmail("test@cimentossolidos.com")
      .conRol("admin")
      .build();

    const usuarioTemp = new Usuario({
      ...datosUsuario,
      salt: salt,
      passwordHash: passwordHash,
    });

    await usuarioTemp.save({ validateBeforeSave: false });
  });

  describe("POST /login", () => {
    test("Debería iniciar sesión correctamente con credenciales válidas", async () => {
      const credencialesValidas = {
        email: "test@cimentossolidos.com",
        password: "password123",
      };

      const response = await request(app)
        .post("/login")
        .type("form")
        .send(credencialesValidas);

      expect(response.status).toBe(303);

      expect(response.headers["set-cookie"]).toBeDefined();
      expect(response.headers["set-cookie"][0]).toMatch(/token=/);
    });

    test("Debería rechazar el inicio de sesión si la contraseña es incorrecta", async () => {
      const credencialesInvalidas = {
        email: "test@cimentossolidos.com",
        password: "contraseña_incorrecta",
      };

      const response = await request(app)
        .post("/login")
        .type("form")
        .send(credencialesInvalidas);

      expect(response.status).toBe(401);
      expect(response.headers["content-type"]).toMatch(/html/);
      expect(response.text).toContain("Usuario y/o contraseña incorrectos");
    });

    test("Debería rechazar el inicio de sesión si el usuario no existe", async () => {
      const usuarioInexistente = {
        email: "no_existe@correo.com",
        password: "password123",
      };

      const response = await request(app)
        .post("/login")
        .type("form")
        .send(usuarioInexistente);

      expect(response.status).toBe(401);
      expect(response.headers["content-type"]).toMatch(/html/);
      expect(response.text).toContain("Usuario y/o contraseña incorrectos");
    });
  });
});
