class Turno {
    constructor(nombreApellido, especialidad, fecha) {
        this.nombreApellido = nombreApellido;
        this.especialidad = especialidad;
        this.fecha = fecha;
    }

    pedirNombre() {
        let nombre = "";
        while (nombre == "") {
            nombre = prompt("Por favor ingrese el nombre de su mascota")
        }
        return nombre;
    }

    pedirEspecialidad() {
        let especialidad = "";
        while (!this.esEspecialidadValida(especialidad)) {
            especialidad = prompt("Por favor ingrese una especialidad: Clinica, Bañadero o Laboratorio").toUpperCase();
        }
        return especialidad;
    }

    esEspecialidadValida(especialidad) {
        let especialidadValida = false
        const arrayEspecialidad = ["BAÑADERO", "CLINICA", "CLÍNICA", "LABORATORIO"]
        if (arrayEspecialidad.includes(especialidad)) {
            especialidadValida = true;
        }
        return especialidadValida
    }

    pedirFecha() {
        let fecha = prompt("Por favor ingrese la fecha para el turno utilizando el siguiente formato: dd/mm/aaaa. Por ej: 23/12/2022");
        while (!esFechaValida(fecha)) {
            fecha = prompt("La fecha es inválida.\n Por favor verifique la fecha y el formato e ingresela nuevamente: dd/mm/aaaa");
        }
        return fecha;
    }

}

class Calendar {
    constructor(id) {
        this.cells = []
        this.selectedDate = null;
        this.currentMonth = moment();
        this.elCalendar = document.getElementById(id);
        this.showTeamplate();
        this.elGridBody = this.elCalendar.querySelector('.grid__body');
        this.elMonthName = this.elCalendar.querySelector('.nombre--mes');
        this.showCells();
    }

    showTeamplate() {
        this.elCalendar.innerHTML = this.getTemplate();
        this.addEventListenerToControls();
    }

    addEventListenerToControls() {
        let elControls = this.elCalendar.querySelectorAll('.control');
        elControls.forEach(elControl => {
            elControl.addEventListener('click', e => {
                let elTarget = e.target;
                let next = false;
                if (elTarget.classList.contains('control--sig')) {
                    next = true;
                }
                this.changeMonths(next);
                this.showCells();
            })
        });
    }

    changeMonths(next = true){
        if (next) {
            this.currentMonth.add(1, 'month');
        }
        else {
            this.currentMonth.subtract(1, 'month');
        }
    }

    getTemplate() {
        let template = `
            <div class="calendar__header">
                <button class="control control--ant"> &lt; </button>
                <span class="nombre--mes">Enero 2022</span>
                <button class="control control--sig"> &gt; </button>
            </div>
            <div class="calendar__body">
                <div class="grid">
                    <div class="grid__header">
                        <span class="grid__cell grid__cell--gh">Lun</span>
                        <span class="grid__cell grid__cell--gh">Mar</span>
                        <span class="grid__cell grid__cell--gh">Mie</span>
                        <span class="grid__cell grid__cell--gh">Jue</span>
                        <span class="grid__cell grid__cell--gh">Vie</span>
                        <span class="grid__cell grid__cell--gh">Sab</span>
                        <span class="grid__cell grid__cell--gh">Dom</span>
                    </div>
                    <div class="grid__body">

                    </div>
                </div>
            </div>
        `;
        return template;
    }

    showCells() {
        this.cells = this.generateDates(this.currentMonth)
        if (this.cells === null) {
            console.error('Error generando date')
            return;
        }

        this.elGridBody.innerHTML = '';
        let templateCell = '';
        let disabledClass = '';
        for (let i = 0; i < this.cells.length; i++) {
            disabledClass = '';
            if (!this.cells[i].isInCurrentMonth) {
                disabledClass = 'grid__cell--disable'   
            } 
            templateCell += `
                <span class="grid__cell grid__cell--gd ${disabledClass}" data-cell-id="${i}"> ${this.cells[i].date.date()} </span>
            `
        }
        this.elMonthName.innerHTML = this.currentMonth.format('MMM YYYY')
        this.elGridBody.innerHTML = templateCell;
        this.addEventListenerToCells();
    }



    addEventListenerToCells(){
        let elCells = this.elCalendar.querySelectorAll(".grid__cell--gd");
        elCells.forEach(elCell => {
            elCell.addEventListener('click', e => {
                let elTarget = e.target;
                if(elTarget.classList.contains('grid__cell--disable') || elTarget.classList.contains('grid__cell--selected')) {
                    return;
                }
                let selectedCell = this.elGridBody.querySelector('.grid__cell--selected');
                if (selectedCell) {
                    selectedCell.classList.remove('grid__cell--selected');
                }
                elTarget.classList.add('grid__cell--selected');
                this.selectedDate = this.cells[parseInt(elTarget.dataset.cellId)].date;
                this.elCalendar.dispatchEvent(new Event('change'));
            });
        }); 
    }

    getElement() {
        return this.elCalendar;
    }

    value() {
        return this.selectedDate;
    }

    generateDates(monthToShow = moment()) {
        if (!moment.isMoment(monthToShow)) {
            return null;
        }
        let dateStart = moment(monthToShow).startOf('month');
        let dateEnd = moment(monthToShow).endOf('month');
        let cells = [];

        while (dateStart.day() !== 1) {
            dateStart.subtract(1, 'days');
        }

        while (dateEnd.day() !== 0) {
            dateEnd.add(1, 'days');
        }

        do {
            cells.push({
                date: moment(dateStart),
                isInCurrentMonth: dateStart.month() === monthToShow.month()

            })
            dateStart.add(1, 'days');

        } while (dateStart.isSameOrBefore(dateEnd));

        return cells;
    }

}

function reservarTurno() {
    let nombre = '';
    if (verificarTurno()) {
        const nuevoTurno = new Turno();
        nuevoTurno.nombre = nuevoTurno.pedirNombre();
        nuevoTurno.especialidad = nuevoTurno.pedirEspecialidad();
        nuevoTurno.fecha = nuevoTurno.pedirFecha();
        if (nuevoTurno.nombre != "" && nuevoTurno.especialidad != "" && nuevoTurno.fecha != "") {
            alert("SU TURNO HA SIDO RESERVADO CON ÉXITO. \n" + "\n Nombre de la mascota: " + nuevoTurno.nombre + "\n Especialidad: " + nuevoTurno.especialidad + "\n Fecha del turno: " + nuevoTurno.fecha);
        }
        else
            alert("Hubo un problema reservando su turno, por favor cargue nuevamente la página y solicitelo de vuelta.")
    }
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

// function esFechaValida(fecha) {
//     const fechaArray = fecha.split("/");
//     // console.log(fechaArray);
//     if ((fechaArray.length != 3)) {
//         console.log("El formato de fecha es inválido")
//         return false;
//     }
//     else {
//         dia = parseInt(fechaArray[0]);
//         mes = parseInt(fechaArray[1]);
//         anio = parseInt(fechaArray[2]);
//         return validarFecha(dia, mes, anio)
//     }
// }

// function validarFecha(dia, mes, anio) {
//     let fechaValida = false;
//     fechaHoy = new Date();
//     if (new Date(anio, dia, mes).getTime() < fechaHoy.getTime()) {
//         console.log("La fecha es anterior a hoy");
//         return fechaValida;
//     }
//     if (dia < 1 || dia > 31) {
//         console.log("El dia no puede ser mayor a 31 o menos a 0");
//         return fechaValida;
//     }
//     if ((mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12) && (dia <= 31)) {
//         fechaValida = true;
//     }
//     if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && (dia <= 30)) {
//         fechaValida = true;
//     }
//     if (esBisiesto(anio) && mes == 2 && dia <= 29) {
//         fechaValida = true;
//     }
//     return fechaValida;
// }

// function esBisiesto(numeroAnio) {
//     let bisiesto = false;
//     if (numeroAnio % 4 == 0) {
//         if (numeroAnio % 100 != 0 || numeroAnio % 400 == 0) {
//             bisiesto = true;
//         }
//     }
//     return bisiesto;
// }