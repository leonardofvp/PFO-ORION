// Controller de gastos, aca van las funciones para el CRUD de los gastos
const {
    leerArchivo,
    escribirArchivo
} = require("../utils/jsonHelper");

const Gasto = require("../models/Gasto");

// Se incluye para validaciones, ya que los gastos estan asociados a las obras
const Obra = require("../models/Obra");

// get
const obtenerGastosJson = (req, res) => {
    const gastos = leerArchivo("gastos.json");
    res.status(200).json(gastos);
};

// get por id
const obtenerGastoPorId = (req, res) => {
    const gastos = leerArchivo("gastos.json");
    const gasto = gastos.find(g => g.id === parseInt(req.params.id));

    if (!gasto) {
        return res.status(404).json({mensaje: "Gasto no encontrado"});
    }

    res.status(200).json(gasto);
};

// post
const crearGasto = (req, res) => {
    const gastos = leerArchivo("gastos.json");
    const { id, idObra, descripcion, monto, estado, fecha } = req.body;

    //validar que la obra existe
    const obras = leerArchivo("obras.json");
    const obra = obras.find(o => o.id === parseInt(idObra));

    if (!obra) {
        return res.status(404).json({mensaje: "Obra no ecnontrada"});
    }
    //---------------------------------------------------------------

    // validar que el id del nuevo gasto no exista
    const gasto = gastos.find(g => g.id === parseInt(id));

    if (!gasto) {
         const nuevoGasto = new Gasto(
         parseInt(id),
         parseInt(idObra),
         descripcion,
         parseFloat(monto),
         estado,
        fecha
        );

        gastos.push(nuevoGasto);

        escribirArchivo("gastos.json", gastos);
        
        res.status(201).json("Creado con exitosamente!");
    } else {
        return res.status(409).json("¡Ya existe un gasto asociado al id!");
    }
    //---------------------------------------------------------------

   
};


//put

const editarGasto = (req, res) => {
    const gastos = leerArchivo("gastos.json");
    
    const id = parseInt(req.params.id);
    const gasto = gastos.find(g => g.id === id);
  
    if (!gasto) {
        return res.status(404).send("Gasto no encontrado");
    }

    const { descripcion, montoTotal, estado, idObra, fecha } = req.body;

    gasto.id = gasto.id;
    gasto.descripcion = descripcion ?? gasto.descripcion;
    gasto.montoTotal = montoTotal ?? gasto.montoTotal;
    gasto.estado = estado ?? gasto.estado;
    gasto.idObra = idObra ?? gasto.idObra;
    gasto.fecha = fecha ?? gasto.fecha;

    escribirArchivo("gastos.json", gastos);
     res.status(200).json(gasto);
};


//delete 
const eliminarGasto = (req, res) => {
    const gastos = leerArchivo("gastos.json");
    const id = parseInt(req.params.id);
    const gasto = gastos.findgasto(g => g.id === id);

    if (!gasto) {
        return res.status(404).send("Gasto no encontrado");
    }else {
        gasto.estado = "eliminado";
        escribirArchivo("gastos.json", gastos);
        res.status(204);
    }

};

module.exports = {
    obtenerGastosJson,
    obtenerGastoPorId,
    crearGasto,
    editarGasto,
    eliminarGasto
};