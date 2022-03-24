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

    changeMonths(next = true) {
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

    addEventListenerToCells() {
        let elCells = this.elCalendar.querySelectorAll(".grid__cell--gd");
        elCells.forEach(elCell => {
            elCell.addEventListener('click', e => {
                let elTarget = e.target;
                if (elTarget.classList.contains('grid__cell--disable') || elTarget.classList.contains('grid__cell--selected')) {
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

class Turno {
    constructor(nombreApellido = null, especialidad = null, fecha = null) {
        this.nombreApellido = nombreApellido;
        this.especialidad = especialidad;
        this.fecha = fecha;
        this.addEventListenerToSpec();

    }

    setNombre(nombre) {
        this.nombreApellido = nombre;
    }

    setEspecialidad(especialidad) {
        this.especialidad = especialidad;
    }

    setFecha(fecha) {
        this.fecha = fecha;
    }

    addEventListenerToSpec() {
        let elSpecs = document.querySelectorAll(".seleccion_especialidad");
        elSpecs.forEach(elSpecs => {
            elSpecs.addEventListener('click', e => {
                let elTarget = e.target;
                console.log(e.target)
                if (elTarget.classList.contains('seleccion_especialidad--clinica') || elTarget.classList.contains('seleccion__imagen--clinica') ||
                    elTarget.classList.contains('seleccion_titulo--clinica')) {
                    this.especialidad = 'CLINICA';
                    console.log("Entro a clinica")
                }
                if (elTarget.classList.contains('seleccion_especialidad--diagnostico') || elTarget.classList.contains('seleccion__imagen--diagnostico') ||
                    elTarget.classList.contains('seleccion_titulo--diagnostico')) {
                    this.especialidad = 'DIAGNOSTICO';
                    console.log("Entro a diagnostico")

                }
                if (elTarget.classList.contains('seleccion_especialidad--laboratorio') || elTarget.classList.contains('seleccion__imagen--laboratorio') ||
                    elTarget.classList.contains('seleccion_titulo--laboratorio')) {
                    this.especialidad = 'LABORATORIO';
                    console.log("Entro a Lab")

                }
            });
        });
    };

}

//TODO: CREAR LAS PÁGINAS DE TURNO DINÁMICAMENTE. NO IR A LA SIGUIENTE PÁGINA SI ALGUN DATO NO ES COMPLETADO DENTRO DE SU PAGINA
//MOSTRAR INFORMACION DEL TURNO POR PANTALLA. 


// let calendar = new Calendar('calendar');
// let turno = new Turno()
// let menuIndex = 1;
mostrarMenu1();

function mostrarMenu1() {
    // CREAMOS LOS ELEMENTOS PARENT
    const contenedorMenuTurnos = document.getElementById("container_MenuTurnos")
    const menuTurnosTitulo = document.createElement("div")
    const menuTurnosEspecialidades = document.createElement("div")
    const rowMenuTurnos = document.createElement("div")
    const arrEspecialidades = [
        {id: '0', especialidad: "CLÍNICA", img: "../img/clinica111x106.png", customClass: "seleccion_especialidad--clinica"},
        {id: '1', especialidad: "LABORATORIO", img: "../img/laboratorio111x106.png", customClass: "seleccion_especialidad--laboratorio"},
        {id: '2', especialidad: "DIAGNÓSTICO POR IMÁGENES", img: "../img/diagnostico111x106.png", customClass: "seleccion_especialidad--diagnostico"}
    ]

    //AGREGAMOS CLASES 
    rowMenuTurnos.className = "row text-center menu__opcion--especialidad"
    menuTurnosTitulo.className = "col-md-12 menu__opcion--titulo"

    //AGREGAMOS CONTENIDO
    menuTurnosTitulo.innerHTML = "Por favor seleccione la especialidad"
    rowMenuTurnos.append(menuTurnosTitulo, menuTurnosEspecialidades)
    console.log(rowMenuTurnos)
    contenedorMenuTurnos.append(rowMenuTurnos)
    console.log(contenedorMenuTurnos)
    

    for (especialidades of arrEspecialidades) {
        const divEspecialidad = document.createElement("div")
        const imgEspecialidad = document.createElement("img")
        const spanEspecialidad = document.createElement("span")

        divEspecialidad.className = "col-md-4 seleccion_especialidad"

        spanEspecialidad.className = "seleccion_especialidad--title"
        spanEspecialidad.append(especialidades.especialidad)
        imgEspecialidad.src = especialidades.img

        divEspecialidad.append(imgEspecialidad,spanEspecialidad)
        rowMenuTurnos.append(divEspecialidad)
         
    }
}


// calendar.getElement().addEventListener('change', e => {
//     turno.setFecha(calendar.value().format('LLL'));
// });


// showMenu(menuIndex);

// function turnoMenu(n) {
//     showMenu(menuIndex += n);

// }

// function showMenu(n) {
//     let menus = document.querySelectorAll(".menu__opciones");
//     let botones = document.querySelectorAll(".menu__boton")
//     const botonAnt = document.getElementById("menu__boton--ant")
//     const botonSig = document.getElementById("menu__boton--sig")



//     for (let i = 0; i < menus.length; i++) {
//         menus[i].classList.add('display__none')
//         if (i == 0) {
//             botonAnt.classList.add('menu__boton--disabled')
//             botonSig.classList.remove('menu__boton--disabled')
//         }
//         else if (i == menus.length) {
//             botonAnt.classList.remove('menu__boton--disabled')
//             botonSig.innerHTML = "Finalizar"
//         }
//         else {
//             botonSig.classList.remove('menu__boton--disabled')
//             botonAnt.classList.remove('menu__boton--disabled')
//         }

//     }
//     menus[n - 1].classList.remove('display__none');

// }