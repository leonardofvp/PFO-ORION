import Usuario from "../models/Usuario.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

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
      return res.status(401).render("formulario-login", {
        error: "Usuario y/o contraseña incorrectos",
        email: email
      });
    } else {
      const token = jwt.sign(
        {
          id: usuario._id,
          rol: usuario.rol,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        },
      );

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60,
      });

      res.redirect(303, "/");
    }
  } catch (error) {
    next(error);
  }
};

const cerrarSesion = async (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};

export { formularioLogin, iniciarSesion, cerrarSesion };
