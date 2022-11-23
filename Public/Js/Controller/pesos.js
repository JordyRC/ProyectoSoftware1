'use strict'

const btnRegistroPeso = document.getElementById('btnRegistroPeso');
const containerModalRegistroPesos = document.getElementById('containerModalRegistroPesos');
const closeFormPesos = document.getElementById('spanRegistroPesos');

btnRegistroPeso.addEventListener('click',()=>{containerModalRegistroPesos.classList.add('showRegistroPesos');});
closeFormPesos.addEventListener('click',()=>{containerModalRegistroPesos.classList.remove('showRegistroPesos');});


// ***** Mostrar datos en la tabla 

const form =document.getElementById("registrarPeso")

form.addEventListener("submit",function(eventPesos){
    eventPesos.preventDefault();
    let registrarPeso = new FormData(form);
    insertRowInTablaRegistos(registrarPeso)

    }
)

function insertRowInTablaRegistos(registrarPeso){
        
    let tableRegistros = document.getElementById("tablaPesos")
    let newRegistrosPesorow = tableRegistros.insertRow(+1);

    let newTypecell= newRegistrosPesorow.insertCell(0);
    newTypecell.textContent = registrarPeso.get("IntRegistroPeso")

    newTypecell= newRegistrosPesorow.insertCell(1);
    newTypecell.textContent = registrarPeso.get("txtFechaPeso")

    newTypecell= newRegistrosPesorow.insertCell(2);
    newTypecell.textContent = registrarPeso.get("timeIncio")
}