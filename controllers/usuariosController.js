// Controller de usuarios, aca van las funciones para el CRUD de las usuarios
import {
    leerArchivo,
    escribirArchivo
} from "../utils/jsonHelper.js";

import Usuario from "../models/Usuario.js";

// CRUD
const obtenerUsuariosJson = (req, res) => {
    const usuarios = leerArchivo("usuarios.json");
    res.json(usuarios);
};

const obtenerUsuarios = async (req, res) => {
    try {
        const usuariosActivos= await Usuario.find({ estado: { $ne: "eliminado" } });
        res.status(200).render("usuarios", { usuariosActivos });
    } catch (error) {
        res.status(500).send("Error al cargar la vista");
    }

};

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario || usuario.estado === "eliminado") {
            return res.status(404).send("Usuario no encontrada")
        }
        res.status(200).render("detalle-usuario", { usuario });
    } catch (error) {
        res.status(500).send("Error al buscar usuario");
    }
};

const formularioCrearUsuario = async (req, res) => {
    res.render("formulario-usuario", {
        editable: false,
        usuario: {}
    });
};

const crearUsuario = async (req, res) => {
    try {
        const nuevaUsuario = new Usuario(req.body)
        await nuevaUsuario.save();
        res.redirect(303, "/usuarios");
    } catch (error) {
        res.status(500).send("Error al crear usuario" );
        console.error(error);
    }

};

const formularioEditarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario || usuario.estado === "eliminado") {
            return res.status(404).send("Usuario no encontrada")
        }
        res.render("formulario-usuario", {
        editable: true,
        usuario: usuario
        });
    } catch (error) {
        res.status(500).send("Error al buscar usuario");
    }
};

const editarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );
        res.redirect(303, `/usuarios/detalle-usuario/${usuario.id}`);
    } catch (error) {
        res.status(500).send("Error al actualizar usuario");
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(
            req.params.id,
            { estado: "eliminado" },
            { returnDocument: "after" }
        )
        if (!usuario) {
            return res.status(404).send("Usuario no encontrada");
        }
        res.redirect(303, `/usuarios`);

    } catch (error) {
        res.status(500).send("Error al eliminar usuario");
    }
}
export {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    formularioCrearUsuario,
    crearUsuario,
    formularioEditarUsuario,
    editarUsuario,
    eliminarUsuario
};

