'use strict';

// 1) Llamamos a express linea 4 del server.js
const express = require('express');
// 2) Generamos una ruta
const router = express.Router();

// 3) OJO NOS TRAEMOS EL MODELO Persona
const Persona = require('../Models/PersonaModel');

// PRUEBAS PARA VER CONEXION 
// router.post('/registrar', (req, res) =>{
//     res.status(200).json({
//         msj: "Registro Exitoso"
//     })
// } );

// router.get('/listarUsuarios', (req, res) =>{
//     res.status(200).json({
//         msj: "Listado Exitoso"
//     })
// } );



/* '/RegistrarPersona' = le ponemos un nombre
  (req, res)  = req obtener info // res = devolver info 
  request / response */
  router.post('/RegistrarPersona', (req, res) =>{
    let body = req.body; // req = obtengo

    // Creamos la instancia de la persona nueva
    let nuevaPersona = new Persona({  // Persona la referencia que trajimos del esquema del modelo, punto (3), linea 7 arriba
        // ponemos lo q se pide en PersonaModel.js
        TipoIdentificacion: body.TipoIdentificacion,
        Identificacion: body.Identificacion,
        Nombre: body.Nombre,
        Apellido1: body.Apellido1,
        Apellido2: body.Apellido2,
        Sexo: body.Sexo,
        Nacimiento: body.Nacimiento,
        Edad: body.Edad,
        Estado: body.Estado,
        Email: body.Email,
        Password: body.Password,
        Rol: body.Rol,
        FotoPerfil: body.FotoPerfil,
    });
    // .save = metodo exclusivo de mongoose
    nuevaPersona.save((err, personaDB) =>{
        if(err){
            // res = devuelvo
            res.json({
                resultado: false,
                msj:'No se pudo registrar la persona, ocurrio un error!',
                err
            })
        }else{
            res.json({
                resultado: true,
                msj:'Registrado realizado de manera correcta',
                personaDB // personaDB devuelve todo de la persona con un ID
            });
        }
    });
});

router.put ('/ModificarPersona', (req, res) => {
    let body = req.body;

    // ya no creamos la instancia de la Persona, ya esta hecha en '/RegistrarPersona'
    // _id: palabra reservada de mongo
    // {_id: body._id}, {$set: body = son los dos parametros que se ocupan para actualizar
    Persona.updateOne({_id: body._id}, {$set: body
        // lo de abajo es por si solo ocupamos actualizar algunos datos y no todos
        //$set:{
        //     Nombre: body.Nombre,
        //     Edad: body.Edad
        // }    
    }, function(err, info){
        if (err) {
            res.json({
                resultado: false,
                msj:'Error y no se actualizaron los datos',
                err
            });
        }else{
            res.json({
                resultado: true,
                msj:'los datos se actualizaron de manera correcta',
                info
            });    
        }
    });
});

router.put ('/DesactivarPersona', (req, res) => {
    let body = req.body;
    Persona.updateOne({_id: body._id}, { // recibe el ID
        // $set estado = para solo cambiar el estado a 0 = inactivo
        $set:{
            Estado:0
        }
    } , function(err, info){
        if (err) {
            res.json({
                resultado: false,
                msj:'Error y no se pudo desactivar la persona',
                err
            });
        }else{
            res.json({
                resultado: true,
                msj:'persona inactivada de manera correcta',
                info
            });    
        }
    });
});

router.delete('/EliminarPersona', (req, res) => {
    let body = req.body;
    // solo recibe el ID 
    // paso el ID y espero un error o un resultado
    Persona.remove({_id: body._id}, (err, result) =>{
        if (err) {
            res.json({
                resultado: false,
                msj:'Error y no se pudo eliminar la persona',
                err
            });
        }else{
            res.json({
                resultado: true,
                msj:'persona eliminada de manera correcta',
                result
            });    
        }
    });
});


// aListar no recibe parametros
router.get('/ListarPersonas', (req, res) =>{
    Persona.find((err, ListaPersonasDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj:'No se pudo obtener los datsps: ',
                err
            });
        }else{
            res.json({
                resultado: true,
                msj:'los datos se obtuvieron de manera correcta: ',
                ListaPersonasDB
            });    
        }
    });
});


router.get('/BuscarPersonaPorIndentificacion', (req, res) =>{
    // si recibe parametros
    // query cuando se recibe
    // params cuando se envia
    let params = req.query;
    Persona.find({Identificacion: params.Identificacion}, (err, PersonaDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj:'No se pudo obtener los datsps: ',
                err
            });
        }else{
            res.json({
                resultado: true,
                msj:'los datos se obtuvieron de manera correcta: ',
                PersonaDB
            });    
        }
    });
});

router.get('/BuscarPersonaPorId', (req, res) =>{
    let params = req.query;
    // _id: params._id va a buscar a una persona con el id de mongo
    Persona.find({_id: params._id}, (err, PersonaDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj:'No se pudo obtener los datsps: ',
                err
            });
        }else{
            res.json({
                resultado: true,
                msj:'los datos se obtuvieron de manera correcta: ',
                PersonaDB
            });    
        }
    });
});

// 4) Exponemos el archivo al publico / los metodos
module.exports= router;