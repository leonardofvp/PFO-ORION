// Controller de obras, aca van las funciones para el CRUD de las obras
const {
    leerArchivo,
    escribirArchivo
} = require("../utils/jsonHelper");

const Obra = require("../models/Obra");

// CRUD
const obtenerObrasJson = (req, res) => {
    const obras = leerArchivo("obras.json");
    res.json(obras);
};

const obtenerObras = (req, res) => {
    const obras = leerArchivo("obras.json");
    res.render("obras", { obras });
};

const obtenerObraPorId = (req, res) => {
    const obras = leerArchivo("obras.json");
    const obra = obras.find(o => o.id === parseInt(req.params.id));

    if (!obra) {
        return res.status(404).json({mensaje: "Obra no ecnontrada"});
    }

    res.render("detalle-obra", { obra });
};

const formularioCrearObra = (req, res) => {
    res.render("formulario-obra", {
        editable: false,
        obra: {}
    });
};

const crearObra = (req, res) => {
    const obras = leerArchivo("obras.json");
  
    const { id, nombre, ubicacion, presupuesto, estado } = req.body;
    const nuevaObra = new Obra(
        parseInt(id), 
        nombre, 
        ubicacion, 
        parseFloat(presupuesto), // <--- El prespuesto deberia ser el calculo de los gastos
        estado 
    );

    obras.push(nuevaObra);

    escribirArchivo("obras.json", obras);
    
    res.status(201);

    res.redirect("/obras");
};

const formularioEditarObra = (req, res) => {
        const id = parseInt(req.params.id);
        const obras = leerArchivo("obras.json");
        const obra = obras.find(o => o.id === id);

        if (!obra) {
            return res.status(404).send("Obra no encontrada");
        }

        res.render("formulario-obra", {
        editable: true,
        obra: obra
    });
};

const editarObra = (req, res) => {
    const obras = leerArchivo("obras.json");
    
    const id = parseInt(req.params.id);
    const obra = obras.find(o => o.id === id);
  
    if (!obra) {
        return res.status(404).send("Obra no encontrada");
    }

    const { nombre, ubicacion, presupuesto, estado } = req.body;

    obra.id = obra.id;
    obra.nombre = nombre ?? obra.nombre;
    obra.ubicacion = ubicacion ?? obra.ubicacion;
    obra.presupuesto = presupuesto ?? obra.presupuesto;
    obra.estado = estado ?? obra.estado;    
    
    escribirArchivo("obras.json", obras);
    
    res.redirect(`/obras/detalle-obra/${obra.id}`);
};

const eliminarObra = (req, res) => {
    const obras = leerArchivo("obras.json");
    const gastos = leerArchivo("gastos.json"); // <-- Necesario para saber si la obra tiene gastos asociados
    const id = parseInt(req.params.id);

    const tieneGastos = gastos.some(g => parseInt(g.idObra) === id);

    if (tieneGastos) { // Si hay gastos asociados, se hace una baja logica marcandola como inactiva
        const obra = obras.find(o => o.id === id); 
        obra.estado = "inactiva";
        escribirArchivo("obras.json", obras);
        res.redirect(`/obras/detalle-obra/${obra.id}`);
    }else{ // Si no hay gastos asociados, se elimina
        const obrasFiltradas = obras.filter(o => o.id !== id);
        escribirArchivo("obras.json", obrasFiltradas);
        res.redirect("/obras");
    }
}

module.exports = {
    obtenerObras,
    obtenerObraPorId,
    formularioCrearObra,
    crearObra,
    formularioEditarObra,
    editarObra,
    eliminarObra
};

