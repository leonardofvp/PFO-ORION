class Gasto {
    constructor(id, descripcion, montoTotal, estado, idObra) {
        this.id = id;
        this.idObra = idObra;
        this.descripcion = descripcion;
        this.monto = monto;
        this.estado = estado;
    }
}

module.exports = Gasto;