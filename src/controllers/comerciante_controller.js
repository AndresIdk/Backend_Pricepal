const db = require('../helpers/db_conecction');
const by = require('bcryptjs');

// Metodo sign up comerciante
const registrarComerciante = async (elements) => {
    try {
        const { nombre, email, telefono, nacionalidad, contraseña } = elements;
        const query = 'INSERT INTO comerciantes (nombre, email, telefono, nacionalidad, contraseña) VALUES ($1, $2, $3, $4, $5)';

        // Encriptar contraseña
        const salt = await by.genSalt(10);
        const pwhash = await by.hash(contraseña, salt);
        const values = [nombre, email, telefono, nacionalidad, pwhash];

        await db.query(query, values);
        console.log('Comerciante registrado exitosamente');
        return true;
    }
    catch (error) {
        console.error('Error al registrar comerciante:', error);
        return false;
    }
};

// Metodo log in comerciante
const loginComerciante = async (elements) => {
    try {
        const { email, contraseña } = elements;
        const query = 'SELECT * FROM comerciantes WHERE email = $1';
        const values = [email];

        const result = await db.query(query, values);
        const comerciante = result.rows[0];

        if (comerciante) {
            const valid = await by.compare(contraseña, comerciante.contraseña);
            if (valid) {
                console.log('Comerciante logeado exitosamente');
                return true;
            }
            else {
                console.log('Contraseña incorrecta');
                return false;
            }
        }
    }
    catch (error) {
        console.error('Error al hacer login:', error);
        return false;
    }
}

// Metodos comerciante
const crearComercio = async (elements) => {
    try {
        const { nombre, descripcion, horario, categoria, id_comerciante } = elements;
        const query = 'INSERT INTO comercios (nombre, descripcion, horario, categoria, id_comerciante) VALUES ($1, $2, $3, $4, $5)';
        const values = [nombre, descripcion, horario, categoria, id_comerciante];

        await db.query(query, values);
        console.log('Comercio creado exitosamente');
        return true;
    } catch (error) {
        console.error('Error al crear comercio:', error);
        return false;
    }
}

const actualizarComercio = async (elements) => {
    try {
        const { nombre, descripcion, horario, categoria, id_comercio } = elements;
        const query = 'UPDATE comercios SET nombre = $1, descripcion = $2, horario = $3, categoria = $4 WHERE id_comercio = $5';
        const values = [nombre, descripcion, horario, categoria, id_comercio];

        await db.query(query, values);
        console.log('Comercio  actualizada exitosamente');
        return true;
    }
    catch (error) {
        console.log('Error al actualizar comercio:', error);
        return false;
    }
}

module.exports = {
    crearComercio,
    actualizarComercio,
    registrarComerciante,
    loginComerciante
}

