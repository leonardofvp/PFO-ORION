// Controller de gastos, aca van las funciones para el CRUD de los gastos
const {
    leerArchivo,
    escribirArchivo
} = require("../utils/jsonHelper");

const Gasto = require("../models/Gasto");

// Se incluye para validaciones, ya que los gastos estan asociados a las obras
const Obra = require("../models/Obra");

// get All
const obtenerGastosJson = (req, res) => {
    const gastos = leerArchivo("gastos.json");

    //para no mostrar los gastos eliminados, se filtran los gastos que no tienen el estado "eliminado"
    const gastosActivos = gastos.filter(
        gasto => gasto.estado !== "eliminado"
    );
    res.status(200).json(gastos);
};

// get por id
const obtenerGastoPorId = (req, res) => {
    const gastos = leerArchivo("gastos.json");
    const gasto = gastos.find(g => g.id === parseInt(req.params.id));

    if (!gasto) {
        return res.status(404).json({mensaje: "Gasto no encontrado"});
    }

    // para no mostrar los gastos eliminados, se verifica si el gasto tiene el estado "eliminado", 
    // si es asi, se retorna un mensaje indicando que el gasto fue eliminado.
     if (gasto.estado === "eliminado") {
        return res.status(404).json({
            mensaje: "El gasto fue eliminado"
        });
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
   
};


//put
const editarGasto = (req, res) => {
    const gastos = leerArchivo("gastos.json");
    const obras = leerArchivo("obras.json");

    // Buscar el gasto por id
    const id = parseInt(req.params.id);
    const gasto = gastos.find(g => g.id === id);

    //validar si existe el gasto
    if (!gasto) {
        return res.status(404).send("Gasto no encontrado");
    }

    //buscmos la obra asiciada al gasto
    const idObr = parseInt(req.body.idObra);
    const obra = obras.find(o => o.id === idObr);

    //validamos que exista la obra
    if (!obra) {
        return res.status(404).json({mensaje: "Obra no ecnontrada"});
    }

    //tomamos los datos del que se quieren modificar
    const { descripcion, montoTotal, estado, idObra, fecha } = req.body;

    gasto.id = gasto.id;
    gasto.descripcion = descripcion ?? gasto.descripcion;
    
    gasto.montoTotal = montoTotal ?? gasto.montoTotal;
    gasto.estado = estado ?? gasto.estado;
    gasto.idObra = idObra ?? gasto.idObra;
    gasto.fecha = fecha ?? gasto.fecha;

    //validamos el monto y verificamos si es igual al monto asociado en la obra, 
    // si no es asi, se actualiza el monto de la obra con el nuevo monto del gasto.
    if (gasto.montoTotal !== obra.montoTotal) {
        obra.montoTota = gasto.montoTotal;
        escribirArchivo("obras.json", obras);
    }

    escribirArchivo("gastos.json", gastos);
     res.status(200).json(gasto);
};


//delete implementamos un borrado logico, cambiando el estado del gasto a "eliminado", 
// de esta forma no se borra el gasto del archivo json, 
// pero se marca como eliminado para que no se muestre en las consultas.
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