// Usuario.js
/** Clase que representa a un usuario de la plataforma*/
/*class Usuario {
    constructor(id, username, nombre, apellido, email, password, tipo) {
      this.id = id;
      this.username = username;
      this.nombre = nombre;
      this.apellido = apellido;
      this.email = email;
      this.password = password;
      this.tipo = tipo; // tipo normal o anunciante
    }
  }
  module.exports = Usuario; */

  const mongoose = require('mongoose');
  const uniqueValidator = require("mongoose-unique-validator"); //Importando módulo mongoose-unique-validator, pendiente de instalar.
  const crypto = require('crypto');                             
  //Importando módulo crypto, pendiente de instalar.
  const jwt = require('jsonwebtoken');                          
  //Importando módulo jsonwebtoken, pendiente de instalar.
  const secret = require('../config').secret;                   
  // ???? es un misterio que resolveremos en la última sesión
  
  const UsuarioSchema = new mongoose.Schema({      
    username: {                                                  
      type: String,
      unique: true, //este campo no se puede repetir
      lowercase: true,
      required: [true, "no puede estar vacío"],
      match: [/^[a-zA-Z0-9]+$/, "es inválido"],
      index: true,
    },                               
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: {
      type: String,
      unique: true, //este campo no se puede repetir
      lowercase: true,
      required: [true, "no puede estar vacío"],
      match: [/\S+@\S+\.\S+/, "es inválido"],
      index: true,
    },
    ubicacion: String,
    telefono: String,
    bio: String,
    foto: String,
    tipo: { type: String, enum: ['normal', 'anunciante'] },
    hash: String, //este campo se utilizará para la sesión
    salt: String, //este campo se utilizará para la sesión
  }, { timestamps: true, collection: 'usuarios' }); 

    // usando plugin de validación para que no se repitan correos ni usernames
    UsuarioSchema.plugin(uniqueValidator, { message: "Ya existe" }); 

  UsuarioSchema.methods.publicData = function() {
    return {
      id: this.id,
      username: this.username,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      tipo: this.tipo
    }
  }

  UsuarioSchema.methods.crearPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex"); // generando una "sal" random para cada usuario
    this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex"); // generando un hash utilizando la salt
  };

  UsuarioSchema.methods.validarPassword = function (password) {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
      .toString("hex");
    return this.hash === hash;
  };

  UsuarioSchema.methods.generarJWT = function() {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60); // 60 días antes de expirar
  
    return jwt.sign({
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    }, secret);
  };

  UsuarioSchema.methods.toAuthJSON = function(){
    return {
      username: this.username,
      email: this.email,
      token: this.generarJWT()
    };
  };  

  mongoose.model('Usuario',UsuarioSchema)