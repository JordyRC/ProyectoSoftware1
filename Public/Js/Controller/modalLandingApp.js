'use strict';

//Llamar modal
let modalLandingApp = document.getElementById("modalLandingApp");

let spanCerrarLandingApp = document.getElementById("spanCerrarLandingApp");

function mostrarModal(modal) {
    modal.style.display="block";
}

botonRegistrarUsuario.onclick = function() {
    mostrarModal(modalLandingApp)
} 

//Cerrar Modal

function cerrarModal(modal) {
    modal.style.display="none";
}

spanCerrarLandingApp.onclick = function() {
    cerrarModal(modalLandingApp)
}

// Cerrar click afuera
window.onclick = function() {
    cerrarModal2(event, modalLandingApp);
}

function cerrarModal2(event, modal) {
    if (event.target == modal) {
        modalLandingApp.style.display = "none";
    }
}


// Validar campos vacios

const botonRegistrar = document.querySelector('#btnAgregarPeso');
const inputNombre = document.querySelector('#txtNombreUsuario');
const inputCorreo = document.querySelector('#txtCorreoUsuario');
const inputEstatura = document.querySelector('#txtEstaturaUsuario');
const inputSexo = document.querySelector('#txtSexo');
const inputPesoIdoneo = document.querySelector('#txtPesoIdoneoUsuario');
const inputPlan = document.querySelector('#slePlanAyuno');


function validarCamposVacios() {
    let camposRequeridos = document.querySelectorAll('#modalLandingApp [required]');
    let error = false;
    for (let i = 0; i < camposRequeridos.length; i++){
        if (camposRequeridos[i].value == ''){
            camposRequeridos[i].classList.add('error');
            error = true;
        } else {
            camposRequeridos[i].classList.remove('error');
        }
    }
    return error;
}

function validarCorreo(){
    let correo = inputCorreo.value;
    let error = false;
    let expression = /^[a-zA-Z0-9.]+@*[a-zA-Z0-9]*@{1}[a-zA-Z]+.com$/;
    if (expression.test(correo) == false){
        inputCorreo.classList.add('error');
        error = true;
    } else {
        inputCorreo.classList.remove('error');
    }
    return error;
}

function validarNombre(){
    let nombre = inputNombre.value;
    let error = false;
    let expression = /^[a-zA-Z\s]+$/;
    if (expression.test(nombre) == false){
        inputNombre.classList.add('error');
        error = true;
    } else {
        inputNombre.classList.remove('error');
    }
    return error;
}

function obtenerDatos() {
    let espaciosVacios = validarCamposVacios();
    let errorCorreo = validarCorreo();
    let errorNombre = validarNombre();
    if (espaciosVacios){
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Revise los campos vacios!',
        });
    } else if (errorCorreo){
        Swal.fire({
            icon: 'warning',
            title: 'Correo incorrecto',
            text: 'Por favor revise el correo',
        });
    } else if (errorNombre){
        Swal.fire({
            icon: 'warning',
            title: 'Nombre no es válido',
            text: 'El nombre solo debe contener letras',
        });
    } else{
        let nombre = inputNombre;
        let correo = inputCorreo;
        let estatura = inputEstatura;
        let sexo = inputSexo;
        let peso = inputPesoIdoneo;
        let plan = inputPlan
        registrarPersona(nombre, correo, estatura, sexo, peso, plan);
        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'La información ha sido ingresada exitosamente',
        });
    }
}



botonRegistrar.addEventListener('click',obtenerDatos);