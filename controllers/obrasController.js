// Controller de obras, aca van las funciones para el CRUD de las obras
import {
    leerArchivo,
    escribirArchivo
} from "../utils/jsonHelper.js";

import Obra from "../models/Obra.js";
import Usuario from "../models/Usuario.js";
import ROLES from "../utils/roles.js";

// CRUD
const obtenerObrasJson = (req, res) => {
    const obras = leerArchivo("obras.json");
    res.json(obras);
};

const obtenerObras = async (req, res) => {
    try {
        const obrasActivas = await Obra.find({ estado: { $ne: "eliminada" } });
        res.status(200).render("obras", { obrasActivas });
    } catch (error) {
        res.status(500).send("Error al cargar la vista");
    }

};

const obtenerObraPorId = async (req, res) => {
    try {
        const obra = await Obra.findById(req.params.id).populate("personalAsignado");
        if (!obra || obra.estado === "eliminada") {
            return res.status(404).send("Obra no encontrada")
        }
        res.status(200).render("detalle-obra", { obra });
    } catch (error) {
        res.status(500).send("Error al buscar obra");
    }
};

const formularioCrearObra = async (req, res) => {
    res.render("formulario-obra", {
        editable: false,
        obra: {}
    });
};

const crearObra = async (req, res) => {
    try {
        const nuevaObra = new Obra(req.body)
        await nuevaObra.save();
        res.redirect(303, "/obras");
    } catch (error) {
        res.status(500).send("Error al crear obra" );
        console.error(error);
    }

};

const formularioEditarObra = async (req, res) => {
    try {
        const obra = await Obra.findById(req.params.id);
        if (!obra || obra.estado === "eliminada") {
            return res.status(404).send("Obra no encontrada")
        }
        res.render("formulario-obra", {
        editable: true,
        obra: obra
        });
    } catch (error) {
        res.status(500).send("Error al buscar obra");
    }
};

const editarObra = async (req, res) => {
    try {
        const obra = await Obra.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );
        res.redirect(303, `/obras/detalle-obra/${obra.id}`);
    } catch (error) {
        res.status(500).send("Error al actualizar obra");
    }
};

const eliminarObra = async (req, res) => {
    try {
        const obra = await Obra.findByIdAndUpdate(
            req.params.id,
            { estado: "eliminada" },
            { returnDocument: "after" }
        )
        if (!obra) {
            return res.status(404).send("Obra no encontrada");
        }
        res.redirect(303, `/obras`);

    } catch (error) {
        res.status(500).send("Error al eliminar obra");
    }
};

const renderizarAsignacion = async (req, res) => {
    try {
        const obra = await Obra.findById(req.params.id);
        const usuariosActivos = await Usuario.find({
            _id: { $nin: obra.personalAsignado },
            estado: { $ne: "eliminado" },
            rol: { $nin: [ROLES.ADMIN.id, ROLES.DIRECTOR_GENERAL.id] }
        });
        res.render("asignar-personal", { obra, usuariosActivos });
    } catch (error) {
        console.error(error)
    }
};

const asignarPersonal = async (req, res) => {
    try {
        const idObra = req.params.id;
        const idUsuario = req.body.idUsuario
        const resultado = await Obra.findByIdAndUpdate(
            idObra,
            { $addToSet: { personalAsignado: idUsuario } }
        );
        if (!resultado) {
            res.status(500).send("Error al actualizar el personal asignado");
        }
        res.redirect(303, `/obras/detalle-obra/${idObra}`);
    } catch (error) {
        console.error(error)
    }
};

export {
    obtenerObras,
    obtenerObraPorId,
    formularioCrearObra,
    crearObra,
    formularioEditarObra,
    editarObra,
    eliminarObra,
    renderizarAsignacion,
    asignarPersonal
};

