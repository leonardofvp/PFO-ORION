import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";

const protegerRuta = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(payload.id);

    if (!usuario || usuario.estado === "eliminado") {
      res.clearCookie("token");
      return res.redirect("/login");
    }

    req.usuario = usuario;
    res.locals.usuario = usuario;
    res.locals.usuarioLogueado = true;
  } catch (error) {
    res.clearCookie("token");
    return res.redirect("/login");
  }

  next();
};

const cargarUsuario = async (req, res, next) => {
  res.locals.usuarioLogueado = false;
  res.locals.usuario = null;

  const token = req.cookies.token;

  if (!token) {
    return next();
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(payload.id);

    if (usuario && usuario.estado !== "eliminado") {
      req.usuario = usuario;
      res.locals.usuario = usuario;
      res.locals.usuarioLogueado = true;
    }
  } catch (error) {
    res.clearCookie("token");
  }

  next();
};

export { protegerRuta, cargarUsuario };
