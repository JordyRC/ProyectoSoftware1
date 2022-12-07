'use strict';

//URL de Postman
const apiUrl = 'http://localhost:3000/api/';

// PUNTO (4) mencionadO en PersonaController.js 
// Se crean ambas ImprimirMsjError y ImprimirMsjSuccess
function ImprimirMsjError(pMsj){
    Swal.fire({
        title: 'Error!',
        text: pMsj,
        icon: 'error',
        confirmButtonText: 'Ok'
    });
}
function ImprimirMsjSuccess(pMsj){
    Swal.fire({
        title: 'Excelente!',
        text: pMsj,
        icon: 'success',
        confirmButtonText: 'Ok'
    });
}

// Funcion creada en punto (5) PeronaController.js
function ObtenerTipoIdentificacion(PTipo){
    switch (Number(PTipo)) {
        case 1:
            return 'Física';
        case 2:
            return 'Jurídica';
        case 3:
            return 'Dimex';
        case 4:
            return 'Pasaporte';
        default:
            return 'Sin Identificación';
    }
}

// Funcion creada en punto (5) PeronaController.js
function ObtenerEstado(pEstado){
    switch (Number(pEstado)) {
        case 1:
            return 'Activo';
        case 0:
            return 'Inactivo';
    }
}
// Funcion creada en punto (5) PeronaController.js
function ObtenerRol(pRol) {
    switch (Number(pRol)) {
        case 1:
            return 'Administrador';
        case 2:
            return 'Cliente';
        case 3:
            return 'Secretaria';
    }

}

// Funciones mencionadas en punto (8) GestionarPersonaController.js
function resaltarLabelInvalido(plabelID) {
    var obj = document.getElementById(plabelID);
    var orig = obj.style;
    obj.style = 'color:red;'

    setTimeout(function () {
        obj.style = orig;
    }, 5000);
}
function resaltarInputInvalido(pinputID) {
    var obj = document.getElementById(pinputID);
    var orig = obj.style;
    obj.style = 'border: 1px solid red;'

    setTimeout(function () {
        obj.style = orig;
    }, 5000);
}






function formatDate(date) {
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            // padTo2Digits(date.getSeconds()),  // 👈️ can also add seconds
        ].join(':')
    );
}
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}