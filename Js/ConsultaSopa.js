window.addEventListener('DOMContentLoaded', () => {
    cargarSopasNombre();

    const form = document.getElementById('SelectSopaDeLetras');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        cargarLlistaParaules();
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



