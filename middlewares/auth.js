const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!global.usuarioLogueado) {
            return res.status(401).send("Debe iniciar sesión");
        }

        if (!rolesPermitidos.includes(global.usuarioLogueado.rol)) {
            return res.status(403).send("No tiene autorización");
        }

        return next();
    }
};

export { verificarRol };