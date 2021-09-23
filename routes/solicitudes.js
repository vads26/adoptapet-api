// Estructura del CRUD
const router = require('express').Router();
const {
    obtenerSolicitud,
    crearSolicitud,
    eliminarSolicitud,
    count
} = require('../controllers/Solicitudes')

router.get('/', obtenerSolicitud)
router.get('/count:id', count)
router.get('/:id', obtenerSolicitud)
router.post('/',crearSolicitud)
router.delete('/:id', eliminarSolicitud)

module.exports = router;