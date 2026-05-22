// Controller de pedidos, aca van las funciones para el CRUD de los pedidos
import {
    leerArchivo,
    escribirArchivo
} from "../utils/jsonHelper.js";

import Pedido from "../models/Pedido.js";
import Obra from "../models/Obra.js";

// CRUD
const obtenerPedidosJson = (req, res) => {
    const pedidos = leerArchivo("pedidos.json");
    res.json(pedidos);
};

const obtenerPedidos = async (req, res) => {
    try {
        const pedidosActivos= await Pedido.find({ estado: { $ne: "eliminado" } }).populate("idObra");
        res.status(200).render("pedidos", { pedidosActivos });
    } catch (error) {
        res.status(500).send("Error al cargar la vista");
    }
};

const obtenerPedidoPorId = async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id).populate("idObra");
        if (!pedido || pedido.estado === "eliminado") {
            return res.status(404).send("Pedido no encontrado")
        }
        res.status(200).render("detalle-pedido", { pedido });
    } catch (error) {
        res.status(500).send("Error al buscar pedido");
    }
};

const formularioCrearPedido = async (req, res) => {
    const usuario = global.usuarioLogueado;
    const obras = await Obra.find(
        { personalAsignado: usuario.id }
    );
    res.render("formulario-pedido", {
        editable: false,
        pedido: {},
        obras
    });
};

const crearPedido = async (req, res) => {
    try {
        const usuario = global.usuarioLogueado;
        const datosCompletos = {
            ...req.body,
            idUsuario: usuario.id
        }
        const nuevaPedido = new Pedido(datosCompletos)
        await nuevaPedido.save();
        res.redirect(303, "/pedidos");
    } catch (error) {
        res.status(500).send("Error al crear pedido" );
        console.error(error);
    }

};

const formularioEditarPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id).populate("idObra");
        if (!pedido || pedido.estado === "eliminado") {
            return res.status(404).send("Pedido no encontrada")
        }
        res.render("formulario-pedido", {
            editable: true,
            pedido: pedido,
            obras: {}
        });
    } catch (error) {
        res.status(500).send("Error al buscar pedido");
    }
};

const editarPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );
        res.redirect(303, `/pedidos/detalle-pedido/${pedido.id}`);
    } catch (error) {
        res.status(500).send("Error al actualizar pedido");
    }
};

const eliminarPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findByIdAndUpdate(
            req.params.id,
            { estado: "eliminado" },
            { returnDocument: "after" }
        )
        if (!pedido) {
            return res.status(404).send("Pedido no encontrada");
        }
        res.redirect(303, `/pedidos`);

    } catch (error) {
        res.status(500).send("Error al eliminar pedido");
    }
}
export {
    obtenerPedidos,
    obtenerPedidoPorId,
    formularioCrearPedido,
    crearPedido,
    formularioEditarPedido,
    editarPedido,
    eliminarPedido
};

