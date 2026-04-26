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

    const obrasActivas = obras.filter(
        obra => obra.estado !== "eliminada"
    );

    res.render("obras", { obrasActivas });
};

const obtenerObraPorId = (req, res) => {
    const obras = leerArchivo("obras.json");
    const obra = obras.find(o => o.id === parseInt(req.params.id));

    if (!obra) {
        return res.status(404).send("Obra no encontrada");
    }

    if (obra.estado === "eliminada") {
        return res.status(404).send("La obra fue eliminada");
    }

    res.status(200).render("detalle-obra", { obra });
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
    
    res.redirect(303, "/obras");
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

        const obrasActivas = obras.filter(
        obra => obra.estado !== "eliminada"
    );

    const { nombre, ubicacion, presupuesto, estado } = req.body;

    obra.nombre = nombre ?? obra.nombre;
    obra.ubicacion = ubicacion ?? obra.ubicacion;
    obra.presupuesto = presupuesto ?? obra.presupuesto;
    obra.estado = estado ?? obra.estado;    
    
    escribirArchivo("obras.json", obras);
    
    res.redirect(303, `/obras/detalle-obra/${obra.id}`);
};

const eliminarObra = (req, res) => {
    const obras = leerArchivo("obras.json");
    const id = parseInt(req.params.id);

    const obra = obras.find(o => o.id === id); 
    
    if (!obra) {
        return res.status(404).send("Obra no encontrada");
    }else {
        obra.estado = "eliminada";      // <-- Baja lojica, por si tiene gastos asociados
        escribirArchivo("obras.json", obras);
        res.redirect(303, `/obras/detalle-obra/${obra.id}`);
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

