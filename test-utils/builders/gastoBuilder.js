export class GastoBuilder {
constructor() {
    this.gasto = {
      idObra: "5f8d0d55b54764421b7156d9",
      descripcion: "Alquiler de maquinaria pesada",
      monto: 250000,
      estado: "pendiente",
      fecha: new Date().toISOString().split('T')[0]
    };
  }

  conIdObra(idObra) {
    this.gasto.idObra = idObra;
    return this;
  }

  conDescripcion(descripcion) {
    this.gasto.descripcion = descripcion;
    return this;
  }

  conMonto(monto) {
    this.gasto.monto = monto;
    return this;
  }

  conEstado(estado) {
    this.gasto.estado = estado;
    return this;
  }

  sinDescripcion() {
    delete this.gasto.descripcion;
    return this;
  }

  sinMonto() {
    delete this.gasto.monto;
    return this;
  }

  conMontoInvalido() {
    this.gasto.monto = -1000;
    return this;
  }

  build() {
    return this.gasto;
  }
}