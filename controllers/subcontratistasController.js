// Controller de subcontratistas, aca van las funciones para el CRUD de las subcontratistas
import {
    leerArchivo,
    escribirArchivo
} from "../utils/jsonHelper.js";

import Subcontratista from "../models/Subcontratista.js";

// CRUD
const obtenerSubcontratistasJson = (req, res) => {
    const subcontratistas = leerArchivo("subcontratistas.json");
    res.json(subcontratistas);
};

const obtenerSubcontratistas = async (req, res) => {
    try {
        const subcontratistasActivos= await Subcontratista.find({ estado: { $ne: "eliminado" } });
        res.status(200).render("subcontratistas", { subcontratistasActivos });
    } catch (error) {
        res.status(500).send("Error al cargar la vista");
        console.error(error);
    }

};

const obtenerSubcontratistaPorId = async (req, res) => {
    try {
        const subcontratista = await Subcontratista.findById(req.params.id);
        if (!subcontratista || subcontratista.estado === "eliminado") {
            return res.status(404).send("Subcontratista no encontrado")
        }
        res.status(200).render("detalle-subcontratista", { subcontratista });
    } catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
};

const formularioCrearSubcontratista = async (req, res) => {
    res.render("formulario-subcontratista", {
        editable: false,
        subcontratista: {}
    });
};

const crearSubcontratista = async (req, res) => {
    try {
        const nuevaSubcontratista = new Subcontratista(req.body)
        await nuevaSubcontratista.save();
        res.redirect(303, "/subcontratistas");
    } catch (error) {
        res.status(500).send("Error al crear subcontratista" );
        console.error(error);
    }

};

const formularioEditarSubcontratista = async (req, res) => {
    try {
        const subcontratista = await Subcontratista.findById(req.params.id);
        if (!subcontratista || subcontratista.estado === "eliminado") {
            return res.status(404).send("Subcontratista no encontrado")
        }
        res.render("formulario-subcontratista", {
            editable: true,
            subcontratista: subcontratista
        });
    } catch (error) {
        res.status(500).send("Error al cargar el frmulario");
        console.error(error);
    }
};

const editarSubcontratista = async (req, res) => {
    try {
        const subcontratista = await Subcontratista.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );
        res.redirect(303, `/subcontratistas/detalle-subcontratista/${subcontratista.id}`);
    } catch (error) {
        res.status(500).send("Error al editar el subcontratista");
        console.error(error);

    }
};

const eliminarSubcontratista = async (req, res) => {
    try {
        const subcontratista = await Subcontratista.findByIdAndUpdate(
            req.params.id,
            { estado: "eliminado" },
            { returnDocument: "after" }
        )
        if (!subcontratista) {
            return res.status(404).send("Subcontratista no encontrado");
        }
        res.redirect(303, `/subcontratistas`);

    } catch (error) {
        res.status(500).send("Error al eliminar el subcontratista");
        console.error(error);
    }
}
export {
    obtenerSubcontratistas,
    obtenerSubcontratistaPorId,
    formularioCrearSubcontratista,
    crearSubcontratista,
    formularioEditarSubcontratista,
    editarSubcontratista,
    eliminarSubcontratista
};

