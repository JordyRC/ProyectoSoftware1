'use strict';
/* COPIAR TAL CUAL */

// -------------------------------aca los metodos del protocolo http
// (1) COMUNICACION METODO GET
async function ProcessGet(pRouterName, pParams) {
    let result = null;
    await axios({
        method: 'get',
        url: apiUrl + pRouterName, // URL de POSTMAN
        responseType: 'json',
        params: pParams // GET va con Params
        // .then cuando da SUCCESS
    }).then((res) => { 
        result = res.data; // Son los JSON de PersonaRoute.js que tienen los diferentes msjs de 'Se obtuvieron datos' 'Usuario inactivo' 'Usuario/Pass incorrectos' etc
        // .catch cuando da errores con el Router, con el server
    }).catch((err) => {
        console.log(err);
    });
    return result;
}

// (3) COMUNICACION METODO DELETE
async function ProcessDelete(pRouterName, pData){ // pData xq DELETE no usa params sino body=data
    let result = await ProcessAction('delete', pRouterName, pData);
    return result;
}

// (4) PROCESAR METODOS POST Y DELETE (Aqui van los Subdocumentos)
async function ProcessPost(pRouterName, pData, pSubDocuments) {
    let result = await ProcessAction('post', pRouterName, pData);
    if (pRouterName == 'RegistrarPersona') {
        if (result.resultado == false) { // validacion del error del metodo RegistrarPersona en PersonaRoute xq ya existe alguien con esa cedula, ver punto 45 PersonaRoute.js
            switch (result.err.code) { // nos da el codigo de error 11000 y pintar msj.
                case 11000:
                    result.msj = 'No se pudo registrar la persona, ya existe una persona registrada con esa identificación';
                    console.log('No se pudo registrar por código 11000');
                    break;
                default:
                    break;
            }

        // VALIDAR INTERESES
        } else if (result.resultado == true) { // Como es true la persona se registró
            //aca vamos a insertar intereses mediante subdocumentos...
        }
    }
    return result;// Resultado que se le pasa al Controller
};

// (5) COMUNICACION METODO PUT
async function ProcessPut(pRouterName, pData, pSubDocuments){    
    let result = await ProcessAction('put', pRouterName, pData);
    if(pRouterName == 'ModificarPersona'){
        if(result.resultado == false){
            switch (result.err.code) {
                case 11000:
                    result.msj = 'No se pudo registrar la persona, ya existe una persona registrada con esa identificación';
                    console.log('No se pudo registrar por código 11000');
                    break;
                default:
                    break;
            }

        // VALIDAR INTERESES    
        } else {
            //aca vamos a actualizar los intereses mediante subdocumentos...
        }
    }
    return result;
}

// (2) COMUNICACION METODOS QUE LLEVEN UN BODY (PUT,POST,DELETE)
async function ProcessAction(pMethod,pRouterName, pData){
    let result = null;
    await axios({
        method: pMethod, // esto es lo unico que cambia con el ProcessGet del punto (1) arriba
        url: apiUrl + pRouterName,
        responseType: 'json',
        data: pData
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
}


//---------------- metodos para el manejo del localStorage
// function SetSesionActiva(pDatosPerfil){
//     localStorage.setItem('datosSesionActiva', JSON.stringify(pDatosPerfil));
// }
// function GetSesionActiva() {
//     let datosSesionActiva = localStorage.getItem('datosSesionActiva');
//     if (datosSesionActiva == null || datosSesionActiva == '' || datosSesionActiva == undefined) {
//         datosSesionActiva = [];
//     } else {
//         datosSesionActiva = JSON.parse(datosSesionActiva);
//     }
//     return datosSesionActiva;
// }

// function LimpiarSesionActiva(){
//     localStorage.removeItem('datosSesionActiva');
// }