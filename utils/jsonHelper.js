// Funciones para leer y escribir en archivos json

const fs = require("fs");
const path = require("path");

/**
 * Lee un archivo JSON y lo convierte en un objeto/array de JavaScript.
 * * @param {string} nombreArchivo - El nombre del archivo a leer.
 * @returns {Array|Object} - Devuelve los datos procesados o un array vacío si el archivo no existe o falla.
 */
const leerArchivo = (nombreArchivo) => {
    try {
        const ruta = path.join(__dirname, nombreArchivo);
        const datos = fs.readFileSync(ruta, "utf-8");      
        
        return datos ? JSON.parse(datos) : [];

    } catch (error) {
        console.error(`Error leyendo ${nombreArchivo}:`, error);
        
        return [];
    }   
};

/**
 * Convierte datos de JavaScript a formato JSON y los guarda en el disco.
 * * @param {string} nombreArchivo - El nombre del archivo donde se guardará.
 * @param {Array|Object} contenido - La información actualizada que queremos persistir.
 * @returns {boolean} - true si la operación fue exitosa, false en caso contrario.
 */
const escribirArchivo = (nombreArchivo, contenido) => {
    try {
        const ruta = path.join(__dirname, nombreArchivo);
        const datos = JSON.stringify(contenido, null, 2);
        fs.writeFileSync(ruta, datos, "utf-8");

        return true;
        
    } catch (error) {
        console.log(`Error escribiendo en ${nombreArchivo}:`, error)

        return false;
    }
};

module.exports = {
    leerArchivo,
    escribirArchivo
}