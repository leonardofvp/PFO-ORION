import { leerArchivo, escribirArchivo } from "../utils/jsonHelper.js";

import Usuario from "../models/Usuario.js";

const formularioLogin = (req, res) => {
  res.render("formulario-login");
};

const obtenerUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({
      email,
    });
    if (
      !usuario ||
      usuario.estado == "eliminado" ||
      !usuario.validarPassword(password)
    ) {
      res.status(404).send("Usuario y/o contraseña incorrectos");
    } else {
      global.usuarioLogueado = usuario;
      res.redirect(303, "/");
    }
  } catch (error) {
    console.log("Error al iniciar sesión");
    console.error(error);
  }
};

export { formularioLogin, obtenerUsuario };
