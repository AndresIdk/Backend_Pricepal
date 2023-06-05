const db = require('../helpers/db_conecction');

//Metodos compartido entre todos los usuarios
const buscarProductos = async (keywords) => {
    try {
        const response = await db.query('SELECT * FROM articulos WHERE nombre LIKE $1', [keywords]);
        return response.rows;
    }
    catch (error) {
        console.error('Error:', error);
        return error;
    }
}

const showOferta = async (id) => {
    try {
        const response = await db.query('SELECT * FROM articulos WHERE id_articulo = $1', [id]);
        return response.rows;
    }
    catch (error) {
        console.error('Error:', error);
        return error;
    }
}

module.exports = {
    buscarProductos,
    showOferta,
}

