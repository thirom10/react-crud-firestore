const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid'); // Para generar nombres únicos

const app = express();
const PORT = 5000;

    cloudinary.config({ 
        cloud_name: 'de1ndbwmn', 
        api_key: '227671849163647', 
        api_secret: 'O_tm9tdJSVeCq3Xa4Osxk8PKtqo' // Click 'View API Keys' above to copy your API secret
    });
    
app.use(cors());
app.use(express.json());

// Configuración de multer para manejar el archivo en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta para subir imágenes
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se ha subido ningún archivo.' });
  }

  // Subir la imagen a Cloudinary
  cloudinary.uploader.upload_stream(
    { public_id: uuidv4() }, // Utilizar un ID único para evitar sobrescribir archivos
    (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Error al subir la imagen.', error });
      }

      // Obtener la URL pública de la imagen subida
      const imageUrl = result.secure_url;
      res.json({ message: 'Imagen subida correctamente.', imageUrl });
    }
  ).end(req.file.buffer); // Enviar el buffer de la imagen al stream
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
