export class PedidoBuilder {
  constructor() {
    this.pedido = {
      idObra: "5f8d0d55b54764421b7156d9",
      idUsuario: "5f8d0d55b54764421b7156da",
      tipo: "material",
      descripcion: "Cemento Portland",
      cantidad: 100,
      unidad: "bolsas",
      estado: "pendiente",
      observaciones: ""
    };
  }

  conIdObra(idObra) {
    this.pedido.idObra = idObra;
    return this;
  }

  conIdUsuario(idUsuario) {
    this.pedido.idUsuario = idUsuario;
    return this;
  }

  conTipo(tipo) {
    this.pedido.tipo = tipo;
    return this;
  }

  conDescripcion(descripcion) {
    this.pedido.descripcion = descripcion;
    return this;
  }

  conCantidad(cantidad) {
    this.pedido.cantidad = cantidad;
    return this;
  }

  conUnidad(unidad) {
    this.pedido.unidad = unidad;
    return this;
  }

  conEstado(estado) {
    this.pedido.estado = estado;
    return this;
  }

  conObservaciones(observaciones) {
    this.pedido.observaciones = observaciones;
    return this;
  }

  sinDescripcion() {
    delete this.pedido.descripcion;
    return this;
  }

  sinCantidad() {
    delete this.pedido.cantidad;
    return this;
  }

  conCantidadInvalida() {
    this.pedido.cantidad = 0;
    return this;
  }

  build() {
    return this.pedido;
  }
}