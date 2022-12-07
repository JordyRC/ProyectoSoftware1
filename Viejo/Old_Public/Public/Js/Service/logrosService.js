'use strict';

let listaObjetivos = [];

function InsertarObjetivos(nObjetivo) {
    let objetivoNuevo = [];
    objetivoNuevo.push(nObjetivo);
    listaObjetivos.push(objetivoNuevo);
}

function ObtenerListaObjetivos() {
    return listaObjetivos;
}