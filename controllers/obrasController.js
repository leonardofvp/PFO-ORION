// Controller de obras, aca van las funciones para el CRUD de las obrasgit

/**
 * Busca una obra específica en el archivo JSON por su ID.
 * * @param {number|string} id - El identificador único de la obra a buscar.
 * @returns {Object|undefined} El objeto de la obra si se encuentra, o undefined si no existe.
 */
const buscarObraPorId = (id) => {
    const obras = leerArchivo("obras.json");
    return obras.find(o => o.id == id);
};