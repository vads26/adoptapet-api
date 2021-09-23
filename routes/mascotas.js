// Estructura del CRUD
const router = require('express').Router();
const {
  crearMascota,
  obtenerMascota,
  modificarMascota,
  eliminarMascota,
  count
} = require('../controllers/Mascotas')

router.get('/', obtenerMascota)
router.get('/count:cat', count)
router.get('/:id', obtenerMascota)
router.post('/', crearMascota)
router.put('/:id', modificarMascota)
router.delete('/:id', eliminarMascota)

module.exports = router;