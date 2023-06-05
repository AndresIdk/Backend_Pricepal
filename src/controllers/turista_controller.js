const db = require('../helpers/db_conecction');
const by = require('bcryptjs');

// Metodo sign up turista
const registrarTurista = async (elements) => {
    try {
        const { nombre, email, telefono, nacionalidad, contraseña, id_ciudad } = elements;
        const query = 'INSERT INTO turistas (nombre, email, telefono, nacionalidad, contraseña, id_ciudad) VALUES ($1, $2, $3, $4, $5, $6)';

        // Encriptar contraseña
        const salt = await by.genSalt(10);
        const pwhash = await by.hash(contraseña, salt);
        const values = [nombre, email, telefono, nacionalidad, pwhash, id_ciudad];

        await db.query(query, values);
        console.log('Turista registrado exitosamente');
        return true;
    }
    catch (error) {
        console.error('Error al registrar turista:', error);
        return false;
    }
};

// Metodo log in turista
const loginTurista = async (elements) => {
    try {
        const { email, contraseña } = elements;
        const query = 'SELECT * FROM turistas WHERE email = $1';
        const values = [email];

        const result = await db.query(query, values);
        const turista = result.rows[0];

        if (turista) {
            const valid = await by.compare(contraseña, turista.contraseña);
            if (valid) {
                console.log('Turista logeado exitosamente');
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

// Metodos turista
const calificarComercio = async (rate) => {
    try {
        const { id_oferta, calificacion } = rate;
        const query = 'UPDATE ofertas SET calificacion = $1 WHERE id_oferta = $2';
        const values = [calificacion, id_oferta];

        db.query(query, values, (error, result) => {
            if (error) {
                console.error('Error al calificar oferta:', error);
            } else {
                console.json({ mensaje: 'Oferta calificada correctamente' });
                return 1;
            }
        });
        // const prom = db.query('SELECT AVG(calificacion) FROM ofertas WHERE id_comerciante = $1', [id_comerciante]);
    }
    catch(error){
        console.error('Error:', error);
        return 0;
    }
}

module.exports = {
    calificarComercio,
    loginTurista,
    registrarTurista
}