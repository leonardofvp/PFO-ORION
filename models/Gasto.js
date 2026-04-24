class Gasto {
    constructor(id, idObra, descripcion, monto, estado, fecha) {
        this.id = id;
        this.idObra = idObra;
        this.descripcion = descripcion;
        this.monto = monto;
        this.estado = estado;
        this.fecha = fecha;
    }
}

module.exports = Gasto;