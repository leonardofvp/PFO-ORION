class Pedido {
    constructor(id, idObra, idUsuario, tipo, descripcion, cantidad, unidad) {
        this.id = id;
        this.idObra = idObra;
        this.idUsuario = idUsuario; // Quién lo solicita (Capataz/Jefe de Obra)
        this.fecha = new Date();

        // Datos del ítem único
        this.tipo = tipo; // "material" o "servicio"
        this.descripcion = descripcion; // Ej: "Cemento" o "Flete"
        this.cantidad = cantidad;
        this.unidad = unidad; // Ej: "bolsas", "m3", "viajes"

        this.estado = "pendiente"; // Estados: pendiente, aprobado, entregado, rechazado
        this.observaciones = "";
    }
}