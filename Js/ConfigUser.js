window.addEventListener('DOMContentLoaded', cargarColores);



async function cargarColores() {
    try {
        const query = "SELECT * FROM Color";
        const res = await fetch("http://localhost:3000/daw/" + encodeURIComponent(query));
        const colores = await res.json(); // res, no api

        const array_rebuda_colors = colores.data.map(r => r.nom);
        const array_rebuda_id = colores.data.map(r => r.id);

        const selectTabla = document.getElementById('colorTaula');
        const selectBoton = document.getElementById('colorBotons');

        array_rebuda_colors.forEach((nom, index) => {
            const option1 = document.createElement('option');
            option1.value = array_rebuda_id[index];
            option1.textContent = nom;
            selectTabla.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = array_rebuda_id[index];
            option2.textContent = nom;
            selectBoton.appendChild(option2);
        });
    } catch (err) {
        console.error('Error al cargar los colores: ', err);
    }
}
