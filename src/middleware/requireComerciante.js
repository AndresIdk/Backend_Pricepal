const requireComerciante = (req, res, next) => {

    // Verifica si el usuario tiene los permisos adecuados
    if (req.session.role == 'comerciante') {
        next();
    } else {
        res.status(403).json({ mensaje: 'Acceso no autorizado' });
    }
};

module.exports = requireComerciante;