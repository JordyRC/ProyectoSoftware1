'use strict';

//1) Creamos variables para traer las dependencias
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
// const personas = require("./Routes/PersonaRoute");
require("dotenv").config();

//2) Configuramos el express
const app = express();
app.use(cors());
app.use(express.static(__dirname + '/Public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//3) Zeteamos todos los headers de las peticiones que comunican con el backend // zetear los headers de los resp (response)
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINOTHER, X-CSRF-Token, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//4) LOGICA PARA CONECTAR CON BD

//Se crea la variable db, que almacena la instancia de la bd, para ser reutilizada en el 'callback'

let db;

//Se conecta la base de datos antes de levantar el servidor, mediante los datos del archivo .env en la raiz del proyecto

// ANTES LE PONE EL CODIGO A .env MONGO_URI
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, database){
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Guarda el objeto para que el callback lo pueda reutilizar

    db = database;
    console.log("Se establecio la conexion con la base de datos");

    // Levantamos la app con el Node
    const server = app.listen(process.env.PORT || 8000, function(){
        let port = server.address().port;
        console.log("La aplicacion esta levantada en el puerto:" , port);
    });
});

//Error general en caso de que falle en endpoint
function handleError(res, reason, message, code){
    console.log("ERROR: ",reason);
    res.status(code || 500).json({"error":message});
}

/************ Se copia lo de arriba tal cual está **************************/


/* EXPORTADO DE PersonasRoute.js ver punto (6) */

//Conexion a todas las rutas del backend (los routes/ carpeta), para que sea accesible desde Postman, frontend, quien quiera consumirlo
const personas = require("./Routes/PersonaRoute");
 app.use('/api', personas);

// const logros = require("./Routes/LogrosRoute");
// app.use('/api', logros);