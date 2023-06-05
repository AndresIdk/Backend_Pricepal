const route = require('express').Router();
const db_comerciante = require('../controllers/comerciante_controller')
const db_turista = require('../controllers/turista_controller')

// Log in comerciante
route.get('/loginC', async (req, res) => {
    try {
        const response = await db_comerciante.loginComerciante(req.body);
        if (response) {
            req.session.role = 'comerciante';
            res.json({ mensaje: 'Comerciante logeado exitosamente' });
            // res.redirect('/dashboard');
        } else {
            res.json({ mensaje: 'Contraseña incorrecta' });
        }
    }
    catch (error) {
        console.error('Error:', error);
        res.json({ mensaje: 'Error al hacer login' });
    }
});

// sign up comerciante
route.post('/signupC', async (req, res) => {
    try {
        const response = await db_comerciante.registrarComerciante(req.body);
        if (response) {
            res.json({ mensaje: 'Comerciante registrado exitosamente' });
        } else {
            res.json({ mensaje: 'Error al registrar comerciante' });
        }
    }catch (error) {
        console.error('Error:', error);
        res.json({ mensaje: 'Error al hacer signup' });
    }
});

// Log in turista
route.get('/loginT', async (req, res) => {
    try {
        const response = await db_turista.loginTurista(req.body);
        if (response) {
            req.session.role = 'turista';
            res.json({ mensaje: 'Turista logeado exitosamente' });
            // res.redirect('/dashboard');
        } else {
            res.json({ mensaje: 'Contraseña incorrecta' });
        }
    }
    catch (error) {
        console.error('Error:', error);
        res.json({ mensaje: 'Error al hacer login' });
    }
});

// sign up turista
route.post('/signupT', async (req, res) => {
    try {
        const response = await db_turista.registrarTurista(req.body);
        if (response) {
            res.json({ mensaje: 'Turista registrado exitosamente' });
        } else {
            res.json({ mensaje: 'Error al registrar turista' });
        }
    }catch (error) {
        console.error('Error:', error);
        res.json({ mensaje: 'Error al hacer signup' });
    }
});   

module.exports = route;