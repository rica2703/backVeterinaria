const mongoose = require("mongoose");

const Cita = mongoose.model(
  "Cita",
  new mongoose.Schema({
    username: String,
    foto: String,
    nombreDueño:String,
    fehca:Date,
    horario:String,
    telefono:Number,
    nombreMascota:String,
    tipoAnimal:String,
    edad:Number,
    raza:String,
    motivo:String,
  })
);

module.exports = Cita;
