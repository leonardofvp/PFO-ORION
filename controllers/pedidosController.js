// Controller de pedidos, aca van las funciones para el CRUD de los pedidos
import { leerArchivo, escribirArchivo } from "../utils/jsonHelper.js";

import Pedido from "../models/Pedido.js";
import Obra from "../models/Obra.js";
import ROLES from "../utils/roles.js";
import { validationResult } from "express-validator";

// CRUD
const obtenerPedidosJson = (req, res) => {
  const pedidos = leerArchivo("pedidos.json");
  res.json(pedidos);
};

const obtenerPedidos = async (req, res, next) => {
  try {
    const pedidosActivos = await Pedido.find({
      estado: { $ne: "eliminado" },
    }).populate("idObra");

    res.status(200).render("pedidos", { pedidosActivos });
  } catch (error) {
    next(error);
  }
};

const obtenerPedidoPorId = async (req, res, next) => {
  try {
    const pedido = await Pedido.findById(req.params.id).populate("idObra");

    if (!pedido || pedido.estado === "eliminado") {
      const error = new Error("Pedido no encontrada");
      error.status = 404;
      return next(error);
    }

    res.status(200).render("detalle-pedido", { pedido });
  } catch (error) {
    next(error);
  }
};

const formularioCrearPedido = async (req, res, next) => {
  const usuario = req.usuario;
  let obras;

  try {
    if (
      usuario.rol == ROLES.ADMIN.id ||
      usuario.rol == ROLES.DIRECTOR_GENERAL.id ||
      usuario.rol == ROLES.ADMINISTRACION_CENTRAL.id
    ) {
      obras = await Obra.find({ estado: { $ne: "eliminado" } });
    } else {
      obras = await Obra.find({
        personalAsignado: usuario._id,
        estado: { $ne: "eliminado" },
      });
    }

    res.render("formulario-pedido", {
      editable: false,
      pedido: {},
      obras,
    });
  } catch (error) {
    next(error);
  }
};

const crearPedido = async (req, res, next) => {
  try {
    const errores = validationResult(req);
    const usuario = req.usuario;

    if (!errores.isEmpty()) {
      let obras;

      if (
        usuario.rol === ROLES.ADMIN.id ||
        usuario.rol === ROLES.DIRECTOR_GENERAL.id ||
        usuario.rol === ROLES.ADMINISTRACION_CENTRAL.id
      ) {
        obras = await Obra.find({ estado: { $ne: "eliminado" } });
      } else {
        obras = await Obra.find({
          personalAsignado: usuario._id,
          estado: { $ne: "eliminado" },
        });
      }

      return res.render("formulario-pedido", {
        editable: false,
        pedido: req.body,
        obras: obras,
        errores: errores.array(),
      });
    }

    const datosCompletos = {
      ...req.body,
      idUsuario: usuario.id,
    };

    const nuevoPedido = new Pedido(datosCompletos);
    await nuevoPedido.save();

    res.redirect(303, "/pedidos");
  } catch (error) {
    next(error);
  }
};

const formularioEditarPedido = async (req, res, next) => {
  try {
    const pedido = await Pedido.findById(req.params.id).populate("idObra");

    if (!pedido || pedido.estado === "eliminado") {
      const error = new Error("Pedido no encontrada");
      error.status = 404;
      return next(error);
    }

    res.render("formulario-pedido", {
      editable: true,
      pedido: pedido,
      obras: {},
    });
  } catch (error) {
    next(error);
  }
};

const editarPedido = async (req, res, next) => {
  try {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      const obraOriginal = await Obra.findById(req.body.idObra);

      return res.render("formulario-pedido", {
        editable: true,
        pedido: {
          ...req.body,
          id: req.params.id,
          idObra: {
            id: obraOriginal._id,
            nombre: obraOriginal.nombre,
          },
        },
        errores: errores.array(),
      });
    }

    // 2. Solo si la validación es exitosa, se actualiza el documento
    const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });

    if (!pedido) {
      const error = new Error("Pedido no encontrado");
      error.status = 404;
      return next(error);
    }

    res.redirect(303, `/pedidos/detalle-pedido/${pedido.id}`);
  } catch (error) {
    next(error);
  }
};

const eliminarPedido = async (req, res, next) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(
      req.params.id,
      { estado: "eliminado" },
      { returnDocument: "after" },
    );

    if (!pedido) {
      const error = new Error("Pedido no encontrada");
      error.status = 404;
      return next(error);
    }

    res.redirect(303, `/pedidos`);
  } catch (error) {
    next(error);
  }
};
export {
  obtenerPedidos,
  obtenerPedidoPorId,
  formularioCrearPedido,
  crearPedido,
  formularioEditarPedido,
  editarPedido,
  eliminarPedido,
};
