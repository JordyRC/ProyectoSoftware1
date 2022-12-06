'use strict';

/*************** LISTAR  *******************/

// 1) Declaramos un arreglo
let listaPersonas = [];


// 2) Llamamos a la funcion, la creamos global y se ejecuta cuando se cargue este controller
GetListaPersonas();

// 3) Creamos la funcion asincrona GetListaPersonas
// La cual llama al ProcessGet que le pasa el router ListarPersonas y lo guarda en la variable listaPersonas
async function GetListaPersonas(){
    // se le pasa el pRouterName ('ListarPersonas', esta en los Route) y pParams pero este metodo no recibe parametros por eso s epone null

    /* 
    ProcessGet = Funcion creada en GeneralService.js
    ProcessGet(pRouterName, pParams) 
    ProcessGet('ListarPersonas', null);
    */
    let result = await ProcessGet('ListarPersonas', null);
        await ImprimirPersonas();
    // si todo esta bien ImprimirPersonas y si no ImprimirMsjError
    if (result != null && result.resultado == true) {
        listaPersonas = result.ListaPersonasDB; // ListaPersonasDB lo devulve del metodo ListarPersonas en PersonaRoute.js
        await ImprimirPersonas();
        console.log(listaPersonas);
    } else {
        // 4) Crea ImprimirMsjError en Constantes.js
        ImprimirMsjError(result.msj);
        return;
    }
}

// 5) Funcion ImprimirPersonas mencionada en la funcion GetListaPersonas ARRIBA
async function ImprimirPersonas(){
    // tbdPersonas ID del body de la tabla en AdminPersonas.html
    // Limpiamos la tabla AdminPersonas.html
    let tbody = document.getElementById('tbdPersonas');
    tbody.innerHTML = ''; // la tabla se refresca

    
    // (6) Creamos la fila y las celdas
    for (let i = 0; i < listaPersonas.length; i++) {

        
    
            let fila = tbody.insertRow();
            let celdaTipoIdentificacion = fila.insertCell();
            let celdaIdentificacion = fila.insertCell();
            let celdaNombreCompleto = fila.insertCell();
            let celdaEmail = fila.insertCell();
            let celdaSexo = fila.insertCell();
            let celdaNacimiento = fila.insertCell();
            let celdaEdad = fila.insertCell();
            let celdaEstado = fila.insertCell();
            let celdaRol = fila.insertCell();
            let celdaAcciones = fila.insertCell();

            /** ABAJO Le metemos la info a cada celda **/

            // ObtenerTipoIdentificacion es una funcion que cambia el valor del # para saber el tipo de identificacion. Creada en Constantes.js
            //'Física'; 'Jurídica'; 'Dimex'; 'Pasaporte';'Sin Identificación';
            celdaTipoIdentificacion.innerHTML = ObtenerTipoIdentificacion(listaPersonas[i].TipoIdentificacion);

            celdaIdentificacion.innerHTML = listaPersonas[i].Identificacion;

            celdaNombreCompleto.innerHTML = listaPersonas[i].Nombre + ' ' + listaPersonas[i].Apellido1 + ' ' + listaPersonas[i].Apellido2;

            celdaEmail.innerHTML =  listaPersonas[i].Email;        
            celdaEdad.innerHTML = listaPersonas[i].Edad;

            // Funciones creadas en Constantes.js // ObtenerEstado ObtenerRol
            celdaEstado.innerHTML = ObtenerEstado(listaPersonas[i].Estado);

            celdaRol.innerHTML = ObtenerRol(listaPersonas[i].Rol);

            celdaSexo.innerHTML = listaPersonas[i].Sexo;

            // Fecha de Nacimiento
            // Poner en POSTMAN en formato ANO-MES-DIA 1994-09-30
            let fechaNac = new Date(listaPersonas[i].Nacimiento.replace('Z',''));
            celdaNacimiento.innerHTML = fechaNac.getDate() + '/' + (fechaNac.getMonth() + 1) + '/' + fechaNac.getFullYear();


            // Crear BOTONES / ACCIONES

            /*************** EDITAR ******************************/
            let btnEdit = document.createElement('button');
            btnEdit.type = 'button'; // TIPO BUTTON PARA QUE NO REFRESQUE LA PANTALLA
            btnEdit.innerText = '✎'; // Googlear icon text
            btnEdit.title = 'EDITAR'; // texto que aparece al poner el cursor sobre el icono '✎'
            btnEdit.classList.add('btnsTabla');

            // ACCION DEL BOTON DE AdminPersonas.html onclick
            btnEdit.onclick = function(){
                // Carga la info en el formulario para que se pueda editar
                location.href = 'GestionarPersona.html?_id=' + listaPersonas[i]._id;
            };      

            /*************** ELIMINAR ******************************/
            let btnDelete = document.createElement('button');
            btnDelete.type = 'button';
            btnDelete.innerText = '🗑️';
            btnDelete.title = 'ELIMINAR';
            btnDelete.classList.add('btnsTabla');
            btnDelete.onclick = async function(){
                // MSJ DE CONFIRMACION
                let confirmacion = false;
                await Swal.fire({
                    title: 'Eliminación de registro',
                    text:'Desea eliminar el registro de ' + listaPersonas[i].Nombre + ' ' + listaPersonas[i].Apellido1 + ' ' + listaPersonas[i].Apellido2 + ' identificación: ' + listaPersonas[i].Identificacion + '?',
                    // listaPersonas[i].Identificacion lo toma de arriba en donde se le mete info a las celdas, linea 83
                    icon: 'warning',
                    showDenyButton: true,
                    denyButtonText: 'Cancelar',
                    confirmButtonText: 'Confirmar'

                // confirmacion guarda si el usario le dio Cancelar o Confirmar    
                }).then((res) => {
                    confirmacion = res.isConfirmed;
                });

                if (confirmacion == true) {
                    // Llamamos al ID de la persona que se va a eliminar
                    let data = {
                        '_id': listaPersonas[i]._id
                    };
                    // Llamamos al ProcessDelete del GeneralService.js
                    // ProcessDelete(pRouterName, pData)
                    // EliminarPersona es el router de PersonaRoute.js
                    let result = await ProcessDelete('EliminarPersona', data);
                    if (result.resultado == true) {
                        ImprimirMsjSuccess(result.msj);
                    } else {
                        ImprimirMsjError(result.msj);
                    }
                    // Refrescamos la pagina
                    await GetListaPersonas();
                }
            };

            /*************** INACTIVAR *****************************/           
            let btnInactivar = document.createElement('button');
            btnInactivar.type = 'button';
            btnInactivar.innerText = '💓off';
            btnInactivar.title = 'INACTIVAR';
            btnInactivar.classList.add('btnsTabla');
            btnInactivar.onclick = async function(){
                let confirmacion = false;
                await Swal.fire({
                    title:'Confirmar inactivar',
                    text: 'Desea inactivar el registro de '  + listaPersonas[i].Nombre + ' ' + listaPersonas[i].Apellido1 + ' ' + listaPersonas[i].Apellido2 + ' identificación: ' + listaPersonas[i].Identificacion + '?',
                    icon: 'warning',
                    showDenyButton: true,
                    denyButtonText: 'Cancelar',
                    confirmButtonText: 'Confirmar'
                }).then((res) => {
                    confirmacion = res.isConfirmed;
                });

                if (confirmacion == true) {
                    let data = {
                        '_id' : listaPersonas[i]._id
                    };
                    let result =  await ProcessPut('DesactivarPersona', data, null);
                    if (result.resultado == true) {
                        ImprimirMsjSuccess(result.msj);
                    } else {
                        ImprimirMsjError(result.msj);
                    }
                    
                    await GetListaPersonas();
                }
            };


            // PARA INSERTAR LAS ACCIONES A LA TABLA
            // Se crea el DIV 
            let div =  document.createElement('div');
            div.appendChild(btnEdit);
            div.appendChild(btnDelete);
            div.appendChild(btnInactivar);
            
            celdaAcciones.appendChild(div);
        }     
    
}

// async function ImprimirPersonas() {
//     let tbody = document.getElementById('tbdPersonas');
//     tbody.innerHTML = '';

//     let filtro = inputFiltro.value;

//     for (let i = 0; i < listaPersonas.length; i++) {

//         if (listaPersonas[i].Nombre.toLowerCase().includes(filtro) ||
//             listaPersonas[i].Apellido1.toLowerCase().includes(filtro) ||
//             ObtenerEstado(listaPersonas[i].Estado).includes(filtro) ||
//             listaPersonas[i].Edad.toString().includes(filtro)
//         ) {
//             let fila = tbody.insertRow();
//             let celdaTipoIdentificacion = fila.insertCell();
//             let celdaIdentificacion = fila.insertCell();
//             let celdaNombreCompleto = fila.insertCell();
//             let celdaEmail = fila.insertCell();
//             let celdaSexo = fila.insertCell();
//             let celdaNacimiento = fila.insertCell();
//             let celdaEdad = fila.insertCell();
//             let celdaEstado = fila.insertCell();
//             let celdaRol = fila.insertCell();
//             let celdaAcciones = fila.insertCell();

//             celdaTipoIdentificacion.innerHTML = ObtenerTipoIdentificacion(listaPersonas[i].TipoIdentificacion);
//             celdaIdentificacion.innerHTML = listaPersonas[i].Identificacion;
//             celdaNombreCompleto.innerHTML = listaPersonas[i].Nombre + ' ' + listaPersonas[i].Apellido1 + ' ' + listaPersonas[i].Apellido2;
//             celdaEmail.innerHTML = listaPersonas[i].Email;
//             celdaEdad.innerHTML = listaPersonas[i].Edad;
//             celdaEstado.innerHTML = ObtenerEstado(listaPersonas[i].Estado);
//             celdaRol.innerHTML = ObtenerRol(listaPersonas[i].Rol);
//             celdaSexo.innerHTML = listaPersonas[i].Sexo;

//             let fechaNac = new Date(listaPersonas[i].Nacimiento.replace('Z', ''));
//             celdaNacimiento.innerHTML = fechaNac.getDate() + '/' + (fechaNac.getMonth() + 1) + '/' + fechaNac.getFullYear();

//             let btnEdit = document.createElement('button');
//             btnEdit.type = 'button';
//             btnEdit.innerText = '✎';
//             btnEdit.title = 'EDITAR';
//             btnEdit.classList.add('btnsTabla');
//             btnEdit.onclick = function () {
//                 location.href = 'GestionarPersona.html?_id=' + listaPersonas[i]._id;
//             };


//             let btnDelete = document.createElement('button');
//             btnDelete.type = 'button';
//             btnDelete.innerText = '🗑️';
//             btnDelete.title = 'ELIMINAR';
//             btnDelete.classList.add('btnsTabla');
//             btnDelete.onclick = async function () {
//                 let confirmacion = false;
//                 await Swal.fire({
//                     title: 'Eliminación de registro',
//                     text:'Desea eliminar el registro de ' + listaPersonas[i].Nombre + ' ' + listaPersonas[i].Apellido1 + ' ' + listaPersonas[i].Apellido2 + ' identificación: ' + listaPersonas[i].Identificacion + '?',
//                     icon: 'warning',
//                     showDenyButton: true,
//                     denyButtonText: 'Cancelar',
//                     confirmButtonText: 'Confirmar'
//                 }).then((res) => {
//                     confirmacion = res.isConfirmed;
//                 });

//                 if (confirmacion == true) {
//                     let data = {
//                         '_id': listaPersonas[i]._id
//                     };
//                     let result = await ProcessDelete('EliminarPersona', data);
//                     if (result.resultado == true) {
//                         ImprimirMsjSuccess(result.msj);
//                     } else {
//                         ImprimirMsjError(result.msj);
//                     }
//                     await GetListaPersonas();
//                 }
//             };


//             let btnInactivar = document.createElement('button');
//             btnInactivar.type = 'button';
//             btnInactivar.innerText = '💓off';
//             btnInactivar.title = 'INACTIVAR';
//             btnInactivar.classList.add('btnsTabla');
//             btnInactivar.onclick = async function () {
//                 let confirmacion = false;
//                 await Swal.fire({
//                     title:'Confirmar inactivar',
//                     text: 'Desea inactivar el registro de '  + listaPersonas[i].Nombre + ' ' + listaPersonas[i].Apellido1 + ' ' + listaPersonas[i].Apellido2 + ' identificación: ' + listaPersonas[i].Identificacion + '?',
//                     icon: 'warning',
//                     showDenyButton: true,
//                     denyButtonText: 'Cancelar',
//                     confirmButtonText: 'Confirmar'
//                 }).then((res) => {
//                     confirmacion = res.isConfirmed;
//                 });

//                 if (confirmacion == true) {
//                     let data = {
//                         '_id' : listaPersonas[i]._id
//                     };
//                     let result =  await ProcessPut('DesactivarPersona', data, null);
//                     if (result.resultado == true) {
//                         ImprimirMsjSuccess(result.msj);
//                     } else {
//                         ImprimirMsjError(result.msj);
//                     }
                    
//                     await GetListaPersonas();
//                 }
//             };

//             let div = document.createElement('div');
//             div.appendChild(btnEdit);
//             div.appendChild(btnDelete);
//             div.appendChild(btnInactivar);

//             celdaAcciones.appendChild(div);
//         }

//     }
// }