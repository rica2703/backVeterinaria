const { verifySignUp } = require("../middlewares");
const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const cloudinary=require("../config/cloundnary.config");
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_pics',
    format: async (req, file) => 'png',
    public_id: (req, file) => `${Date.now()}_${file.originalname}`,
  },
});

const upload = multer({ storage });
//limitar peticiones 
// const express=require("express");
// const rateLimit=require("express-rate-limit");
// const app=express();
// const accountLimiter=rateLimit({
// windowMs:60*60*1000,
// max:6,
// message:"Demasiadas peticiones intenta en 1 hora"
// });
// app.post("/api/auth/signin",accountLimiter,(req,res)=>{controller.signin});
// app.listen(8080,()=>console.log(`app ejecutando en puerto 8080 peticiones maximas`));

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      // verifySignUp.checkDuplicateUsernameOrEmail,
      // verifySignUp.checkRolesExisted
      upload.single("foto"),
    ],
    controller.signup
  );
  //app.get("/api/auth/users",[authJwt.verifyToken],controller.getAllUsers);
  app.get("/api/auth/users",controller.getAllUsers);
  app.get("/api/auth/user/:username",controller.getUserById);
  app.post("/api/auth/signin",controller.signin);
  app.post("/api/auth/cita",controller.createCita);
  app.get("/api/auth/citas",controller.getAllCita);
  app.put("/api/auth/editarCita/:id",controller.editCita);
  app.delete("/api/auth/eliminarCita/:id",controller.deleteCita);
  
};
