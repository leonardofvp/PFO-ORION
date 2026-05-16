const {
    leerArchivo,
    escribirArchivo
} = require("../utils/jsonHelper");

const Usuario = require("../models/Usuario");

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
		res.status(200).send(`Bienbenido: ${usuario.nombre} ${usuario.apellido}`);
	}
}

module.exports = {
    formularioLogin,
	obtenerUsuario
};