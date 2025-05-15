let lletraSeleccionada = null;
let sopaBloquejada = false;

document.addEventListener("DOMContentLoaded", function () {
    inicialitzarTaulaInteractiva();
    inicialitzarBotonsLletres();
    inicialitzarEmplenar();
    inicialitzarRestableix();
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form1");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita el envío normal
        insertSopa();       // Llama a tu función
    });
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

        if (btn.value === "Emplenar_amb_paraules") {
            btn.addEventListener("click", function () {
                if (!sopaBloquejada) {
                    const info = agafarInfo();
                    posicionsParaules = col·locarParaulesEnTaula(info.palabras);
                    console.log("Paraules col·locades:", posicionsParaules);
                    emplenarTaula(); // Rellena celdas vacías con letras aleatorias
                    sopaBloquejada = true;
                }
            });
        }
    });
}

function mulberry32(seed) {
    return function() {
        seed |= 0;
        seed = seed + 0x6D2B79F5 | 0;
        let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

function emplenarTaula(seed) {
    const taula = document.getElementById("taula");
    if (!taula) return;

    // Generar una seed aleatoria si no se proporciona
    if (seed === undefined) {
        seed = Math.floor(Math.random() * 1000000);
    }

    const rand = mulberry32(seed);
    const files = taula.getElementsByTagName("tr");
    const alfabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (const fila of files) {
        const tds = fila.getElementsByTagName("td");
        for (const td of tds) {
            if (td.innerText.trim() === "" || td.innerText === "") {
                const randomIndex = Math.floor(rand() * alfabet.length);
                td.innerText = alfabet[randomIndex];
            }
        }
    }

    console.log("Seed utilitzada:", seed); // Por si quieres verla en consola
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
    insertSopa();
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
function obtenirLletresDeLaTaula() {
    const taula = document.getElementById("taula");
    if (!taula) return [];

    const dades = [];
    const files = taula.getElementsByTagName("tr");

    for (let y = 0; y < files.length; y++) {
        const fila = files[y];
        const columnes = fila.getElementsByTagName("td");

        for (let x = 0; x < columnes.length; x++) {
            const td = columnes[x];
            const lletra = td.innerText.trim();

            if (lletra !== "") {
                dades.push({
                    x: x,
                    y: y,
                    lletra: lletra
                });
            }
        }
    }

    return dades;
}
// Función para insertar la sopa de letras en la base de datos
async function insertSopa() {
    const info = agafarInfo();
    const lletresTaula = obtenirLletresDeLaTaula();


    if (!posicionsParaules || posicionsParaules.length === 0) {
        alert("Primer has d'emplenar la sopa amb paraules abans de guardar.");
        return;
    }   

    if (!info.nomSopa || !info.dificultad || !info.palabras || lletresTaula.length === 0) {
        alert("Has de completar tots els camps i emplenar la taula.");
        return;
    }

    // Filtrar palabras vacías
    const palabrasNoVacias = info.palabras.filter(paraula => paraula.trim() !== "");
    if (palabrasNoVacias.length === 0) {
        alert("No hi ha paraules vàlides per inserir.");
        return;
    }

    const nomUsuari = localStorage.getItem('nomUsuari');
    
    // Crear la sopa
    const querySopa = `INSERT INTO Sopa (nom, fk_id_dificultat, fk_id_creador) 
        VALUES ('${info.nomSopa}', 
        (SELECT id FROM Dificultat WHERE id = '${info.dificultad}'),
        (SELECT id FROM Administrador WHERE nom_usuari = '${nomUsuari}'))`;
    console.log(querySopa)
    try {
        const resposta = await fetch("http://localhost:3000/daw/" + encodeURIComponent(querySopa));

        // Obtener id de la sopa creada
        const consultaIDSopa = `select id from Sopa order by id desc limit 1`;
        const respostaSopa = await fetch("http://localhost:3000/daw/" + encodeURIComponent(consultaIDSopa));
        const dataSopa = await respostaSopa.json();
        const idSopa = dataSopa.data[0].id;
        console.log(dataSopa
        )
        if (parseInt(idSopa) < 0) {
            alert("No s'ha pogut obtenir l'ID de la sopa.");
            return;
        }
            // Select per treure el Abecedario , cada lletra amb la seva id
        const queryAbecedario = `select * from Lletra`;
                const respostaABC = await fetch("http://localhost:3000/daw/" + encodeURIComponent(queryAbecedario));
                const dataABC = await respostaABC.json();
                console.log(dataABC);


        // Insertar palabras
        const respostaparaula = await fetch("http://localhost:3000/daw/" + encodeURIComponent(generarSelectParaules(info.palabras, idSopa)));

        // Obtener IDs de las palabras insertadas
        const queryParaulesIds = `SELECT id, nom FROM Paraula WHERE fk_id_sopa = ${idSopa}`;
        const respuestaParaules = await fetch("http://localhost:3000/daw/" + encodeURIComponent(queryParaulesIds));
        const dataParaules = await respuestaParaules.json();
        const paraulesConIds = dataParaules.data;

        // Insertar las posiciones de las palabras en la tabla `conte`
        await insertPosicionsParaulesEnConte(posicionsParaules, idSopa, paraulesConIds);

        await fetch("http://localhost:3000/daw/" + encodeURIComponent(generarSelectLletres(lletresTaula, idSopa, dataABC.data)));


        const queryConte = generarInsertConte(posicionsParaules, idSopa, paraulesConIds);
        await fetch("http://localhost:3000/daw/" + encodeURIComponent(queryConte));




        alert("Sopa registrada correctament!");
    } catch (error) {
        console.error("Error al insertar en la base de datos:", error);
        alert("Hi ha hagut un error al registrar la sopa.");
    }
}


function generarSelectParaules(palabras, idSopa) {
    if (!palabras || palabras.length === 0 || !idSopa) return "";

    const palabrasFiltradas = palabras
        .map(p => p.trim())         // Elimina espacios al principio y al final
        .filter(p => p.length > 0); // Excluye vacías

    if (palabrasFiltradas.length === 0) return "";

    const values = palabrasFiltradas.map(paraula => (`'${paraula}', ${idSopa}`));

    const query = 
        `INSERT INTO Paraula (nom, fk_id_sopa) VALUES ${values.map(v => `(${v})`).join(",\n")};`;
 
    console.log(query);
    return query;
}
// Generar la consulta para insertar las letras en la tabla
function generarSelectLletres(lletresTaula, idSopa, mapaLetras) {
    if (!lletresTaula || lletresTaula.length === 0 || !idSopa || !mapaLetras) return "";

    // Convertir el array en un diccionario para acceso rápido
    const mapa = {};
    for (const lletraObj of mapaLetras) {
        mapa[lletraObj.nom] = lletraObj.id;
    }

    const values = lletresTaula.map(({ x, y, lletra }) => {
        const idLletra = mapa[lletra.toUpperCase()]; // Aseguramos mayúsculas

        if (!idLletra) {
            console.warn(`Lletra "${lletra}" no trobada a la base de dades.`);
            return null;
        }

        return `(${idLletra}, ${idSopa}, ${x}, ${y})`;
    }).filter(Boolean); // Elimina los null

    const query = `
        INSERT INTO Esta (fk_id_lletra, fk_id_sopa, fila, columna)
        VALUES ${values.join(",\n")};
    `;

    console.log(query);
    return query;
}
function col·locarParaulesEnTaula(palabras) {
    const taula = document.getElementById("taula");
    if (!taula) return [];

    const files = taula.getElementsByTagName("tr");
    const filesCount = files.length;
    const columnesCount = files[0].getElementsByTagName("td").length;

    const posicionsParaules = [];

    for (const paraula of palabras) {
        let colocada = false;

        for (let intent = 0; intent < 100 && !colocada; intent++) {
            const direccions = [
                { dx: 1, dy: 0 }, // →
                { dx: 0, dy: 1 }, // ↓
                { dx: 1, dy: 1 }, // ↘
            ];
            const { dx, dy } = direccions[Math.floor(Math.random() * direccions.length)];

            const maxX = dx === 0 ? columnesCount : columnesCount - paraula.length;
            const maxY = dy === 0 ? filesCount : filesCount - paraula.length;

            const xInici = Math.floor(Math.random() * maxX);
            const yInici = Math.floor(Math.random() * maxY);

            let espacioDisponible = true;
            for (let i = 0; i < paraula.length; i++) {
                const x = xInici + dx * i;
                const y = yInici + dy * i;
                const td = files[y].getElementsByTagName("td")[x];
                if (td.innerText.trim() !== "") {
                    espacioDisponible = false;
                    break;
                }
            }

            if (!espacioDisponible) continue;

            for (let i = 0; i < paraula.length; i++) {
                const x = xInici + dx * i;
                const y = yInici + dy * i;
                const td = files[y].getElementsByTagName("td")[x];
                td.innerText = paraula[i].toUpperCase();
            }

            posicionsParaules.push({
                paraula,
                xInici: xInici + 1,
                yInici: yInici + 1,
                xFi: xInici + dx * (paraula.length - 1) + 1,
                yFi: yInici + dy * (paraula.length - 1) + 1
            });

            colocada = true;
        }

        if (!colocada) {
            console.warn(`No s'ha pogut col·locar la paraula "${paraula}"`);
        }
    }

    console.log("Posicions de les paraules:", posicionsParaules);
    return posicionsParaules;
}


async function insertPosicionsParaulesEnConte(posicionsParaules, idSopa, paraulesConIds) {
    const values = posicionsParaules.map((posicio) => {
        const palabra = paraulesConIds.find(p => p.nom === posicio.paraula);
        
        // Solo insertar palabras no vacías y con ID válido
        if (palabra && posicio.paraula.trim() !== "") {
            return `(${palabra.id}, ${idSopa}, ${posicio.xInici}, ${posicio.yInici}, ${posicio.xFi}, ${posicio.yFi})`;
        } else {
            console.warn(`Paraula "${posicio.paraula}" no trobada o vacia, no s'inserirà.`);
            return null;
        }
    }).filter(Boolean);

    if (values.length === 0) return;

    const query = `
        INSERT INTO conte (fk_id_paraula, fk_id_sopa, columna_comenca, fila_comenca, columna_acaba, fila_acaba)
        VALUES ${values.join(",\n")};
    `;

    try {
        await fetch("http://localhost:3000/daw/" + encodeURIComponent(query));
        console.log("Posicions de les paraules inserides correctament.");
    } catch (error) {
        console.error("Error al insertar les posicions de les paraules:", error);
    }
}

function generarInsertConte(posicionsParaules, idSopa, paraulesConIds) {
    if (!posicionsParaules || !idSopa || !paraulesConIds) return "";

    const values = posicionsParaules.map((posicio) => {
        const paraulaObj = paraulesConIds.find(p => p.nom === posicio.paraula);
        
        if (!paraulaObj || !posicio.paraula.trim()) {
            console.warn(`Paraula "${posicio.paraula}" no trobada o buida, no s'inclourà.`);
            return null;
        }

        return `(${paraulaObj.id}, ${idSopa}, ${posicio.xInici}, ${posicio.yInici}, ${posicio.xFi}, ${posicio.yFi})`;
    }).filter(Boolean); // Elimina los null

    if (values.length === 0) {
        console.warn("No hi ha cap valor vàlid per inserir a conte.");
        return "";
    }

    const query = `
        INSERT INTO conte (fk_id_paraula, fk_id_sopa, columna_comenca, fila_comenca, columna_acaba, fila_acaba)
        VALUES ${values.join(",\n")};
    `;

    console.log("Consulta generada per inserció a 'conte':\n", query);
    return query;
}
