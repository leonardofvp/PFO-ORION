class Gasto {
    constructor(id, descripcion, montoTotal, estado, idObra, idUsuario) {
        this.id = id;
        this.descripcion = descripcion;
        this.montoTotal = montoTotal;
        this.estado = estado;
        this.idObra = idObra;
    }
}

module.exports = Gasto;