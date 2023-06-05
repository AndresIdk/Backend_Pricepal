const route = require('express').Router();
const db = require('../controllers/comerciante_controller')

// Crear comercio
route.post('/create', async (req, res) => {
    try {
        const response = await db.crearComercio(req.body);
        response ?  res.json({ mensaje: 'Comercio creado exitosamente' }) : res.json({ mensaje: 'Error al crear comercioo' });

    } catch (error) {
        console.error('Error:', error);
        res.json({ mensaje: 'Error al crear comercio' });
    }
});

// Actualizar comercio
route.put('/update', async (req, res) => {
    try {
        const response = await db.actualizarComercio(req.body);
        response ? res.json({ mensaje: 'Comercio actualizado exitosamente' }) : res.json({ mensaje: 'Error al actualizar comercio' });
    } catch (error) {
        console.error('Error:', error);
        res.json({ mensaje: 'Error al actualizar comercio' });
    }
});

module.exports = route;