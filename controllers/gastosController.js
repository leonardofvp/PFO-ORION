// Controller de gastos, aca van las funciones para el CRUD de las gastos
import {
    leerArchivo,
    escribirArchivo
} from "../utils/jsonHelper.js";

import Gasto from "../models/Gasto.js";

// CRUD
const obtenerGastosJson = (req, res) => {
    const gastos = leerArchivo("gastos.json");
    res.json(gastos);
};

const obtenerGastos = async (req, res) => {
    try {
        const gastosActivos= await Gasto.find({ estado: { $ne: "eliminado" } });
        res.status(200).render("gastos", { gastosActivos });
    } catch (error) {
        res.status(500).send("Error al cargar la vista");
    }

};

const obtenerGastoPorId = async (req, res) => {
    try {
        const gasto = await Gasto.findById(req.params.id);
        if (!gasto || gasto.estado === "eliminado") {
            return res.status(404).send("Gasto no encontrada")
        }
        res.status(200).render("detalle-gasto", { gasto });
    } catch (error) {
        res.status(500).send("Error al buscar gasto");
    }
};

const formularioCrearGasto = async (req, res) => {
    res.render("formulario-gasto", {
        editable: false,
        gasto: {}
    });
};

const crearGasto = async (req, res) => {
    try {
        const nuevaGasto = new Gasto(req.body)
        await nuevaGasto.save();
        res.redirect(303, "/gastos");
    } catch (error) {
        res.status(500).send("Error al crear gasto" );
        console.error(error);
    }

};

const formularioEditarGasto = async (req, res) => {
    try {
        const gasto = await Gasto.findById(req.params.id);
        if (!gasto || gasto.estado === "eliminado") {
            return res.status(404).send("Gasto no encontrada")
        }
        res.render("formulario-gasto", {
        editable: true,
        gasto: gasto
        });
    } catch (error) {
        res.status(500).send("Error al buscar gasto");
    }
};

const editarGasto = async (req, res) => {
    try {
        const gasto = await Gasto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );
        res.redirect(303, `/gastos/detalle-gasto/${gasto.id}`);
    } catch (error) {
        res.status(500).send("Error al actualizar gasto");
    }
};

const eliminarGasto = async (req, res) => {
    try {
        const gasto = await Gasto.findByIdAndUpdate(
            req.params.id,
            { estado: "eliminado" },
            { returnDocument: "after" }
        )
        if (!gasto) {
            return res.status(404).send("Gasto no encontrada");
        }
        res.redirect(303, `/gastos`);

    } catch (error) {
        res.status(500).send("Error al eliminar gasto");
    }
}
export {
    obtenerGastos,
    obtenerGastoPorId,
    formularioCrearGasto,
    crearGasto,
    formularioEditarGasto,
    editarGasto,
    eliminarGasto
};

