'use strict';

/* AQUI REGISTRAMOS AL USUARIO */

// (1) Llamar Boton e Inputs del FORMULARIO de GestionarPersona.html
let botonRegistrar = document.getElementById('btnRegistrar');
let inputTipoIdentificacion = document.getElementById('txttipoIdentificacion');
let inputIdentificacion = document.getElementById('txtidentificacion');
let inputNombre= document.getElementById('txtnombre');
let inputApellido1= document.getElementById('txtapellido1');
let inputApellido2 = document.getElementById('txtapellido2');
let inputsSexo = document.getElementsByName('rbtSexo');
let inputEmail= document.getElementById('txtEmail');
let inputPassword1= document.getElementById('txtPass');
let inputPassword2= document.getElementById('txtPass2');
let inputNacimiento= document.getElementById('txtnacimiento');
let inputEdad= document.getElementById('txtedad');
let inputRol= document.getElementById('txtRol');
let inputEstado= document.getElementById('txtestado');
let input_id= document.getElementById('txt_id');
let inputImgUser = document.getElementById('imgUser');

// (2) Boton y Mencionar Funcion RegistrarDatos (aun no se crea)
botonRegistrar.addEventListener('click', RegistrarDatos);

// (3) Identificar que parametro viene a RegistrarDatos
let queryString, urlParams, _id;
IdentificarAccion();

// (4) Creamos Funcion IdentificarAccion mencionada punto (3)
async function IdentificarAccion(){
    queryString = window.location.search; // nos da toda la URL

    urlParams = new URLSearchParams(queryString);
    _id = urlParams.get('_id'); // LO OCUPAMOS PARA onclick de AdminPersonas.html

    // Validaciones del ID para saber si CREAR O ACTUALIZAR
    if (_id != null && _id != undefined && _id == 'crear') {
        // Si es CREAR llama funcion CargarDatos
        CargarDatos(null,'btnCrea');
    }else{
        // Si no llamamos al Router que BuscarPersonaPorId
        let params = {'_id': _id};
        let result = await ProcessGet('BuscarPersonaPorId', params);
        // Si es correcto ACTUALIZAMOS
        if (result != null && result.resultado == true) {
            CargarDatos(result.PersonaDB,'btnActualiza');            
        }else{
            // Si no se imprime MSJ ERROR
            ImprimirMsjError(result.msj);
        }
    } 
}

// (5) Funcion que VALIDA AL BOTON *****************(Repintado de informacion)*********************
function CargarDatos(pPersona, pBtn){
    // Si es btnCrea cambiamos el titulo (ttlInicio) y el boton (btnRegistrar) por REGISTRAR de GestionarPersona.html
    if (pBtn == 'btnCrea') {
        document.getElementById('ttlInicio').innerHTML = 'Registrar Persona';
        document.getElementById('btnRegistrar').value = 'Registrar';
    
    // Si no cambian el titulo y el boton por ACTUALIZAR    
    } else {
        document.getElementById('ttlInicio').innerHTML = 'Actualizar Persona';
        document.getElementById('btnRegistrar').value = 'Actualizar';


        
        let nacimientoPersona  = pPersona.Nacimiento;
        if(nacimientoPersona != null && nacimientoPersona != undefined){

            var [date, time] = formatDate(new Date(nacimientoPersona.replace('Z',''))).split(' '); 

            inputNacimiento.value = date;
        }
        // let inputIntereses = document.querySelectorAll('#intereses input[type=checkbox]');
        // for (let i = 0; i < inputIntereses.length; i++) { 
        //     for (let j = 0; j < pPersona.InteresesPersonales.length; j++) {
        //         if(pPersona.InteresesPersonales[j].Intereses == inputIntereses[i].value){
        //             inputIntereses[i].checked = true;                   
        //         }                  
        //     }                     
        // }
        
        for (let i = 0; i < inputsSexo.length; i++) {
            if(pPersona.Sexo == inputsSexo[i].value){
                inputsSexo[i].checked = true;
                break;
            }            
        }

        inputTipoIdentificacion.value = pPersona.TipoIdentificacion;
        inputIdentificacion.value = pPersona.Identificacion;
        inputNombre.value = pPersona.Nombre;
        inputApellido1.value = pPersona.Apellido1;
        inputApellido2.value = pPersona.Apellido2;

        inputEmail.value = pPersona.Email;
        inputPassword1.value = pPersona.Password;
        inputPassword2.value = pPersona.Password;
        inputEdad.value = pPersona.Edad;
        inputRol.value = pPersona.Rol;
        inputEstado.value = pPersona.Estado;
        input_id.value = pPersona._id;
        inputImgUser.src = pPersona.FotoPerfil;
    }
}

// (6) Funcion RegistrarDatos que toma los valores de los inputs
async function RegistrarDatos(){
    // Elementos del html llamados de GestionarPersona.html en el punto (1) ARRIBA
    let sTipoIdentificacion = inputTipoIdentificacion.value;
    let sIdentificacion = inputIdentificacion.value;
    let sNombre = inputNombre.value;
    let sApellido1 = inputApellido1.value;
    let sApellido2 = inputApellido2.value;
    let sexo = null;
    for(let i = 0; i< inputsSexo.length; i++){
        if(inputsSexo[i].checked == true){
            sexo = inputsSexo[i].value;
            break;
        }
    }
    let sEmail = inputEmail.value;
    let sPass = inputPassword1.value;
    let sPassConfirmacion = inputPassword2.value;
    let dNacimiento = inputNacimiento.value;
    let sEdad = inputEdad.value;
    let nRol = Number(inputRol.value);
    let nEstado = Number(inputEstado.value);
    let sFotoPerfil = inputImgUser.src;

    //aca manejamos los subdocumentos de los intereses.

    // Definimos el ID
    let s_id = input_id.value;

    // (7) VALIDAMOS DATOS
    if (ValidarDatos(sTipoIdentificacion, sIdentificacion, sNombre, sApellido1, sApellido2, sexo, sEmail, sPass, sPassConfirmacion, dNacimiento, sEdad, nRol, nEstado, sFotoPerfil) == false) {
        return;
    }


    // (9) AHORA REGISTRAR LOS DATOS
    let result = null;

    // Creamos la DATA-BODY, un JSON
    let data = {
        // Los de la izq tomados del metodo RegistrarPersona de PersonaRoute.js, los de la derecha son los que estan arriba punto (7) ValidarDatos
        '_id': s_id,
        'TipoIdentificacion': sTipoIdentificacion,
        'Identificacion': sIdentificacion,
        'Nombre': sNombre,
        'Apellido1': sApellido1,
        'Apellido2': sApellido2,
        'Sexo': sexo,
        'Nacimiento': dNacimiento,
        'Edad': sEdad,
        'Estado': nEstado,
        'Email': sEmail,
        'Password': sPass,
        'Rol': nRol,
        'FotoPerfil': sFotoPerfil,
    };

    // Si tengo un ID estoy EDITANDO y si no lo tengo estoy REGISTRANDO
    // s_id MENCIONADO ARRIBA LINEA 137 donde Definimos el ID
    if (s_id != null && s_id != '' && s_id != undefined) {
        // Los parametros que ocupa ProcessPut son los que estan en GeneralService.js (pRouterName, pData, pSubDocuments)
        result = await ProcessPut('ModificarPersona', data, null);
    } else {
        result = await ProcessPost('RegistrarPersona', data, null);
    }

    // Validacion si ambos son NULL
    if (result == null || result == undefined) {
        ImprimirMsjError('Ocurrio un error, intente de nuevo');
    } else if (result.resultado == false) {
        ImprimirMsjError(result.msj);
        console.log(result);
    }else{
        swal.fire({
            title: 'Excelente!',
            text: result.msj,
            icon: 'success',
            confirmButtonText: 'Ok'
        
        // Cuando le den OK lo envie a la pagina de AdminPersonas.html en donde esta la TABLA    
        }).then(res => {
            location.href = 'perfil.html';
        });
    }
}

// (8) Copió y pegó y creo las funciones de resaltarLabelInvalido y resaltarInputInvalido en Constantes.js
function ValidarDatos(pTipoIdentificacion, pIdentificacion, pNombre, pApellido1, pApellido2, psexo, pEmail, pPass, pPassConfirmacion, pNacimiento, pEdad, pRol, pEstado, pFotoPerfil) {
    if (pTipoIdentificacion == '' || pTipoIdentificacion == null || pTipoIdentificacion == undefined) {
        resaltarLabelInvalido('lbltipoIdentificacion');
        resaltarInputInvalido('txttipoIdentificacion');
        ImprimirMsjError('Por favor seleccione tipo de identificacion');
        return false;
    }
    if (pIdentificacion == '' || pIdentificacion == null || pIdentificacion == undefined) {
        resaltarLabelInvalido('lblidentificacion');
        resaltarInputInvalido('txtidentificacion');
        ImprimirMsjError('Por favor ingrese su identificacion');
        return false;
    }
    if (pNombre == '' || pNombre == null || pNombre == undefined) {
        resaltarLabelInvalido('lblnombre');
        resaltarInputInvalido('txtnombre');
        ImprimirMsjError('Por favor ingrese su Nombre');
        return false;
    }
    if (pApellido1 == '' || pApellido1 == null || pApellido1 == undefined) {
        resaltarLabelInvalido('lblapellido1');
        resaltarInputInvalido('txtapellido1');
        ImprimirMsjError('Por favor ingrese su Primer Apellido');
        return false;
    }
    if (psexo == '' || psexo == null || psexo == undefined) {
        resaltarLabelInvalido('lblSexo');
        resaltarInputInvalido('txtsexo');
        ImprimirMsjError('Por favor indique su Sexo');
        return false;
    }
    if (pEmail == null || pEmail == '' || pEmail == undefined) {
        resaltarLabelInvalido('lblEmail');
        resaltarInputInvalido('txtEmail');
        ImprimirMsjError('Por favor ingrese su Correo');
        return false;
    }
    if (pPass == null || pPass == '' || pPass == undefined) {
        resaltarLabelInvalido('lblPass');
        resaltarInputInvalido('txtPass');
        ImprimirMsjError('Por favor ingrese su Contraseña');
        return false;
    }
    if (pPassConfirmacion == null || pPassConfirmacion == '' || pPassConfirmacion == undefined) {
        resaltarLabelInvalido('lblPass2');
        resaltarInputInvalido('txtPass2');
        ImprimirMsjError('Por favor ingrese su Confrimacion de Contraseña');
        return false;
    }
    if (pPass != pPassConfirmacion) {
        resaltarLabelInvalido('lblPass');
        resaltarInputInvalido('txtPass');
        resaltarLabelInvalido('lblPass2');
        resaltarInputInvalido('txtPass2');
        ImprimirMsjError('Por favor ingrese ambas Contraseñas iguales');
        return false;
    }
    if (pNacimiento == '' || pNacimiento == null || pNacimiento == undefined || new Date(pNacimiento) >= new Date()) {
        resaltarLabelInvalido('lblnacimiento');
        resaltarInputInvalido('txtnacimiento');
        ImprimirMsjError('Por favor ingrese una fecha de nacimiento menor a hoy');
        return false;
    }
    if (pEdad == null || pEdad == undefined) {
        ImprimirMsjError('Estimado usuario  la edad es requerido');
        resaltarLabelInvalido('lbledad');
        resaltarInputInvalido('txtedad');
        inputEdad.value = 0;
        return false;
    } else if (pEdad <= 0 || pEdad > 120) {
        ImprimirMsjError('Por favor indique una edad valida entre 1 y 120 años');
        resaltarLabelInvalido('lbledad');
        resaltarInputInvalido('txtedad');
        inputEdad.value = 0;
        return false;
    }
    if (pRol == null || pRol == '' || pRol == undefined || pRol == 0) {
        resaltarLabelInvalido('lblRol');
        resaltarInputInvalido('txtRol');
        ImprimirMsjError('Por favor indique un Rol');
        return false;
    }
    return true;
}