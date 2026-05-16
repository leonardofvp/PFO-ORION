// Controller de usuarios, aca van las funciones para el CRUD de las usuarios
const {
    leerArchivo,
    escribirArchivo
} = require("../utils/jsonHelper");

const Usuario = require("../models/Usuario");

// CRUD
const obtenerUsuariosJson = (req, res) => {
    const usuarios = leerArchivo("usuarios.json");
    res.json(usuarios);
};

const obtenerUsuarios = (req, res) => {
    const usuarios = leerArchivo("usuarios.json");

    const usuariosActivos = usuarios.filter(
        usuario => usuario.estado !== "eliminado"
    );

    res.render("usuarios", { usuariosActivos });
};

const obtenerUsuarioPorId = (req, res) => {
    const usuarios = leerArchivo("usuarios.json");
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));

    if (!usuario) {
        return res.status(404).send("Usuario no encontrado");
        console.log("Usuario no encontrado con ID:", id);
    }

    if (usuario.estado === "eliminado") {
        return res.status(404).send("La usuario fue eliminado");
    }

    res.status(200).render("detalle-usuario", { usuario });
};

const formularioCrearUsuario = (req, res) => {
    res.render("formulario-usuario", {
        editable: false,
        usuario: {}
    });
};

const crearUsuario = (req, res) => {
    const usuarios = leerArchivo("usuarios.json");

    const { id, nombre, apellido, email, password, rol, estado } = req.body;
    const nuevoUsuario = new Usuario(
        parseInt(id),
        nombre,
        apellido,
        email,
        password,
        rol,
        estado
    );

    usuarios.push(nuevoUsuario);

    escribirArchivo("usuarios.json", usuarios);

    res.redirect(303, "/usuarios");
};

const formularioEditarUsuario = (req, res) => {
        const id = parseInt(req.params.id);
        const usuarios = leerArchivo("usuarios.json");
        const usuario = usuarios.find(o => o.id === id);

        if (!usuario) {
            return res.status(404).send("Usuario no encontrada");
        }

        res.render("formulario-usuario", {
        editable: true,
        usuario: usuario
    });
};

const editarUsuario = (req, res) => {
    const usuarios = leerArchivo("usuarios.json");

    const id = parseInt(req.params.id);
    const usuario = usuarios.find(o => o.id === id);

    if (!usuario) {
        return res.status(404).send("Usuario no encontrada");
    }

        const obrasActivas = usuarios.filter(
        usuario => usuario.estado !== "eliminado"
    );

    const { nombre, apellido, email, password, rol, estado } = req.body;

    usuario.nombre = nombre ?? usuario.nombre;
    usuario.apellido = apellido ?? usuario.apellido;
    usuario.email = email ?? usuario.email;
    usuario.password = password ?? usuario.password;
    usuario.rol = rol ?? usuario.rol;
    usuario.estado = estado ?? usuario.estado;

    escribirArchivo("usuarios.json", usuarios);

    res.redirect(303, `/usuarios/detalle-usuario/${usuario.id}`);
};

const eliminarUsuario = (req, res) => {
    const usuarios = leerArchivo("usuarios.json");
    const id = parseInt(req.params.id);

    const usuario = usuarios.find(o => o.id === id);

    if (!usuario) {
        return res.status(404).send("Usuario no encontrada");
    }else {
        usuario.estado = "eliminado";      // <-- Baja lojica, por si tiene gastos asociados
        escribirArchivo("usuarios.json", usuarios);
        res.redirect(303, `/usuarios`);
    }
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    formularioCrearUsuario,
    crearUsuario,
    formularioEditarUsuario,
    editarUsuario,
    eliminarUsuario
};

