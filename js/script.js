class Turno {
    constructor(nombreApellido, especialidad, fecha){
        this.nombreApellido = nombreApellido;
        this.especialidad = especialidad;
        this.fecha = fecha;
    }

}

function reservarTurno() {
    let nombre = '';
    if (verificarTurno()) {
        const nuevoTurno = new Turno();
        nuevoTurno.nombre = pedirNombre();
        nuevoTurno.especialidad = pedirEspecialidad();
        nuevoTurno.fecha = pedirFecha();
        if (nuevoTurno.nombre != "" && nuevoTurno.especialidad != "" && nuevoTurno.fecha != "") {
            alert("SU TURNO HA SIDO RESERVADO CON ÉXITO. \n" + "\n Nombre de la mascota: " + nuevoTurno.nombre + "\n Especialidad: " + nuevoTurno.especialidad  + "\n Fecha del turno: " + nuevoTurno.fecha);
        }
        else 
            alert ("Hubo un problema reservando su turno, por favor cargue nuevamente la página y solicitelo de vuelta.")
    }
}

function pedirFecha(){
    let fecha = prompt("Por favor ingrese la fecha para el turno utilizando el siguiente formato: dd/mm/aaaa. Por ej: 23/12/2022");
    while (!esFechaValida(fecha)) {
        fecha = prompt("La fecha es inválida.\n Por favor verifique la fecha y el formato e ingresela nuevamente: dd/mm/aaaa");
    }
    return fecha;
}

function pedirEspecialidad(){
    let especialidad = "";
    while (!esEspecialidadValida(especialidad)) {
        especialidad = prompt("Por favor ingrese una especialidad: Clinica, Bañadero o Laboratorio").toUpperCase();
    }
    return especialidad;
}

function esEspecialidadValida(especialidad){
    let especialidadValida = false
    const arrayEspecialidad = ["BAÑADERO", "CLINICA", "CLÍNICA", "LABORATORIO"]
    if (arrayEspecialidad.includes(especialidad)) {
        especialidadValida = true;
    }
    return especialidadValida
}

function pedirNombre() {
    let nombre = "";
    while (nombre == "") {
        nombre = prompt("Por favor ingrese el nombre de su mascota")
    } 
    return nombre;
}

function verificarTurno() {
    let turno = "";
    while ((turno != "SI") && (turno != "NO")) {
        turno = prompt("Desea reservar un turno? Ingrese SI o NO.").toUpperCase();
    }
    if (turno == "SI") {
        return true;
    }
    else {
        return false;
    }
}

function esFechaValida(fecha) {
    const fechaArray = fecha.split("/");
    console.log(fechaArray);
    if ((fechaArray.length != 3)) {
        console.log("El formato de fecha es inválido")
        return false;
    }
    else {
        dia = parseInt(fechaArray[0]);
        mes = parseInt(fechaArray[1]);
        anio = parseInt(fechaArray[2]);
        return validarFecha(dia, mes, anio)
    }
}

function validarFecha(dia, mes, anio) {
    let fechaValida = false;
    fechaHoy = new Date();
    if (new Date(anio, dia, mes).getTime() < fechaHoy.getTime()) {
        console.log("La fecha es anterior a hoy");
        return fechaValida;
    }
    if (dia < 1 || dia > 31) {
        console.log("El dia no puede ser mayor a 31 o menos a 0");
        return fechaValida;
    }
    if ((mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12) && (dia <= 31)) {
        fechaValida = true;
    }
    if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && (dia <= 30)) {
        fechaValida = true;
    }
    if (esBisiesto(anio) && mes == 2 && dia <= 29) {
        fechaValida = true;
    }
    return fechaValida;
}

function esBisiesto(numeroAnio) {
    let bisiesto = false;
    if (numeroAnio % 4 == 0) {
        if (numeroAnio % 100 != 0 || numeroAnio % 400 == 0) {
            bisiesto = true;
        }
    }
    return bisiesto;
}