const mongoose = require("mongoose");

const Publicacion = mongoose.model(
  "Publicacion",
  new mongoose.Schema({
    username: String,
    texto: String,
  })
);

module.exports = Publicacion;
