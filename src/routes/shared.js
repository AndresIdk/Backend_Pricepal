const route = require('express').Router();
const db = require('../controllers/db_controller');

// Buscar productos
route.get('/search', async (req, res) => {
    try {
        const response = await db.buscarProductos(req.body.keywords);
        res.json(response).status(200);
    } catch (error) {
        console.error('Error:', error);
        res.json({ mensaje: 'Error al buscar productos' });
    }
});

// Mostrar producto especifico
route.get('/show', async (req, res) => {
    try {
        const response = await db.showOferta(req.body.keywords);
        res.json(response);
    } catch (error) {
        console.error('Error:', error);
        res.json({ mensaje: 'Error al buscar el producto' });
    }
});

module.exports = route;