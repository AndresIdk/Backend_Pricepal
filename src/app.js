const express = require("express")
const app = express()

const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(
    session({
        secret: process.env.SE_SECRET, // Clave secreta utilizada para cifrar la sesión
        resave: false, // No guardar la sesión si no hay cambios
        saveUninitialized: false, // No guardar sesiones no inicializadas
    })
);

// Middlewares de autenticación
const requireTurista = require('./middleware/requireTurista');
const requireComerciante = require('./middleware/requireComerciante');

// Routes
app.use("/turista", requireTurista, require("./routes/turista"));
app.use("/comerciante", requireComerciante, require("./routes/comerciante"));
app.use("/shared", require("./routes/shared"));
app.use("/authentication", require("./routes/authentication"));

// Interfaz de inicio
app.get('/dashboard', (req, res) => {
    res.send('Hello World!')
})

// Starting the server
app.listen(3000, () => {
    console.log("Server corriendo en port 3000")
})