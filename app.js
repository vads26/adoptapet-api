const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var isProduction = process.env.NODE_ENV === 'production';

/*********************** Mongoose Configuration *******************************/
const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGODB_URI, // obtiene la url de conexión desde las variables de entorno
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
  );

mongoose.set("debug", true);

/*********************** Mongoose Configuration *******************************/

require('./models/Usuario');
require('./models/Mascota');
require('./models/Solicitud');

//Configurando las rutas
app.use('/v1', require('./routes'));

require('./config/passport');

// Iniciando el servidor
const PORT = 4001;
var server = app.listen(process.env.PORT || 3000,() => {
    console.log('Escuchando en el puerto ' + server.address().port);
});


/*
const gods =[
    {name:'Zeus'},
    {name:'Hades'},
    {name:'Hermes'},
]

app.get('/gods',(req,resp,next)=>{
    resp.send(gods);
})

const constelaciones = [ 
    {
        Andromeda : {
                    abreviatura : 'And',
                    superficie :  722.3,
                    num_estrellas : 152,
                    estr_mas_brillante : 'Alpheratz' 
                }
    },
    {
        Draco : {
                    abreviatura : 'Dra',
                    superficie :  1083.0,
                    num_estrellas : 211,
                    estr_mas_brillante : 'Etamin' 
                }
    },
    {
        Pegaso : {
                    abreviatura : 'Peg',
                    superficie :  1120.8,
                    num_estrellas : 177 ,
                    estr_mas_brillante : 'Enif' 
                }
    },
    {
        Lyra : {
                    abreviatura : 'Lyr',
                    superficie :  286.5,
                    num_estrellas : 73 ,
                    estr_mas_brillante : 'Vega' 
                }
    },
    {
        Perseo : {
                    abreviatura : 'Per',
                    superficie :  615,
                    num_estrellas : 158,
                    estr_mas_brillante : 'Mirfak' 
                }
    }
]

app.get('/constelaciones',(req,resp,next)=>{
    resp.send(constelaciones);
})

const gods1 = { 
    Zeus: { live: 'Olympus', symbol: 'Thunderbolt' }, 
    Hades : { live : 'Underworld', symbol: 'Cornucopia' } 
  };

  app.get('/gods/:name', (req, res, next) => {
    const good = gods1[req.params.name];
    if (good) {
        res.send(good);
    } else {
        res.status(404).send('Good Not Found');
    }
  });


  app.get('/constelaciones/:name', (req, res, next) => {
    let valorItem;
    constelaciones.forEach(element => {
        for (const key in element) {
            const item = element[key];
            for (const iterator in item) {
                console.log(iterator);
            }
            //console.log(item);
        }
    });
    res.status(valorItem);
  });

  app.put('/gods/:name', (req,res) => {
    const god = req.body;
    gods1[req.params.name] = god
    res.send(gods1);
  })

  app.post('/gods', (req, res) => {
    const name = req.query.name
    const newGod = req.body;
    gods1[name] = newGod;
    res.status(200).send(gods1);
  })

  app.delete('/gods/:name', (req, res) =>{
    const name = req.params.name;
    if (delete gods[name]){
      res.send(gods)
    } else {
      res.status(500)
    }
  })
  */