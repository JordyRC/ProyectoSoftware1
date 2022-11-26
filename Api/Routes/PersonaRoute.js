'use strict';

// 1) Llamamos a express linea 4 del server.js
const express = require('express');
// 2) Generamos una ruta
const router = express.Router();

// 3) OJO NOS TRAEMOS EL MODELO Persona
const Persona = require('../Models/PersonaModel');

// PRUEBAS PARA VER CONEXION 
router.post('/registrar', (req, res) =>{
    res.status(200).json({
        msj: "Registro Exitoso"
    })
} );

router.get('/listarUsuarios', (req, res) =>{
    res.status(200).json({
        msj: "Listado Exitoso"
    })
} );

// router.post('/RegistrarPersona', (req, res) =>{
//     let body = req.body; // req = obtengo

//     // Creamos la instancia de la persona nueva
//     let nuevaPersona = new Persona({  // Persona la referencia que trajimos del esquema del modelo, punto (3), linea 7 arriba
//         // ponemos lo q se pide en el esquema creado en PersonaModel.js
//         Identificacion: body.Identificacion,
//         Nombre: body.Nombre,
//         Apellido: body.Apellido,
//     });
//     // .save = metodo exclusivo de mongoose
//     nuevaPersona.save((err, personaDB) =>{
//         if(err){
//             // res = devuelvo
//             res.json({
//                 resultado: false,
//                 msj:'No se pudo registrar la persona, ocurrio un error!',
//                 err
//             })
//         }else{
//             res.json({
//                 resultado: true,
//                 msj:'Registrado realizado de manera correcta',
//                 personaDB // personaDB devuelve todo de la persona con un ID
//             });
//         }
//     });
// });


// 4) Exponemos el archivo al publico / los metodos
module.exports= router;