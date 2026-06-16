const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).send("Debe iniciar sesión");
    }

    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).send("No tiene autorización");
    }

    return next();
  };
};

export { verificarRol };
