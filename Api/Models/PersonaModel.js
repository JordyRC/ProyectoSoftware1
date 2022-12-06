'use strict';

/* AQUI NO HAY LOGICA, SOLO SE CREA LA ESTRUCTURA QUE VA A ESTAR EN LA BD*/

// 1) Llamamos a Mongoose de la linea 7 de server.js
const mongoose = require("mongoose");

// 2) Definimos el esquema schemaPersona (plantilla)
const schemaPersona = new mongoose.Schema({
    // required = si es un campo es obligatorio-requerido o no
    // unique = si es un valor unico o no
    TipoIdentificacion:{type:Number, required: true, unique:false},
    Identificacion:{type: String, required: true, unique:true},
    Nombre:{type: String, required: true, unique:false},
    Apellido1:{type: String, required: true, unique:false},
    Apellido2:{type: String, required: true, unique:false},
    Sexo:{type: String, required: true, unique:false},
    Nacimiento:{type: String, required: true, unique:false},
    Edad:{type: Number, required: true, unique:false},
    Estado:{type: String, required: true, unique:false},
    Email:{type: String, required: true, unique:true},
    Password:{type: String, required: true, unique:false},
    Rol:{type: Number, required: true, unique:false},
    FotoPerfil:{type: String, required: true, unique:false},
    // Subdocumentos (arreglos de datos dentro de una misma conexion(coleccion de datos dentro de otra coleccion)(InteresesPersonales - Tarjetas))
    InteresesPersonales:[
        {
            Intereses: {type: String, required: true, unique: false} 
        }
    ],
    Tarjetas:[
        {
            Nombre:{type: String, required: true, unique:false},
            Apellido1:{type: String, required: true, unique:false},
            NumeroTarjeta:{type: String, required: true, unique:false},
            CVV:{type: String, required: true, unique:false},
        }
    ]
});


// 3) Exponemos el esquema creado schemaPersona 

// Se definen 3 cosas: Nombre, Esquema, Coleccion

// Persona: Nombre del modelo cuando se exporta, la instancia, estructura, cuando se llama a PersonaModel.js
// schemaPersona: El esquema creado
// Personas: Asi se va a guardar la coleccion en BD en mongoDB 
module.exports= mongoose.model('Persona', schemaPersona, 'Personas');
// Se le dice a mongoose que establezca eso cm un modelo (mongoose.model) que se va a llamar Persona, con un esquema y que su coleccion se guarde en BD cm Personas


// 4) Creamos el Route (PersonaRoute.js)