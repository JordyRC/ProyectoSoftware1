function registrarActividad(pFechaInicio, pFechaFinal, pHoraInicio, pHoraFinal, pActividadFisica){
    let nuevaActividad = [];
    nuevaActividad.push(pFechaInicio, pFechaFinal, pHoraInicio, pHoraFinal, pActividadFisica);

    listaActividades.push(nuevaActividad);
}

function obtenerListaLibros(){
    return listaActividades;
}