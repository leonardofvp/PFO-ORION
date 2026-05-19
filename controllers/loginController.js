import {
    leerArchivo,
    escribirArchivo
} from "../utils/jsonHelper.js";

import Usuario from "../models/Usuario.js";

const formularioLogin = (req, res) => {
    res.render("formulario-login");
};

const obtenerUsuario = async (req, res) =>{
	try {
        const { loginEmail, loginPassword } = req.body;
        const usuario = await Usuario.findOne({
            email: loginEmail,
            password: loginPassword
        });
        if (!usuario || usuario.estado == "eliminado") {
            res.status(404).send("Usuario y/o contraseña incorrectos");
        } else {
            global.usuarioLogueado = usuario;
            res.redirect(303, "/");
        }
    } catch (error) {
        console.error(error);
    }

};

export {
    formularioLogin,
	obtenerUsuario
};