// Lista de materias y prerrequisitos
const materias = [
    {
        semestre: "Primer Semestre",
        items: [
            { nombre: "Cálculo diferencial e integral administrativo" },
            { nombre: "Matemática financiera" },
            { nombre: "Biocomercio e integración multicultural" },
            { nombre: "Contabilidad I" },
            { nombre: "Fundamentos de la programación" },
            { nombre: "Metodología de la investigación científica" }
        ]
    },
    {
        semestre: "Segundo Semestre",
        items: [
            { nombre: "Finanzas a corto plazo", prerequisitos: ["Matemática financiera"] },
            { nombre: "Estadística", prerequisitos: ["Cálculo diferencial e integral administrativo"] },
            { nombre: "Operaciones de comercio exterior básico", prerequisitos: ["Biocomercio e integración multicultural"] },
            { nombre: "Microeconomía", prerequisitos: ["Matemática financiera"] },
            { nombre: "Empresa, cultura y negocios en el mundo", prerequisitos: ["Biocomercio e integración multicultural"] },
            { nombre: "Liderazgo", prerequisitos: ["Metodología de la investigación científica"] }
        ]
    }
    // Agrega el resto de los semestres y materias aquí...
];

function guardarEstado() {
    const estado = Array.from(document.querySelectorAll('.materia')).map(m => m.classList.contains('aprobada'));
    localStorage.setItem('estadoMaterias', JSON.stringify(estado));
}

function cargarEstado() {
    return JSON.parse(localStorage.getItem('estadoMaterias') || '[]');
}

function reiniciarMalla() {
    if (confirm("¿Deseas reiniciar tu progreso?")) {
        localStorage.removeItem('estadoMaterias');
        location.reload();
    }
}

function estaAprobada(nombre) {
    return document.querySelector(`[data-nombre="${nombre}"]`)?.classList.contains('aprobada');
}

function crearMalla() {
    const contenedor = document.getElementById('malla-container');
    const estado = cargarEstado();
    let index = 0;

    materias.forEach(bloque => {
        const divSemestre = document.createElement('div');
        divSemestre.className = 'semestre';
        divSemestre.innerHTML = `<h2>${bloque.semestre}</h2>`;

        bloque.items.forEach(item => {
            const divMateria = document.createElement('div');
            divMateria.className = 'materia';
            divMateria.textContent = item.nombre;
            divMateria.dataset.nombre = item.nombre;

            if (estado[index]) {
                divMateria.classList.add('aprobada');
            } else if (item.prerequisitos && !item.prerequisitos.every(p => estaAprobada(p))) {
                divMateria.classList.add('bloqueada');
            }

            divMateria.addEventListener('click', () => {
                if (divMateria.classList.contains('bloqueada')) return;
                divMateria.classList.toggle('aprobada');
                guardarEstado();
                location.reload();
            });

            divSemestre.appendChild(divMateria);
            index++;
        });

        contenedor.appendChild(divSemestre);
    });
}

window.onload = crearMalla;

