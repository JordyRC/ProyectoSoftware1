'use strict';

let modalReduccionPeso = document.getElementById("modalReduccionPeso");
let modalIMC = document.getElementById("modalIMC");
let modalHorasAyuno = document.getElementById("modalHorasAyuno");
let modalDiasAyuno = document.getElementById("modalDiasAyuno");
let modalOtrosLogros = document.getElementById("modalOtrosLogros");

let spanCerrar = document.getElementsByClassName("cerrar")[0];
let spanCerrarIMC = document.getElementById("cerrarIMC");
let spanHorasAyuno = document.getElementById("cerrarHorasAyuno");
let spanDiasAyuno = document.getElementById("cerrarDiasAyuno");
let spanOtrosLogros = document.getElementById("cerrarOtrosLogros");


// Función xra mostrar modal

btnIngresarPeso.onclick = function () {
  MostrarModal(modalReduccionPeso)
}
btnIngresarIMC.onclick = function () {
  MostrarModal(modalIMC)
}
btnIngresarHorasAyuno.onclick = function () {
  MostrarModal(modalHorasAyuno)
}
btnIngresarDiasAyuno.onclick = function () {
  MostrarModal(modalDiasAyuno)
}
btnIngresarOtrosLogros.onclick = function () {
  MostrarModal(modalOtrosLogros)
}

function MostrarModal(modal) {
  modal.style.display = "block";
}


// Función xra cerrar modal por medio de "x"

spanCerrar.onclick = function () {
  CerrarModal(modalReduccionPeso)
}
spanCerrarIMC.onclick = function () {
  CerrarModal(modalIMC)
}
spanHorasAyuno.onclick = function () {
  CerrarModal(modalHorasAyuno)
}
spanDiasAyuno.onclick = function () {
  CerrarModal(modalDiasAyuno)
}
spanOtrosLogros.onclick = function () {
  CerrarModal(modalOtrosLogros)
}

function CerrarModal(modal) {
  modal.style.display = "none";
}


// Función xra cerrar modal al dar click fuera del modal

window.onclick = function (event) {
  if (event.target == modalReduccionPeso || event.target == modalIMC || event.target == modalHorasAyuno || event.target == modalDiasAyuno || event.target == modalOtrosLogros) {
    modalReduccionPeso.style.display = "none";
    modalIMC.style.display = "none";
    modalHorasAyuno.style.display = "none";
    modalDiasAyuno.style.display = "none";
    modalOtrosLogros.style.display = "none";
  }
}

/* Ingreso de Logros */

// Validación de inputs en ventanas Modals:
let inputReduccionPeso = document.getElementById("txtReduccionPeso");
let inputIMC = document.getElementById("txtIMC");
let inputHorasAyuno = document.getElementById("txtHorasAyuno");
let inputDiasAyuno = document.getElementById("txtDiasAyuno");
let inputOtrosLogros = document.getElementById("txtOtrosLogros");

btnAgregarPeso.onclick = function () {
  ValidarInput(inputReduccionPeso);
}
btnAgregarIMC.onclick = function () {
  ValidarInput(inputIMC);
}
btnAgregarHorasAyuno.onclick = function () {
  ValidarInput(inputHorasAyuno);
}
btnAgregarDiasAyuno.onclick = function () {
  ValidarInput(inputDiasAyuno);
}
btnAgregarOtrosLogros.onclick = function () {
  ValidarInput(inputOtrosLogros);
}

function ValidarInput(input) {
  if (input.value == '' || input.value == null || input.value == undefined) {
    ImprimirMensajeError('Por favor ingresar algún logro para continuar');
    return false;
  } else {
    ImprimirMensajeInsertar('¡Objetivo agregado!');
  }
}

function ImprimirMensajeError(mensaje) {
  Swal.fire({
    title: '¡Error!',
    text: mensaje,
    icon: 'error',
    confirmButtonText: 'OK'
  });
}
function ImprimirMensajeInsertar(sMensaje) {
  Swal.fire({
    title: '¡Excelente!',
    text: sMensaje,
    icon: 'success',
    confirmButtonText: 'OK'
  })
}


// function ObtenerInput(input) {
//   let nLogro = input.value;
//   if (ValidarInput(nLogro) == false) {
//     return;
//   }
  

  // InsertarObjetivos(nLogro);
  // InsertarListaObjetivos(nLogro);
  // ImprimirMensajeInsertar('¡Logro agregado correctamente!');
//}

// function InsertarListaObjetivos(nLogro) {
//   ValidarInput(nLogro)
//   
//   ImprimirMensajeInsertar('¡Logro agregado correctamente!');
//   let tbody = document.getElementById('tblLogrosBody');
//   tbody.innerHTML = '';

//   let listaObjetivos = ObtenerListaObjetivos();

//   for (let o = 0; o < listaObjetivos.length; o++) {
//     let fila = tbody.insertRow();
//     let celdaCategoria = fila.insertCell();
//     let celdaObjetivo = fila.insertCell();
//     let celdaEstado = fila.insertCell();
//     let celdaMedalla = fila.insertCell();
//     let celdaGrafico = fila.insertCell();

//     celdaObjetivo.innerHTML = listaObjetivos[o][0];
//   }
// }