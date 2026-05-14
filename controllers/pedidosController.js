// Controller de pedidos, aca van las funciones para el CRUD de las pedidos
const {
    leerArchivo,
    escribirArchivo
} = require("../utils/jsonHelper");

const Pedido = require("../models/Pedido");

// CRUD
const obtenerPedidosJson = (req, res) => {
    const pedidos = leerArchivo("pedidos.json");
    res.json(pedidos);
};

const obtenerPedidos = (req, res) => {
    const pedidos = leerArchivo("pedidos.json");

    const pedidosActivos = pedidos.filter(
        pedido => pedido.estado !== "eliminado"
    );

    res.render("pedidos", { pedidosActivos });
};

const obtenerPedidoPorId = (req, res) => {
    const pedidos = leerArchivo("pedidos.json");
    const pedido = pedidos.find(u => u.id === parseInt(req.params.id));
    //console.log(pedido.id);
    if (!pedido) {
        return res.status(404).send("Pedido no encontrado");
        console.log("Pedido no encontrado con ID:", id);
    }

    if (pedido.estado === "eliminado") {
        return res.status(404).send("La pedido fue eliminado");
    }

    res.status(200).render("detalle-pedido", { pedido });
};

const formularioCrearPedido = (req, res) => {
    res.render("formulario-pedido", {
        editable: false,
        pedido: {}
    });
};

const crearPedido = (req, res) => {
    const pedidos = leerArchivo("pedidos.json");

    const { id, nombre, apellido, email, password, rol, estado } = req.body;
    const nuevoPedido = new Pedido(
        parseInt(id),
        nombre,
        apellido,
        email,
        password,
        rol,
        estado
    );

    pedidos.push(nuevoPedido);

    escribirArchivo("pedidos.json", pedidos);

    res.redirect(303, "/pedidos");
};

const formularioEditarPedido = (req, res) => {
        const id = parseInt(req.params.id);
        const pedidos = leerArchivo("pedidos.json");
        const pedido = pedidos.find(o => o.id === id);

        if (!pedido) {
            return res.status(404).send("Pedido no encontrada");
        }

        res.render("formulario-pedido", {
        editable: true,
        pedido: pedido
    });
};

const editarPedido = (req, res) => {
    const pedidos = leerArchivo("pedidos.json");

    const id = parseInt(req.params.id);
    const pedido = pedidos.find(o => o.id === id);

    if (!pedido) {
        return res.status(404).send("Pedido no encontrada");
    }

        const obrasActivas = pedidos.filter(
        pedido => pedido.estado !== "eliminado"
    );

    // Desestructuramos los campos que vienen del formulario de pedidos
    const { idObra, descripcion, cantidad, unidad, estado, observaciones } = req.body;

    // Usamos el operador ?? para actualizar solo si el campo viene en el body
    // Si no viene (es null o undefined), mantiene el valor que ya tenía el pedido
    pedido.idObra = idObra ?? pedido.idObra;
    pedido.descripcion = descripcion ?? pedido.descripcion;
    pedido.cantidad = cantidad ?? pedido.cantidad;
    pedido.unidad = unidad ?? pedido.unidad;
    pedido.estado = estado ?? pedido.estado;
    pedido.observaciones = observaciones ?? pedido.observaciones;

    // Nota: La fecha y el idUsuario (el capataz) generalmente no se cambian
    // una vez creado el pedido, para mantener la trazabilidad.

    escribirArchivo("pedidos.json", pedidos);

    res.redirect(303, `/pedidos/detalle-pedido/${pedido.id}`);
};

const eliminarPedido = (req, res) => {
    const pedidos = leerArchivo("pedidos.json");
    const id = parseInt(req.params.id);

    const pedido = pedidos.find(o => o.id === id);

    if (!pedido) {
        return res.status(404).send("Pedido no encontrada");
    }else {
        pedido.estado = "eliminado";      // <-- Baja lojica, por si tiene gastos asociados
        escribirArchivo("pedidos.json", pedidos);
        res.redirect(303, `/pedidos`);
    }
}

module.exports = {
    obtenerPedidos,
    obtenerPedidoPorId,
    formularioCrearPedido,
    crearPedido,
    formularioEditarPedido,
    editarPedido,
    eliminarPedido
};

