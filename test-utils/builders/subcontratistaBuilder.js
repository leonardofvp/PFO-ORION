export class SubcontratistaBuilder {
  constructor() {
    this.subcontratista = {
      nombre: "Construcciones Alfa SRL",
      cuit: "30-12345678-9",
      email: `contacto_${Date.now()}@alfa.com`,
      telefono: "1122334455",
      especialidad: "Hormigón",
      estado: "activo"
    };
  }

  conNombre(nombre) {
    this.subcontratista.nombre = nombre;
    return this;
  }

  conCuit(cuit) {
    this.subcontratista.cuit = cuit;
    return this;
  }

  conEspecialidad(especialidad) {
    this.subcontratista.especialidad = especialidad;
    return this;
  }

  conEmail(email) {
    this.subcontratista.email = email;
    return this;
  }

  conEstado(estado) {
    this.subcontratista.estado = estado;
    return this;
  }

  sinNombre() {
    delete this.subcontratista.nombre;
    return this;
  }

  sinCuit() {
    delete this.subcontratista.cuit;
    return this;
  }

  conCuitInvalido() {
    this.subcontratista.cuit = "cuit-falso";
    return this;
  }

  build() {
    return this.subcontratista;
  }
}