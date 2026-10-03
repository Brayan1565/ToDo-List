const inputTarea = document.querySelector("#nuevaTarea");
const botonAgregar = document.querySelector("#agregarTarea");
const listaTareas = document.querySelector("#listaTareas");
const contador = document.querySelector("#contador");

const datosGuardados = localStorage.getItem("tareas");
const tareas = datosGuardados ? JSON.parse(datosGuardados) : [];

let filtroActual = "todas";

const botonesFiltro = document.querySelectorAll(".filtro");

botonesFiltro.forEach(function(boton) {
    boton.addEventListener("click", function() {
        filtroActual = boton.dataset.filtro;
        renderizarTareas();
    });
});

botonAgregar.addEventListener("click", function() {
    const texto = inputTarea.value;

    if (texto === "") {
        return;
    }

    const tarea = { texto: texto, completada: false };
    tareas.push(tarea);

    inputTarea.value = "";
    renderizarTareas();
});

function renderizarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));

    listaTareas.innerHTML = "";

    for (let i = 0; i < tareas.length; i++) {
        if (filtroActual === "pendientes" && tareas[i].completada) {
            continue;
        }
        if (filtroActual === "completadas" && !tareas[i].completada) {
            continue;
        }

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = tareas[i].texto;

        if (tareas[i].completada) {
            span.classList.add("completada");
        }

        span.addEventListener("click", function() {
            tareas[i].completada = !tareas[i].completada;
            renderizarTareas();
        });

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "✕";
        botonEliminar.classList.add("btn-eliminar");

        botonEliminar.addEventListener("click", function() {
            tareas.splice(i, 1);
            renderizarTareas();
        });

        li.appendChild(span);
        li.appendChild(botonEliminar);
        listaTareas.appendChild(li);
    }

    const pendientes = tareas.filter(function(tarea) {
        return !tarea.completada;
    }).length;

    contador.textContent = pendientes + " tarea(s) pendiente(s)";
}

renderizarTareas();