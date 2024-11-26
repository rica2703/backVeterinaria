const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const   db = {};

db.mongoose = mongoose;

db.usuario = require("./usuario.model");
db.publicacion=require("./publicacion.model");
db.cita=require("./citas.model");

module.exports = db;