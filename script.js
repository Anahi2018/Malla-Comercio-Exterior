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
    },
    {
        semestre: "Tercer Semestre",
        items: [
            { nombre: "Gestión del talento humano", prerequisitos: ["Liderazgo"] },
            { nombre: "Control aduanero y tributario de comercio exterior", prerequisitos: ["Operaciones de comercio exterior básico"] },
            { nombre: "Perspectiva internacional de negociación", prerequisitos: ["Empresa, cultura y negocios en el mundo"] },
            { nombre: "Técnica aduanera I", prerequisitos: ["Operaciones de comercio exterior básico"] },
            { nombre: "Administración e innovación en modelos de negocios internacionales", prerequisitos: ["Empresa, cultura y negocios en el mundo"] },
            { nombre: "Realidad nacional y geopolítica", prerequisitos: ["Liderazgo"] }
        ]
    },
    {
        semestre: "Cuarto Semestre",
        items: [
            { nombre: "Cadena de suministros global", prerequisitos: ["Perspectiva internacional de negociación"] },
            { nombre: "Estadística aplicada al mercado", prerequisitos: ["Estadística"] },
            { nombre: "Macroeconomía", prerequisitos: ["Microeconomía", "Estadística"] },
            { nombre: "Análisis de datos del comercio exterior", prerequisitos: ["Control aduanero y tributario de comercio exterior", "Perspectiva internacional de negociación"] },
            { nombre: "Operaciones de comercio exterior avanzado", prerequisitos: ["Operaciones de comercio exterior básico"] },
            { nombre: "Técnica aduanera II", prerequisitos: ["Técnica aduanera I"] }
        ]
    },
    {
        semestre: "Quinto Semestre",
        items: [
            { nombre: "Obstáculos técnicos al comercio exterior", prerequisitos: ["Operaciones de comercio exterior avanzado"] },
            { nombre: "Finanzas a largo plazo", prerequisitos: ["Finanzas a corto plazo"] },
            { nombre: "Geoeconomía y negociación internacional", prerequisitos: ["Perspectiva internacional de negociación"] },
            { nombre: "Contratación internacional", prerequisitos: ["Cadena de suministros global", "Análisis de datos del comercio exterior"] },
            { nombre: "Técnicas de negociación y comercialización internacional I", prerequisitos: ["Cadena de suministros global"] },
            { nombre: "Regímenes aduaneros y sus procedimientos", prerequisitos: ["Operaciones de comercio exterior avanzado", "Técnica aduanera II"] }
        ]
    },
    {
        semestre: "Sexto Semestre",
        items: [
            { nombre: "Mercadotecnia", prerequisitos: ["Contratación internacional"] },
            { nombre: "Finanzas internacionales", prerequisitos: ["Finanzas a largo plazo"] },
            { nombre: "Negociaciones y comunicación internacional", prerequisitos: ["Geoeconomía y negociación internacional"] },
            { nombre: "Técnicas de negociación y comercialización internacional II", prerequisitos: ["Técnicas de negociación y comercialización internacional I"] },
            { nombre: "Diseño y evaluación de proyectos", prerequisitos: ["Finanzas a largo plazo", "Obstáculos técnicos al comercio exterior"] },
            { nombre: "Gestión y emprendimiento", prerequisitos: ["Realidad nacional y geopolítica"] }
        ]
    },
    {
        semestre: "Séptimo Semestre",
        items: [
            { nombre: "Tratados comerciales internacionales", prerequisitos: ["Técnicas de negociación y comercialización internacional I"] },
            { nombre: "Herramienta para la toma decisiones", prerequisitos: ["Mercadotecnia"] },
            { nombre: "Operación aduanera", prerequisitos: ["Técnica aduanera II"] },
            { nombre: "Logística internacional", prerequisitos: ["Cadena de suministros global"] },
            { nombre: "Estrategias de internacionalización", prerequisitos: ["Negociaciones y comunicación internacional"] },
            { nombre: "Prácticas laborales" }
        ]
    },
    {
        semestre: "Octavo Semestre",
        items: [
            { nombre: "Innovación, mercados y desarrollo", prerequisitos: ["Estrategias de internacionalización"] },
            { nombre: "Gestión estratégica de comercio exterior", prerequisitos: ["Administración e innovación en modelos de negocios internacionales"] },
            { nombre: "Inteligencia de negocios internacionales", prerequisitos: ["Operación aduanera", "Negociaciones y comunicación internacional"] },
            { nombre: "Comercio para el desarrollo sostenible", prerequisitos: ["Tratados comerciales internacionales"] },
            { nombre: "Normas de origen", prerequisitos: ["Operación aduanera", "Tratados comerciales internacionales"] },
            { nombre: "MIC-PI profesionalizante" }
        ]
    }
];

function guardarEstado() {
    const estado = Array.from(document.querySelectorAll('.materia')).map(m => m.classList.contains('aprobada'));
    localStorage.setItem('estadoMaterias', JSON.stringify(estado));
}

function cargarEstado() {
    return JSON.parse(localStorage.getItem('estadoMaterias') || '[]');
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





               
