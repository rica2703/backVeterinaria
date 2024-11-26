const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dlbyidb69', // Cambia esto por tu Cloud Name
  api_key: '979219534512597', // Cambia por tu API Key
  api_secret: '5-qaNXK8vBU8U3ph9Q66qWwvGoI' // Cambia por tu API Secret
});

module.exports = cloudinary;
