'use strict';
let imagen;

// Funcion que sube imagen a Cloudinary // conecta con Upload Widget
let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'dzdyopxlj', // Name copiado de Cloudinary
    uploadPreset: 'imagenes_FranklinRC' // Nombre de Upload preset en Cloudinary
}, (err, result) => {
    // Si no hay error y si hay resultado que sea success
    if (!err && result && result.event === 'success') {
        console.log('Imagen subida con exito ', result.info);
        // Sacamos el URL de la foto
        imagen.src = result.info.secure_url;
    }
});

// Funcion en boton en GestionarPersona.html - AbrirCloudinary('imgUser')
function AbrirCloudinary(pIdInputImagen) {
    imagen = document.getElementById(pIdInputImagen);
    widget_cloudinary.open();
}

// OJO - poner scripts en GestionarPersona.html
// <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
// <script src="./js/Services/SubirImagenService.js"></script>