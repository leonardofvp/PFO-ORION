// Controller de gastos, aca van las funciones para el CRUD de los gastos

/**
 * Busca un gasto específico en el archivo JSON por su ID.
 * * @param {number|string} id - El identificador único del gasto a buscar.
 * @returns {Object|undefined} El objeto del gasto si se encuentra, o undefined si no existe.
 */
const buscarGastoPorId = (id) => {
    const gastos = leerArchivo("gastos.json");
    return obras.find(g => g.id == id);
};