// Controller de usuarios, aca van las funciones para el CRUD de las usuarios
import { leerArchivo, escribirArchivo } from "../utils/jsonHelper.js";

import Usuario from "../models/Usuario.js";
import { validationResult } from "express-validator";

// CRUD
const obtenerUsuariosJson = (req, res) => {
  const usuarios = leerArchivo("usuarios.json");

  res.json(usuarios);
};

const obtenerUsuarios = async (req, res, next) => {
  try {
    const usuariosActivos = await Usuario.find({
      estado: { $ne: "eliminado" },
    });

    res.status(200).render("usuarios", {
      usuariosActivos,
      usuarioSesion: req.usuario,
    });
  } catch (error) {
    next(error);
  }
};

const obtenerUsuarioPorId = async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario || usuario.estado === "eliminado") {
      const error = new Error("Usuario no encontrada");
      error.status = 404;
      return next(error);
    }

    res
      .status(200)
      .render("detalle-usuario", { usuarioSesion: req.usuario, usuario });
  } catch (error) {
    next(error);
  }
};

const formularioCrearUsuario = (req, res) => {
  res.render("formulario-usuario", {
    editable: false,
    usuario: {},
  });
};

const crearUsuario = async (req, res, next) => {
  try {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.render("formulario-usuario", {
        editable: false,
        usuario: { ...req.body },
        errores: errores.array(),
      });
    }

    const { password, ...datosUsuario } = req.body;
    const passwordLimpio = password?.trim() || "";
    const { salt, passwordHash } = Usuario.crearPasswordSeguro(passwordLimpio);

    const nuevaUsuario = new Usuario({ ...datosUsuario, salt, passwordHash });

    await nuevaUsuario.save();
    res.redirect(303, "/login");
  } catch (error) {
    next(error);
  }
};

const formularioEditarUsuario = async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario || usuario.estado === "eliminado") {
      const error = new Error("Usuario no encontrada");
      error.status = 404;
      return next(error);
    }

    res.render("formulario-usuario", {
      editable: true,
      usuario: usuario,
      usuarioSesion: req.usuario,
    });
  } catch (error) {
    next(error);
  }
};

const editarUsuario = async (req, res, next) => {
  try {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.render("formulario-usuario", {
        editable: true,
        usuario: { ...req.body, id: req.params.id },
        errores: errores.array(),
      });
    }

    const { password, ...datosUsuario } = req.body;

    if (password && password.trim() !== "") {
      const { salt, passwordHash } = Usuario.crearPasswordSeguro(password);
      datosUsuario.salt = salt;
      datosUsuario.passwordHash = passwordHash;
    }

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      datosUsuario,
      { returnDocument: "after" },
    );

    res.redirect(303, `/usuarios/detalle-usuario/${usuario.id}`);
  } catch (error) {
    next(error);
  }
};

const eliminarUsuario = async (req, res, next) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { estado: "eliminado" },
      { returnDocument: "after" },
    );

    if (!usuario) {
      const error = new Error("Usuario no encontrada");
      error.status = 404;
      return next(error);
    }

    res.redirect(303, `/usuarios`);
  } catch (error) {
    next(error);
  }
};

export {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  formularioCrearUsuario,
  crearUsuario,
  formularioEditarUsuario,
  editarUsuario,
  eliminarUsuario,
};
