import Usuario from "../models/Usuario.js";

const leerCookies = (req) => {
  const header = req.headers.cookie;

  if (!header) {
    return {};
  }

  const arrayCookies = header.split(";");
  const cookiesParseadas = arrayCookies.reduce((cookies, cookie) => {
    const [nombre, valor] = cookie.trim().split("=");
    cookies[nombre] = decodeURIComponent(valor);
    return cookies;
  }, {});

  return cookiesParseadas;
};

const obtenerUsuarioDeCookie = async (req) => {
  const cookies = leerCookies(req);
  const sesionToken = cookies.sesion;

  if (!sesionToken) {
    return null;
  }

  const usuario = await Usuario.findOne({ sesionToken });

  return usuario;
};

const protegerRuta = async (req, res, next) => {
  const usuario = await obtenerUsuarioDeCookie(req);

  if (!usuario) {
    res.clearCookie("sesion");
    return res.redirect("/login");
  }

  req.usuario = usuario;
  res.locals.usuario = usuario;
  res.locals.usuarioLogueado = true;

  next();
};

const cargarUsuario = async (req, res, next) => {
  res.locals.usuarioLogueado = false;
  res.locals.usuario = null;

  const usuario = await obtenerUsuarioDeCookie(req);

  if (usuario) {
    req.usuario = usuario;
    res.locals.usuario = usuario;
    res.locals.usuarioLogueado = true;
  }

  next();
};

export { protegerRuta, cargarUsuario };
