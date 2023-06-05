const requireTurista = (req, res, next) => {

    // Verifica si el usuario tiene los permisos adecuados
    if (req.session.role == 'turista') {
        next();
    } else {
        res.status(403).json({ mensaje: 'Acceso no autorizado' });
    }
};

module.exports = requireTurista;