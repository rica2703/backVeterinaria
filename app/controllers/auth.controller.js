const config = require("../config/auth.config");
const db = require("../models");
const Usuario = db.usuario;
// const Publicacion = db.publicacion;
const Cita=db.cita;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { response } = require("express");


exports.createCita = (req, res) => {
  const cita = new Cita({
    username: req.body.username,
    foto: req.body.foto,
    nombreDueño:req.body.nombreDueño,
    fehca:req.body.fecha,
    horario:req.body.horario,
    telefono:req.body.telefono,
    nombreMascota:req.body.nombreMascota,
    tipoAnimal:req.body.tipoAnimal,
    edad:req.body.edad,
    raza:req.body.raza,
    motivo:req.body.motivo,
  });
  cita.save((err, cita) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    cita.save(err => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send({ message: "cita was created successfully!" });
    });
  });
};
exports.getAllCita = (req, res) => {
  Cita.find()
    .then((cita) => {
      res.status(200).json(cita);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Error retrieving citas." });
    });
}

exports.editCita = (req, res) => {
  const citaId = req.params.id;

  Cita.findByIdAndUpdate(
    citaId,
    {
      username: req.body.username,
      foto: req.body.foto,
      nombreDueño:req.body.nombreDueño,
      fehca:req.body.fecha,
      horario:req.body.horario,
      telefono:req.body.telefono,
      nombreMascota:req.body.nombreMascota,
      tipoAnimal:req.body.tipoAnimal,
      edad:req.body.edad,
      raza:req.body.raza,
      motivo:req.body.motivo,
    },
    { new: true }
  )
    .then((cita) => {
      if (!cita) {
        return res.status(404).send({ message: "Cita no encontrada" });
      }
      res.status(200).send({ message: "Cita editada correctamente", cita });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Error al editar cita" });
    });
};

 exports.deleteCita = (req, res) => {
    const citaId = req.params.id;
  
    // if (!req.usuarioId) {
    // return res.status(403).send({ message: "No tienes autorizacion! " });
    // }
  
    Cita.findByIdAndDelete(citaId, (err, result) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
  
      if (!result) {
        return res.status(404).send({ message: "Cita no encontrada." });
      }
  
      res.status(200).send({ message: "Cita eliminada correctamente!" });
    });
  };





// exports.createPost = (req, res) => {
//   const publicacion = new Publicacion({
//     username: req.body.username,
//     texto: req.body.texto,
//   });
//   publicacion.save((err, publicacion) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }
//     publicacion.save(err => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }

//       res.send({ message: "post was created successfully!" });
//     });
//   });
// };
// exports.getAllPost = (req, res) => {
//   Publicacion.find()
//     .then((publicacion) => {
//       res.status(200).json(publicacion);
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message || "Error retrieving posts." });
//     });
// }
// exports.editPost = (req, res) => {
//   const postId = req.params.id;

//   Publicacion.findByIdAndUpdate(
//     postId,
//     {
//       username: req.body.username,
//       texto: req.body.texto,
//     },
//     { new: true }
//   )
//     .then((publicacion) => {
//       if (!publicacion) {
//         return res.status(404).send({ message: "Publicacion no encontrada" });
//       }
//       res.status(200).send({ message: "Publicacion editada correctamente", publicacion });
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message || "Error al editar publicacion" });
//     });
// };

// exports.deletePost = (req, res) => {
//   const postId = req.params.id;

//   // if (!req.usuarioId) {
//   // return res.status(403).send({ message: "No tienes autorizacion! " });
//   //}

//   Publicacion.findByIdAndDelete(postId, (err, result) => {
//     if (err) {
//       return res.status(500).send({ message: err });
//     }

//     if (!result) {
//       return res.status(404).send({ message: "Publicacion no encontrada." });
//     }

//     res.status(200).send({ message: "Publicacion eliminada correctamente!" });
//   });
// };

exports.getAllUsers = (req, res) => {
  Usuario.find()
    .then((usuario) => {
      res.status(200).json(usuario);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Error retrieving users." });
    });
}

// exports.signup = (req, res) => {
//   const usuario = new Usuario({
//     username: req.body.username,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 8),
//     foto: req.body.foto,
//   });
//   usuario.save((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }
//     usuario.save(err => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }

//       res.send({ message: "User was registered successfully!" });
//     });
//   });
// };
exports.signup = async (req, res) => {
  try {
    // Datos del formulario
    const { username, email, password } = req.body;

    // Crear un nuevo usuario con la imagen cargada
    const usuario = new Usuario({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 8),
      foto: req.file?.path || null, // URL de la imagen subida a Cloudinary
    });

    await usuario.save();

    res.status(201).send({
      message: "Usuario registrado con éxito",
      usuario: {
        username: usuario.username,
        email: usuario.email,
        foto: usuario.foto, // URL de la imagen
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};



exports.signin = (req, res) => {
  Usuario.findOne({
    username: req.body.username
  })
    // .populate("roles", "-__v")
    .exec((err, usuario) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!usuario) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        usuario.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      usuario.estado = true;
      usuario.save((err, updatedUser) => {
        if (err) {


          return res.status(500).send({ message: "Error al actualizar el estado del usuario." });
        }

        const token = jwt.sign({ id: usuario.username },
          config.secret,
          {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 hours
          });

        var authorities = [];

        // for (let i = 0; i < user.roles.length; i++) {
        //   authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        // }
        res.status(200).send({
          // id: user._id,
          username: updatedUser.username,
          email: updatedUser.email,
          foto: updatedUser.foto,
          accessToken: token
        });
      });
    });
};

exports.getUserById = (req, res) => {
  const username = req.params.username; // Extraemos el username de los parámetros de la ruta
  // const usuario = new Usuario({
  //   username:req.body.username,
  //   nombre:req.body.nombre,
  //   avatar: req.body.avatar,
  // });
  Usuario.findOne({ username: username }, (err, usuario) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    if (!usuario) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
    res.status(200).send(usuario);
  })
};

// exports.getActiveUsers = (req, res) => {
//   Usuario.find({ estado: true }, (err, usuarios) => {
//     if (err) {
//       return res.status(500).send({ message: err });
//     }
//     if (!usuarios || usuarios.length === 0) {
// return res.status(404).send({ message: "No se encontraron usuarios activos." });
//     }
//     res.status(200).send(usuarios);
//   });
// };
