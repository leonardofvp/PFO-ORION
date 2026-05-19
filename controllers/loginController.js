import {
    leerArchivo,
    escribirArchivo
} from "../utils/jsonHelper.js";

import Usuario from "../models/Usuario.js";

const formularioLogin = (req, res) => {
    res.render("formulario-login");
};

const obtenerUsuario = (req, res) =>{
	const usuarios = leerArchivo("usuarios.json");
	const { email, password } = req.body;

	const usuario = usuarios.find(u => u.email == email && u.password == password);

	if (!usuario || usuario.estado == "eliminado") {
        console.log("nada");
		res.status(404).send("Usuario y/o contraseña incorrectos");
	} else {
        global.usuarioLogueado = usuario;
		res.redirect(303, "/");
	}
}

export {
    formularioLogin,
	obtenerUsuario
};