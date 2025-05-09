window.addEventListener('DOMContentLoaded', () => {
    cargarSopasNombre();

    const form = document.getElementById('SelectSopaDeLetras');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        cargarLlistaParaules();
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
        sopaSelect.innerHTML = ''; // limpiar opciones previas
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

let tempsRestant = 0;
let punts = 0;
let interval;

async function iniciarJoc() {


    const btnComencar = document.getElementById("comencar");
    btnComencar.disabled = true;


    const id_sopa = document.getElementById('sopaSelect').value;
    const usuari = localStorage.getItem("usuariActual");
    if (!usuari || !id_sopa) return alert("Usuari o sopa no seleccionats");

    const query = `SELECT Dificultat.pes FROM Dificultat JOIN Sopa ON Sopa.fk_id_dificultat = Dificultat.id WHERE Sopa.id = '${id_sopa}'
    `;

    try {
        const res = await fetch("http://localhost:3000/daw/" + encodeURIComponent(query));
        const data = await res.json();
        const pes = data.data[0]?.pes || 1;

        tempsRestant = pes * 120; // segundos según dificultad
        punts = 0;

        document.getElementById("temps").textContent = tempsRestant;
        document.getElementById("resultat").textContent = punts;

        clearInterval(interval);
        interval = setInterval(() => {
            tempsRestant--;
            document.getElementById("temps").textContent = tempsRestant;

            if (tempsRestant <= 0) {
                clearInterval(interval);
                finalitzarPartida(id_sopa, usuari, punts);
            }
        }, 1000);

      

        // edita aixo per sumar punts amb ses paraules trobades
        const sumarPuntsInterval = setInterval(() => {
            punts += 10;
            document.getElementById("resultat").textContent = punts;
        }, 5000); // 5000 son milisegons, perque are es sumen 10 punts cada 5 segons, aixo s'ha de camviar 

        setTimeout(() => clearInterval(sumarPuntsInterval), tempsRestant * 1000);

    } catch (err) {
        console.error("Error al obtener la dificultad:", err);
    }
}

async function finalitzarPartida(id_sopa, usuari, punts) {
    const query = `INSERT INTO Partida (fk_id_sopa, fk_id_usuari, punts) VALUES ('${id_sopa}', '${usuari}', ${punts})`;
    try {
        await fetch("http://localhost:3000/daw/" + encodeURIComponent(query));
        alert("Partida finalitzada! Has obtingut " + punts + " punts.");
    } catch (err) {
        console.error("Error al inserir la partida:", err);
    }
}

