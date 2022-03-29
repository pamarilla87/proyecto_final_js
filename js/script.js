class Calendar {
    constructor(id) {
        this.cells = []
        this.selectedDate = null;
        this.currentMonth = dayjs();
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
            this.currentMonth = this.currentMonth.add(1, 'month');
        }
        else {
            this.currentMonth = this.currentMonth.subtract(1, 'month');
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
            if ((this.cells[i].notInCurrentMonth) || (this.cells[i].isBeforeToday)) {
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

    // TO FIX: Inmutabilidad de dayjs vs momentjs
    generateDates(monthToShow = dayjs()) {
        if (!dayjs.isDayjs(monthToShow)) {
            return null;
        }
        let today = dayjs()
        let dateStart = dayjs(monthToShow).startOf('month');
        let dateEnd = dayjs(monthToShow).endOf('month');
        let cells = [];

        while (dateStart.day() != 1) {
            dateStart = dateStart.subtract(1, 'days');
        }

        while (dateEnd.day() != 0) {
            dateEnd = dateEnd.add(1, 'days');
        }

        do {
            cells.push({
                date: dayjs(dateStart),
                notInCurrentMonth: dateStart.month() !== monthToShow.month(),
                isBeforeToday: dateStart <= today
            })
            dateStart = dateStart.add(1, 'days');
        } while (!dateStart.isAfter(dateEnd));

        return cells;
    }

}

class Turno {
    constructor(nombre = null, telefono = null, email = null, especialidad = null, fecha = null) {
        this.nombreMascota = nombre
        this.telefonoCliente = telefono
        this.emailCliente = email
        this.especialidad = especialidad;
        this.fecha = fecha;

    }

    setNombreMascota(nombre) {
        this.nombreMascota = nombre;
    }

    setTelefonoCliente(telefono) {
        this.telefonoCliente = telefono
    }

    setEmailCliente(email) {
        this.emailCliente = email
    }

    setEspecialidad(especialidad) {
        this.especialidad = especialidad;
    }

    setFecha(fecha) {
        this.fecha = fecha;
    }

}

//TODO: CREAR LAS PÁGINAS DE TURNO DINÁMICAMENTE. NO IR A LA SIGUIENTE PÁGINA SI ALGUN DATO NO ES COMPLETADO DENTRO DE SU PAGINA
//MOSTRAR INFORMACION DEL TURNO POR PANTALLA. 

mostrarMenuSeleccionEspecialidad();
let nuevoTurno = new Turno()


function addEventListenerToSpec() {
    let elSpecs = document.querySelectorAll(".seleccion_especialidad");
    elSpecs.forEach(elSpecs => {
        elSpecs.addEventListener('click', e => {
            let elTarget = e.target;
            let selectedSpec = document.querySelector(".especialidad_seleccionada");
            if (selectedSpec) {
                selectedSpec.classList.remove("especialidad_seleccionada")
            }
            if (elTarget.classList.contains('seleccion_especialidad--clinica')) {
                nuevoTurno?.setEspecialidad('CLÍNICA');
                elSpecs.classList.add("especialidad_seleccionada")
            }
            if (elTarget.classList.contains('seleccion_especialidad--diagnostico')) {
                nuevoTurno?.setEspecialidad('DIAGNÓSTICO');
                elSpecs.classList.add("especialidad_seleccionada")
            }
            if (elTarget.classList.contains('seleccion_especialidad--laboratorio')) {
                nuevoTurno?.setEspecialidad('LABORATORIO');
                elSpecs.classList.add("especialidad_seleccionada")
            }
        });
    });
};


function mostrarBotonesSig(id) {
    // CREAMOS ELEMENTOS PARENTS
    const contenedorMenuTurnos = document.getElementById("container_MenuTurnos");
    const divBotonSig = document.createElement("div")
    const divBotonAnt = document.createElement("div")
    const botonAnterior = document.createElement("button")
    const botonSiguiente = document.createElement("button")
    const rowBotones = document.createElement("div")

    // AGREGAMOS CLASES
    divBotonAnt.className = "menu__boton col-6"
    divBotonSig.className = "menu__boton col-6"
    divBotonSig.id = "menu__boton--sig"
    divBotonAnt.id = "menu__boton--ant"
    rowBotones.className = "menu__botones row text-center"
    rowBotones.id = "menu__botones--id"
    botonAnterior.id = "buttonTurnos_Ant"
    botonSiguiente.id = "buttonTurnos_Sig"
    divBotonAnt.id = "menu__boton--ant"


    // AGREGAMOS CONTENIDO
    botonAnterior.innerHTML = "Anterior"
    botonSiguiente.innerHTML = "Siguiente"

    divBotonSig.append(botonSiguiente)
    divBotonAnt.append(botonAnterior)
    rowBotones.append(divBotonAnt, divBotonSig)
    contenedorMenuTurnos.append(rowBotones)

    if (id == 0) {
        botonAnterior.classList.add("menu__boton--disabled")
        botonSiguiente.classList.remove("menu__boton--disabled")
    }
    if (id == 1) {
        botonAnterior.classList.remove("menu__boton--disabled")
        botonSiguiente.classList.remove("menu__boton--disabled")
    }
    if (id == 2) {
        botonAnterior.classList.remove("menu__boton--disabled")
        deleteElementById("menu__boton--sig")
        addSubmitButton(rowBotones);
        // botonSiguiente.classList.add("menu__boton--disabled")
    }
    addEventListenerBotonSiguiente(id);
    addEventListenerBotonAnterior(id);
}

function addSubmitButton(rowBotones) {
    let idMenu = 2
    const contenedorMenuTurnos = document.getElementById("container_MenuTurnos");
    const divBotonSubmit = document.createElement("div")
    const botonSubmit = document.createElement("input") 
    
    divBotonSubmit.className = "menu__boton col-6"
    divBotonSubmit.id = "menu__boton--sig"
    botonSubmit.className = "menu__boton--submit"
    botonSubmit.id = "buttonTurnos_Sig"
    botonSubmit.type = "submit"

    divBotonSubmit.append(botonSubmit)
    rowBotones.append(divBotonSubmit)
    contenedorMenuTurnos.append(rowBotones)

    addEventListenerBotonSiguiente(idMenu);
}

function addEventListenerBotonSiguiente(page) {
    let elAnt = document.querySelectorAll('#buttonTurnos_Sig')
    elAnt.forEach(elAnt => {
        elAnt.addEventListener('click', e => {
            if (page == 0) {
                if (!nuevoTurno.especialidad) {
                    alert("Por favor selecciones una especialidad")
                }
                else {
                    deleteElementById('menu__especialidad')
                    deleteElementById('menu__botones--id')
                    mostrarMenuCalendario();
                    // console.log("Pasar a la segunda página")
                }
            }
            if (page == 1) {
                if (!nuevoTurno.fecha) {
                    alert("Por favor seleccione la fecha")
                }
                else {
                    deleteElementById('menu__opcion--calendario')
                    deleteElementById('menu__botones--id')
                    mostrarFormTurnos()
                    // console.log("Pasar a la tercera página")
                }
            }
            if (page == 2) {
                // console.log("submit info")
                submitTurno()
            }
            
        });
    });
}

function submitTurno() {
    nuevoTurno?.setNombreMascota(document.getElementById('form_name').value)
    nuevoTurno?.setTelefonoCliente(document.getElementById('form_phone').value)
    nuevoTurno?.setEmailCliente(document.getElementById('form_email').value)

    const enJSON = JSON.stringify(nuevoTurno)
    sessionStorage.setItem("nuevoTurno", enJSON)
    console.log(enJSON)

}

function addEventListenerBotonAnterior(page) {
    let elAnt = document.querySelectorAll('#buttonTurnos_Ant')
    elAnt.forEach(elAnt => {
        elAnt.addEventListener('click', e => {
            if (page == 1) {
                mostrarMenuSeleccionEspecialidad()
                deleteElementById('menu__opcion--calendario')
                deleteElementById('menu__botones--id')
                console.log("Voler a la primera página")
            }
            if (page == 2) {
                mostrarMenuCalendario()
                deleteElementById('menu__form--id')
                deleteElementById('menu__botones--id')
                console.log("Volver a la segunda página")
            }
        });
    });
}

function mostrarMenuCalendario() {
    let idMenu = 1;
    const contenedorMenuTurnos = document.getElementById("container_MenuTurnos")
    const rowMenuTurnos = document.createElement("div")
    const menuTurnosTitulo = document.createElement("div")
    const menuTurnosCalendario = document.createElement("div")
    const spanMenuCalendario = document.createElement("span")

    // CLASES
    rowMenuTurnos.className = "menu__opcion--fecha row"
    rowMenuTurnos.id = "menu__opcion--calendario"
    menuTurnosTitulo.className = "col-md-12 menu__opcion--titulo"
    menuTurnosCalendario.className = "calendar menu__opcion--calendario"
    menuTurnosCalendario.id = "calendar"

    // CONTENIDO
    spanMenuCalendario.innerHTML = "Por favor seleccione la fecha"
    menuTurnosTitulo.append(spanMenuCalendario)
    rowMenuTurnos.append(menuTurnosTitulo, menuTurnosCalendario)
    contenedorMenuTurnos.append(rowMenuTurnos)

    let calendario = new Calendar('calendar');
    calendario.getElement().addEventListener('change', e => {
        nuevoTurno?.setFecha(calendario.value().format('DD-MMM-YY'))
    });

    mostrarBotonesSig(idMenu)
}

function mostrarFormTurnos() {
    let idMenu = 2;
    const contenedorMenuTurnos = document.getElementById("container_MenuTurnos")
    const rowMenuTurnos = document.createElement("div")
    const divForm = document.createElement("form")
    const arrInfoCliente = [
        { id: '0', field: "Nombre", type: "text", control: "form_name", holder: "Nombre de la mascota...", pattern:"" },
        { id: '1', field: "Email", type: "email", control: "form_email", holder: "Dirección de email...", pattern: "" },
        { id: '2', field: "Teléfono", type: "tel", control: "form_phone", holder: "(011) 4321-5678", pattern: "[0-9]{3}-[0-9]{4}-[0-9]{4}" }
    ];

    rowMenuTurnos.className = "menu__opcion menu__opcion--nombre row"
    rowMenuTurnos.id = "menu__form--id"
    divForm.className = "row g-3"
    divForm.action = "#"
    divForm.method = "POST"
    divForm.enctype = "multipart/form-data"

    

    for (dato of arrInfoCliente) {
        //CREAR PARENTS
        const divMenuOpcion = document.createElement("div")
        const divMenuLabel = document.createElement("label")
        const divMenuInput = document.createElement("input")

        // AGREGAR CLASES Y ATTRS
        divMenuOpcion.className = "col-md-12 menu_opciones"
        divMenuLabel.className = "form-label"
        divMenuLabel.for = "email"

        divMenuInput.type = dato.type
        divMenuInput.id = dato.control
        divMenuInput.className = "form-control"
        divMenuInput.placeholder = dato.holder
        divMenuInput.pattern = dato.pattern
        divMenuInput.required = true

        // AGREGAR CONTENIDO
        divMenuLabel.innerHTML = dato.field

        rowMenuTurnos.append(divForm)
        divForm.append(divMenuOpcion)
        divMenuOpcion.append(divMenuLabel, divMenuInput)
        contenedorMenuTurnos.append(rowMenuTurnos)
    }

    mostrarBotonesSig(idMenu)

}

function deleteElementById(elId) {
    const toDelete = document.getElementById(elId);
    toDelete.parentNode.removeChild(toDelete)
}

function mostrarMenuSeleccionEspecialidad() {
    let idMenu = 0
    
    // CREAMOS LOS ELEMENTOS PARENT
    const contenedorMenuTurnos = document.getElementById("container_MenuTurnos")
    const menuTurnosTitulo = document.createElement("div")
    const menuTurnosEspecialidades = document.createElement("div")
    const rowMenuTurnos = document.createElement("div")
    const arrEspecialidades = [
        { id: '0', especialidad: "CLÍNICA", img: "../img/clinica111x106.png", customClass: "seleccion_especialidad--clinica" },
        { id: '1', especialidad: "LABORATORIO", img: "../img/laboratorio111x106.png", customClass: "seleccion_especialidad--laboratorio" },
        { id: '2', especialidad: "DIAGNÓSTICO POR IMÁGENES", img: "../img/diagnostico111x106.png", customClass: "seleccion_especialidad--diagnostico" }
    ]

    //AGREGAMOS CLASES 
    rowMenuTurnos.className = "row text-center menu__opcion--especialidad"
    rowMenuTurnos.id = "menu__especialidad"
    menuTurnosTitulo.className = "col-md-12 menu__opcion--titulo"

    //AGREGAMOS CONTENIDO
    menuTurnosTitulo.innerHTML = "Por favor seleccione la especialidad"
    rowMenuTurnos.append(menuTurnosTitulo, menuTurnosEspecialidades)
    contenedorMenuTurnos.append(rowMenuTurnos)

    // MOSTRAMOS BOTON SIG Y ANT
    mostrarBotonesSig(idMenu)

    // CREAMOS VISTA ESPECIALIDADES
    for (especialidades of arrEspecialidades) {
        const divEspecialidad = document.createElement("div")
        const imgEspecialidad = document.createElement("img")
        const spanEspecialidad = document.createElement("span")

        divEspecialidad.className = "col-md-4 seleccion_especialidad"
        imgEspecialidad.className = "seleccion_especialidad--image"

        spanEspecialidad.className = "seleccion_especialidad--title"

        imgEspecialidad.classList.add(especialidades.customClass)
        spanEspecialidad.append(especialidades.especialidad)
        imgEspecialidad.src = especialidades.img

        divEspecialidad.append(imgEspecialidad, spanEspecialidad)
        rowMenuTurnos.append(divEspecialidad)

    }

    addEventListenerToSpec();
}