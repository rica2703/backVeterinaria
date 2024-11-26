const mongoose = require("mongoose");

// const Usuario = mongoose.model(
//   "Usuario",
//   new mongoose.Schema({
//     username: String,
//     email: String,
//     password: String,
//     foto:String,
//   })
// );

// module.exports = Usuario;
const UsuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  foto: { type: String, required: false }, // Campo para la URL de la imagen
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
