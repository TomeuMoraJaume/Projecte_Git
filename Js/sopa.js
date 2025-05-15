let tempsRestant = 0;
let punts = 0;
let interval;
let idSopaActual = null;
let usuariActual = null;
let dificultat = 1;
let puntsPerLletra = 0;
let puntsPerParaula = 0;

let casillasPalabra = new Set();
let casillasMarcades = new Set();
let paraulesPosicions = [];

window.addEventListener('DOMContentLoaded', () => {
    cargarSopasNombre();

    const form = document.getElementById('SelectSopaDeLetras');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        cargarLlistaParaules();
        cargarSopaLletres();
    });

    const formJoc = document.getElementById("formJoc");
    formJoc.addEventListener("submit", (event) => {
        event.preventDefault();
        iniciarJoc();
    });
});

async function cargarSopasNombre() {
    try {
        const query = "SELECT * FROM Sopa";
        const res = await fetch("http://localhost:3000/daw/" + encodeURIComponent(query));
        const sopas = await res.json();

        const sopaSelect = document.getElementById('sopaSelect');
        sopaSelect.innerHTML = '';
        sopas.data.forEach(({ id, nom }) => {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = nom;
            sopaSelect.appendChild(option);
        });
    } catch (err) {
        console.error('Error al cargar sopas:', err);
    }
}

async function cargarLlistaParaules() {
    let id_sopa = document.getElementById('sopaSelect').value;
    const query = `SELECT nom FROM Paraula, Conte WHERE Conte.fk_id_paraula = Paraula.id AND Conte.fk_id_sopa = '${id_sopa}'`;

    try {
        const res = await fetch("http://localhost:3000/daw/" + encodeURIComponent(query));
        const paraules = await res.json();

        const llistaP = document.getElementById('listP');
        llistaP.innerHTML = "";

        paraules.data.forEach(({ nom }) => {
            const li = document.createElement('li');
            li.textContent = nom;
            llistaP.appendChild(li);
        });

    } catch (err) {
        console.error('Error al cargar las palabras:', err);
    }
}

async function cargarSopaLletres() {
    let id_sopa1 = document.getElementById('sopaSelect').value;
    const querySopa = `
        SELECT Lletra.nom AS lletra, Esta.fila, Esta.columna
        FROM Esta
        JOIN Lletra ON Esta.fk_id_lletra = Lletra.id
        WHERE Esta.fk_id_sopa = '${id_sopa1}'
    `;

    try {
        const res = await fetch("http://localhost:3000/daw/" + encodeURIComponent(querySopa));
        const data = await res.json();

        // Matriz 10x10 vacía
        const taula = Array.from({ length: 10 }, () => Array(10).fill(""));

        data.data.forEach(({ lletra, fila, columna }) => {
            // CAMBIO: intercambiar fila y columna aquí si están invertidos en la BD
            if (columna < 10 && fila < 10) {
                taula[columna][fila] = lletra;  // Aquí cambio fila<->columna
            }
        });

        pintarTaula(taula);

        paraulesPosicions = await carregarPosicionsParaules(id_sopa1);

        casillasPalabra.clear();
        paraulesPosicions.forEach(pos => {
            // CAMBIO: intercambiar fila y columna al crear las casillas
            let fila = pos.columna_comenca - 1;   // antes pos.fila_comenca - 1
            let col = pos.fila_comenca - 1;       // antes pos.columna_comenca - 1
            const filaFinal = pos.columna_acaba - 1;  // antes pos.fila_acaba - 1
            const colFinal = pos.fila_acaba - 1;      // antes pos.columna_acaba - 1

            const deltaFila = Math.sign(filaFinal - fila);
            const deltaCol = Math.sign(colFinal - col);

            while (true) {
                casillasPalabra.add(`${fila}-${col}`);

                if (fila === filaFinal && col === colFinal) break;

                fila += deltaFila;
                col += deltaCol;
            }
        });

        activarClickCasillas();

    } catch (err) {
        console.error('Error al cargar sopa de letras:', err);
    }
}
function pintarTaula(matriz) {
    const tabla = document.querySelector('.TaulaJoc tbody');
    tabla.innerHTML = '';

    for (let fila of matriz) {
        const tr = document.createElement('tr');
        for (let lletra of fila) {
            const td = document.createElement('td');
            td.textContent = lletra || 'X';
            td.style.backgroundColor = '';
            td.style.color = 'black';
            tr.appendChild(td);
        }
        tabla.appendChild(tr);
    }
}

async function carregarPosicionsParaules(id_sopa) {
    const query = `
        SELECT columna_comenca, fila_comenca, columna_acaba, fila_acaba 
        FROM conte 
        WHERE fk_id_sopa = '${id_sopa}'
    `;

    try {
        const res = await fetch("http://localhost:3000/daw/" + encodeURIComponent(query));
        const data = await res.json();
        return data.data;
    } catch (err) {
        console.error("Error al obtener posiciones:", err);
        return [];
    }
}

function activarClickCasillas() {
    const tabla = document.querySelector('.TaulaJoc tbody');
    for (let fila = 0; fila < tabla.rows.length; fila++) {
        const tr = tabla.rows[fila];
        for (let col = 0; col < tr.cells.length; col++) {
            const celda = tr.cells[col];
            celda.style.cursor = "pointer";
            celda.addEventListener('click', () => {
                marcarCasilla(fila, col, celda);
            });
        }
    }
}

function marcarCasilla(fila, col, celda) {
    // Aquí invertimos fila y columna para que coincida con casillasPalabra
    const key = `${col}-${fila}`;  // <-- invertido

    if (casillasMarcades.has(key)) return;

    if (casillasPalabra.has(key)) {
        casillasMarcades.add(key);
        punts += puntsPerLletra;
        celda.style.backgroundColor = 'darkgreen';
        celda.style.color = 'white';
        document.getElementById("resultat").textContent = punts;

        comprovarParaulesCompletades();
        comprovarFinalJoc();
    } else {
        celda.style.backgroundColor = 'lightcoral';
        setTimeout(() => {
            celda.style.backgroundColor = '';
        }, 300);
    }
}

function comprovarParaulesCompletades() {
    paraulesPosicions.forEach(pos => {
        if (pos.completada) return;

        // CAMBIO: intercambiar fila y columna para comprobar completado
        let filaIni = pos.columna_comenca - 1;   // antes pos.fila_comenca - 1
        let colIni = pos.fila_comenca - 1;       // antes pos.columna_comenca - 1
        let filaFin = pos.columna_acaba - 1;     // antes pos.fila_acaba - 1
        let colFin = pos.fila_acaba - 1;         // antes pos.columna_acaba - 1

        const deltaFila = Math.sign(filaFin - filaIni);
        const deltaCol = Math.sign(colFin - colIni);

        let completada = true;
        let fila = filaIni;
        let col = colIni;

        while (true) {
            if (!casillasMarcades.has(`${fila}-${col}`)) {
                completada = false;
                break;
            }
            if (fila === filaFin && col === colFin) break;
            fila += deltaFila;
            col += deltaCol;
        }

        if (completada) {
            pos.completada = true;
            punts += puntsPerParaula;
            document.getElementById("resultat").textContent = punts;
            alert("¡Has completado una palabra y ganado puntos extra!");
        }
    });
}

function comprovarFinalJoc() {
    if (casillasMarcades.size === casillasPalabra.size) {
        clearInterval(interval);
        finalitzarPartida();
    }
}

async function iniciarJoc() {
    const btnComencar = document.getElementById("comencar");
    btnComencar.disabled = true;

    idSopaActual = document.getElementById('sopaSelect').value;
    usuariActual = localStorage.getItem("usuariActual");
    if (!usuariActual || !idSopaActual) return alert("Usuari o sopa no seleccionats");

    const query = `
        SELECT Dificultat.id, Dificultat.pes 
        FROM Dificultat 
        JOIN Sopa ON Sopa.fk_id_dificultat = Dificultat.id 
        WHERE Sopa.id = '${idSopaActual}'
    `;

    try {
        const res = await fetch("http://localhost:3000/daw/" + encodeURIComponent(query));
        const data = await res.json();
        dificultat = data.data[0]?.id || 1;
        let pes = data.data[0]?.pes || 1;

        switch (dificultat) {
            case 1:
                puntsPerLletra = 100;
                puntsPerParaula = 1000;
                break;
            case 2:
                puntsPerLletra = 25;
                puntsPerParaula = 250;
                break;
            case 3:
                puntsPerLletra = 5;
                puntsPerParaula = 50;
                break;
            default:
                puntsPerLletra = 10;
                puntsPerParaula = 100;
        }

        tempsRestant = pes * 120;
        punts = 0;
        casillasMarcades.clear();

        document.getElementById("temps").textContent = tempsRestant;
        document.getElementById("resultat").textContent = punts;

        clearInterval(interval);
        interval = setInterval(() => {
            tempsRestant--;
            document.getElementById("temps").textContent = tempsRestant;

            if (tempsRestant <= 0) {
                clearInterval(interval);
                finalitzarPartida();
            }
        }, 1000);
    } catch (err) {
        console.error('Error iniciando juego:', err);
    }
}

async function finalitzarPartida() {
    if (!usuariActual || !idSopaActual) return;

    // Construimos el INSERT como una cadena de texto
    const query = `
        INSERT INTO Partida (fk_id_sopa, fk_id_usuari, punts)
        VALUES ('${idSopaActual}', '${usuariActual}', ${punts})
    `;

    try {
        await fetch("http://localhost:3000/daw/" + encodeURIComponent(query));

        alert("¡Juego finalizado! Tu puntuación: " + punts);

        const btnComencar = document.getElementById("comencar");
        btnComencar.disabled = false;

        document.querySelector('.TaulaJoc tbody').innerHTML = "";
        document.getElementById('listP').innerHTML = "";

    } catch (err) {
        console.error('Error finalizando partida:', err);
    }
}

