  import { leerArchivo, escribirArchivo } from "../utils/jsonHelper.js";
  import crypto from "crypto";

  import Usuario from "../models/Usuario.js";

  const formularioLogin = (req, res) => {
    res.render("formulario-login");
  };

  const iniciarSesion = async (req, res) => {
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
        const sesionToken = crypto.randomBytes(32).toString("hex");

        usuario.sesionToken = sesionToken;
        await usuario.save();

        res.cookie("sesion", sesionToken, {
          httpOnly: true,
          sameSite: "lax",
          maxAge: 1000 * 60 * 60,
        });

        res.redirect(303, "/");
      }
    } catch (error) {
      console.log("Error al iniciar sesión");
      console.error(error);
    }
  };

  const cerrarSesion = async (req, res) => {
    if (req.usuario) {
      req.usuario.sesionToken = null;
      await req.usuario.save();
    }

    res.clearCookie("sesion");
    res.redirect("/login");
  };

  export { formularioLogin, iniciarSesion, cerrarSesion };
