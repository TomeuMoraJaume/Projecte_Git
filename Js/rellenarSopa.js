let lletraSeleccionada = null;
let sopaBloquejada = false;

document.addEventListener("DOMContentLoaded", function () {
    inicialitzarTaulaInteractiva();
    inicialitzarBotonsLletres();
    inicialitzarEmplenar();
    inicialitzarRestableix();
});

function inicialitzarBotonsLletres() {
    const container = document.querySelector(".letras-container");
    if (!container) return;

    container.addEventListener("click", function (e) {
        if (e.target.tagName === "INPUT" && e.target.type === "button") {
            if (!sopaBloquejada) {
                lletraSeleccionada = e.target.value;
            }
        }
    });
}

function inicialitzarTaulaInteractiva() {
    const taula = document.getElementById("taula");
    if (!taula) return;

    const files = taula.getElementsByTagName("tr");

    for (const fila of files) {
        const tds = fila.getElementsByTagName("td");
        for (const td of tds) {
            td.addEventListener("click", function () {
                if (!sopaBloquejada && lletraSeleccionada) {
                    td.innerText = lletraSeleccionada;
                }
            });
        }
    }
}

function inicialitzarEmplenar() {
    const btns = document.querySelectorAll('input[type="button"]');
    btns.forEach(btn => {
        if (btn.value === "Emplenar") {
            btn.addEventListener("click", function () {
                if (!sopaBloquejada) {
                    emplenarTaula();
                    sopaBloquejada = true;
                }
            });
        }
    });
}

function emplenarTaula() {
    const taula = document.getElementById("taula");
    if (!taula) return;

    const files = taula.getElementsByTagName("tr");
    const alfabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (const fila of files) {
        const tds = fila.getElementsByTagName("td");
        for (const td of tds) {
            // Solo se rellenan las celdas vacías o con "X"
            if (td.innerText === "" || td.innerText.trim() === "") {
                const randomLetter = alfabet[Math.floor(Math.random() * alfabet.length)];
                td.innerText = randomLetter;
            }
        }
    }
}

function inicialitzarRestableix() {
    const btns = document.querySelectorAll('input[type="reset"]');
    btns.forEach(btn => {
        if (btn.value === "Restableix") {
            btn.addEventListener("click", function () {
                restablecerTaula();
            });
        }
    });
}

function restablecerTaula() {
    const taula = document.getElementById("taula");
    if (!taula) return;

    const files = taula.getElementsByTagName("tr");
    for (const fila of files) {
        const tds = fila.getElementsByTagName("td");
        for (const td of tds) {
            td.innerText = ""; // Restablece a "X" o puedes dejarlo vacío según prefieras
        }
    }

    // Resetear la letra seleccionada
    lletraSeleccionada = null;
    sopaBloquejada = false;
}


const boto = document.querySelector("form input[type='submit']");
boto.addEventListener("click", (event) => {
    event.preventDefault();
    validarInformacio();
});

function agafarInfo() {
     const nomSopa = document.querySelector("#nomSopa").value;
    const dificultad = document.querySelector('input[name="dificultatSopa"]:checked')?.value;
    const palabras = Array.from(document.querySelectorAll("input[name='paraula[]']")).map(input => input.value);


    return {
        nomSopa,
        dificultad,
        palabras
    };

}
async function insertSopa() {
    const info = agafarInfo();

    if (!info.nomSopa || !info.dificultad || !info.palabras) {
        alert("Has de completar tots els camps.");
        return;
    }
const nomUsuari = localStorage.getItem('nomUsuari');
    const query = `insert into Sopa (nom , fk_id_dificultat , fk_id_creador) values ('${info.nom}', (select id from Dificultat where id = '${info.dificultad}') , (select id from Administrador where nom_usuari = '${nomUsuari}' )`;

    try {
        const api = await fetch("http://localhost:3000/daw/" + encodeURIComponent(query));
        const data = await api.json();
        console.log("Respuesta del servidor:", data);
        alert("Sopa rejistrada corectament");
         } catch (error) {
        console.error("Error al insertar en la base de datos:", error);
        alert("Hubo un error al registrar la sopa.");
    }
}
