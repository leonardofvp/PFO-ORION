const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {

    if (!req.usuario) {
      return res.redirect(303, "/login");
    }

    if (!rolesPermitidos.includes(req.usuario.rol)) {
      const error = new Error("No tiene autorización para ver esta sección");
      error.status = 403;
      return next(error);
    }

    return next();
  };
};

export { verificarRol };