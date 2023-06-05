const route = require('express').Router();
const db = require('../controllers/turista_controller')

// Calificar comercio
route.put('/rate', async (req, res) => {
    try {
        const response = await db.calificarComercio(req.body.rate);
        res.json(response).status(200);
        res.json({ mensaje: 'Comercio calificado exitosamente' });
    } catch (error) {
        console.error('Error:', error);
        res.json({ mensaje: 'Error al calificar comercio' });
    }
});

module.exports = route;
