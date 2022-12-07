'use strict';

//Llamar modal
let modalRegistrarReceta = document.getElementById("modalRegistrarReceta");
let modalVerReceta1 = document.getElementById('modalVerReceta1');
let modalVerReceta2 = document.getElementById('modalVerReceta2');
let modalVerReceta3 = document.getElementById('modalVerReceta3');
let modalVerReceta4 = document.getElementById('modalVerReceta4');
let modalVerReceta5 = document.getElementById('modalVerReceta5');
let modalVerReceta6 = document.getElementById('modalVerReceta6');

let spanCerrarRegistrarReceta = document.getElementById("spanCerrarRegistrarReceta");
let spanCerrarVerReceta1 = document.getElementById("spanCerrarVerReceta1");
let spanCerrarVerReceta2 = document.getElementById("spanCerrarVerReceta2");
let spanCerrarVerReceta3 = document.getElementById("spanCerrarVerReceta3");
let spanCerrarVerReceta4 = document.getElementById("spanCerrarVerReceta4");
let spanCerrarVerReceta5 = document.getElementById("spanCerrarVerReceta5");
let spanCerrarVerReceta6 = document.getElementById("spanCerrarVerReceta6");


// Mostrar Modal
function MostrarModal(modal) {
    modal.style.display = "block";
}

btnRegistrarReceta.onclick = function() {
    MostrarModal(modalRegistrarReceta)
}
btnVerReceta1.onclick = function() {
    MostrarModal(modalVerReceta1)
}
btnVerReceta2.onclick = function() {
    MostrarModal(modalVerReceta2)
}
btnVerReceta3.onclick = function() {
    MostrarModal(modalVerReceta3)
}

btnVerReceta4.onclick = function() {
    MostrarModal(modalVerReceta4)
}
btnVerReceta5.onclick = function() {
    MostrarModal(modalVerReceta5)
}
btnVerReceta6.onclick = function() {
    MostrarModal(modalVerReceta6)
}


//Cerrar Modal
function CerrarModal(modal) {
    modal.style.display = "none";
}

spanCerrarRegistrarReceta.onclick = function() {
    CerrarModal(modalRegistrarReceta)
}
spanCerrarVerReceta1.onclick = function() {
    CerrarModal(modalVerReceta1)
}
spanCerrarVerReceta2.onclick = function() {
    CerrarModal(modalVerReceta2)
}
spanCerrarVerReceta3.onclick = function() {
    CerrarModal(modalVerReceta3)
}
spanCerrarVerReceta4.onclick = function() {
    CerrarModal(modalVerReceta4)
}
spanCerrarVerReceta5.onclick = function() {
    CerrarModal(modalVerReceta5)
}
spanCerrarVerReceta6.onclick = function() {
    CerrarModal(modalVerReceta6)
}


// Cerrar click afuera
function CerrarModal2(event, modal) {
    if (event.target == modal) {
        modalRegistrarReceta.style.display = "none";
    }}


window.onclick = function() {
    CerrarModal2(event, modalRegistrarReceta);
}

/* Agregar Recetas & Validación de Formulario */

let inputNombreReceta = document.getElementById("txtNombreReceta");
let inputTipoReceta = document.getElementById("txtTipoReceta");
let inputCategoriaReceta = document.getElementById("txtCategoriaReceta");
let inputImgReceta = document.getElementById("imgReceta");
let inputIngredientes = document.getElementById("txtIngredientes");
let inputProcedimiento = document.getElementById("txtProcedimiento");

// btnAgregarPeso.onclick = function () {
//   ObtenerInput(inputReduccionPeso);
//   modalReduccionPeso.style.display = "none";
// }

btnAgregarReceta.onclick = function() {
    ObtenerInput()
}

function ValidarInput(sNombreReceta, sTipoReceta, sCategoriaReceta, sIngredientes, sProcedimiento) {
  if (sNombreReceta == '' || sNombreReceta == null || sNombreReceta == undefined) {
    ImprimirMensajeError('Debe agregarle un Nombre a la receta para poder continuar');
    ResaltarLabelInvalido('lblNombreReceta');
    ResaltarInputInvalido('txtNombreReceta');
    return false;
  }
  if (sTipoReceta == '' || sTipoReceta == null || sTipoReceta == undefined) {
    ImprimirMensajeError('Debe seleccionar el Tipo de receta para poder continuar');
    ResaltarLabelInvalido('lblTipoReceta');
    ResaltarInputInvalido('txtTipoReceta');
    return false;
  }
  if (sCategoriaReceta == '' || sCategoriaReceta == null || sCategoriaReceta == undefined) {
    ImprimirMensajeError('Debe seleccionar la Categoria de la receta para poder continuar');
    ResaltarLabelInvalido('lblCategoriaReceta');
    ResaltarInputInvalido('txtCategoriaReceta');
    return false;
  }
  if (sIngredientes == '' || sIngredientes == null || sIngredientes == undefined) {
    ImprimirMensajeError('Debe listar los Ingredientes para poder continuar');
    ResaltarLabelInvalido('lblIngredientes');
    ResaltarInputInvalido('txtIngredientes');
    return false;
  }
  if (sProcedimiento == '' || sProcedimiento == null || sProcedimiento == undefined) {
    ImprimirMensajeError('Debe escribir el Proceso de la receta para poder continuar');
    ResaltarLabelInvalido('lblProcedimiento');
    ResaltarInputInvalido('txtProcedimiento');
    return false;
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

function ObtenerInput() {
    let sNombreReceta = inputNombreReceta.value;
    let sTipoReceta = inputTipoReceta.value;
    let sCategoriaReceta = inputCategoriaReceta.value;
    let sIngredientes = inputIngredientes.value;
    let sProcedimiento = inputProcedimiento.value;

    if (ValidarInput(sNombreReceta, sTipoReceta, sCategoriaReceta, sIngredientes, sProcedimiento) == false) {
        return;
    } else {
        ImprimirMensajeInsertar('¡Receta agregada!')
    }

    // InsertarObjetivos(nLogro, 'En Progreso', 'P');
    // InsertarListaObjetivos();
    // ImprimirMensajeInsertar('¡Logro agregado correctamente!');
}

function ResaltarLabelInvalido(pLabelID) {
    let elementLabel = document.getElementById(pLabelID);
    let sytleOrigin = elementLabel.style;

    elementLabel.style = 'color:red;';

    setTimeout(function () {
        elementLabel.style = sytleOrigin;
    }, 5000);
}
function ResaltarInputInvalido(pInputID) {
    let elementInput = document.getElementById(pInputID);
    let sytleOrigin = elementInput.style;

    elementInput.style = 'border: 1px solid red;';

    setTimeout(function () {
        elementInput.style = sytleOrigin;
    }, 5000);
}