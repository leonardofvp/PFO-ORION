import ROLES from "../../utils/roles";

export class UsuarioBuilder {
  constructor() {
    this.usuario = {
      nombre: "Usuario",
      apellido: "Prueba",
      email: `test_${Date.now()}@cimientos.com`,
      password: "password123",
      rol: ROLES.ADMIN.id,
      estado: "activo"
    };
  }

  conNombre(nombre) {
    this.usuario.nombre = nombre;
    return this;
  }

  conApellido(apellido) {
    this.usuario.apellido = apellido;
    return this;
  }

  conEmail(email) {
    this.usuario.email = email;
    return this;
  }

  conPassword(password) {
    this.usuario.password = password;
    return this;
  }

  conRol(rol) {
    this.usuario.rol = rol;
    return this;
  }

  conEstado(estado) {
    this.usuario.estado = estado;
    return this;
  }

  sinNombre() {
    delete this.usuario.nombre;
    return this;
  }

  sinApellido() {
    delete this.usuario.apellido;
    return this;
  }

  conEmailInvalido() {
    this.usuario.email = "correo-sin-arroba.com";
    return this;
  }

  conPasswordCorta() {
    this.usuario.password = "123";
    return this;
  }

  build() {
    return this.usuario;
  }
}