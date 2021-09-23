const mongoose = require("mongoose")
const Solicitud = mongoose.model("Solicitud")

function obtenerSolicitud(req, res, next){
    if(req.params.id){
      Solicitud.findById(req.params.id).then(sol => {
          res.send(sol)
        }).catch(next)
    } else {
      Solicitud.find().then(solicitudes => {
        res.send(Solicitudes)
      }).catch(next)
    }
  }

  
function crearSolicitud(req, res, next) {
    let solicitud = new Solicitud(req.body);
    solicitud
      .save()
      .then((solicitud) => {
        res.status(200).send(solicitud);
      })
      .catch(next);
  }

  
function eliminarSolicitud(req, res, next){
    Solicitud.findOneAndDelete({ _id: req.params.id })
      .then(r => {
            res.status(200)
                .send(`Solicitud ${req.params.id} eliminada: ${r}`);
      }).catch(next)
  }

function  count(req,res,next){
    var idMascota = req.params.cat
    Solicitud.aggregate([
      {
        '$match':{'idMascota': idMascota}
      },
      {
        '$count':'total'
      }
    ]).then(r => {
      res.status(200).send(r)
    })
    .catch(next)
  }

  module.exports = {
    obtenerSolicitud,
    crearSolicitud,
    eliminarSolicitud,
    count
  }