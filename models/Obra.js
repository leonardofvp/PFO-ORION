class Obra {
    constructor(id, nombre, presupuestoTotal, estado) {
        this.id =  id;
        this.nombre = nombre;
        this.presupuestoTotal = presupuestoTotal;
        this.estado = estado;
    }
}

exports.module = Obra;