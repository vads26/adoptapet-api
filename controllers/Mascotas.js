const mongoose = require("mongoose")
const Mascota = mongoose.model("Mascota")

function crearMascota(req, res, next) {
  let mascota = new Mascota(req.body);
  mascota.estado = 'disponible'

  mascota.save()
    .then(mas => {
          res.status(201)
              .send(mas)
    }).catch(next)
}

function obtenerMascota(req, res, next){
  if(req.params.id){
    Mascota.findById(req.params.id)
            .then(mascota => {
                res.send(mascota)
            }).catch(next)
  } else {
    Mascota.find()
      .then(mascotas => {
        res.send(mascotas)
      }).catch(next)
  } 
}

function modificarMascota(req, res,next){
  Mascota.findById(req.params.id)
    .then(mascota => {
        if (!mascota) { return res.sendStatus(401); }

        let nuevaInfo = req.body

        if (typeof nuevaInfo.nombre !== 'undefined')
          mascota.nombre = nuevaInfo.nombre
        if (typeof nuevaInfo.categoria !== 'undefined')
          mascota.categoria = nuevaInfo.categoria
        if (typeof nuevaInfo.fotos !== 'undefined')
          mascota.fotos = nuevaInfo.fotos
        if (typeof nuevaInfo.descripcion !== 'undefined')
          mascota.descripcion = nuevaInfo.descripcion
        if (typeof nuevaInfo.anunciante !== 'undefined')
          mascota.anunciante = nuevaInfo.anunciante
        if (typeof nuevaInfo.ubicacion !== 'undefined')
          mascota.ubicacion = nuevaInfo.ubicacion
        
          mascota.save()
                  .then(updated => {                                   
                        res.status(201)
                            .json(updated.publicData())
                  }).catch(next)
   }).catch(next)
}

function eliminarMascota(req, res, next){
  Mascota.findOneAndDelete({ _id: req.params.id })
    .then(r => {
          res.status(200)
              .send(`Mascota ${req.params.id} eliminada: ${r}`);
    }).catch(next)
}

function  count(req,res,next){
  var categoria = req.params.cat
  Mascota.aggregate([
    {
      '$match':{'categoria': categoria}
    },
    {
      '$count':'total'
    }
  ]).then(r => {
    res.status(200).send(r)
  })
  .catch(next)
}

//const Mascota = require('../models/Mascota');

/*
function crearMascota(req, res) {
  let mascota = new Mascota(req.body);
  res.status(201).send(mascota);
}


function eliminarMascota(req, res) {
    res.status(200).send(`Mascota ${req.params.id} eliminado`);
  }

  function modificarMascota(req, res) {
    // simulando un usuario previamente existente que el cliente modifica
    let mascota1 = new Mascota(req.params.id, 'Firulais', 'perro', 'https://petstore/photo-tobi', 'Tiene manchas negras', 'dany', 'guanajuato')
    let modificaciones = req.body
    mascota1 = { ...usuario1, ...modificaciones}
    res.send(mascota1)
  }
  
  function obtenerMascotass(req, res) {
    // Simulando dos usuarios y respondiendolos
    var mascota1 = new Mascota(1, 'Tobi', 2, 'https://petstore/photo-tobi', 'Es muy tranquilo', 'Juan', 'Jalisco')
    var mascota2 = new Mascota(2, 'Manchas', 3, 'https://petstore/photo-manchas', 'Es muy jugueton', 'Maria', 'Jalisco')
    res.send([mascota1, mascota2])
  } 
  */

// exportamos las funciones definidas
module.exports = {
    crearMascota,
    obtenerMascota,
    modificarMascota,
    eliminarMascota,
    count
  }