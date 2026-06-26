class ObraBuilder {
  constructor() {
    this.obra = {
      nombre: "Obra Estándar",
      ubicacion: "Ubicación Genérica 123",
      presupuesto: 5000000,
      estado: "activa",
    };
  }

  conNombre(nombre) {
    this.obra.nombre = nombre;
    return this;
  }

  conPresupuesto(presupuesto) {
    this.obra.presupuesto = presupuesto;
    return this;
  }

  conUbicacion(ubicacion) {
    this.obra.ubicacion = ubicacion;
    return this;
  }

  sinNombre() {
    delete this.obra.nombre;
    return this;
  }

  sinPresupuesto() {
    delete this.obra.presupuesto;
    return this;
  }

  build() {
    return this.obra;
  }
}

export { ObraBuilder };
