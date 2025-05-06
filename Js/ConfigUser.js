window.addEventListener('DOMContentLoaded', () => {
    cargarIdiomas();
    cargarColores();
    

    const form = document.getElementById('formConfig');
    form.addEventListener('submit', async (e) => {
        //e.preventDefault();

        const id_user = localStorage.getItem('id_user');
        if (!id_user) {
            console.error('id_user no encontrado en localStorage');
            return;
        }

        const id_color_taula = document.getElementById('colorTaula').value;
        const id_color_boto = document.getElementById('colorBotons').value;
        const id_idioma = document.getElementById('idioma').value;

        const updateQuery = `
            UPDATE Usuari 
            SET fk_id_color_boto = ${id_color_boto}, 
                fk_id_color_taula = ${id_color_taula}, 
                fk_id_ideoma = ${id_idioma} 
            WHERE id = ${id_user}
        `;

        try {
            await fetch("http://localhost:3000/daw/" + encodeURIComponent(updateQuery));
            console.log('Preferencias del usuario actualizadas correctamente');
        } catch (error) {
            console.error('Error al actualizar preferencias:', error);
        }
    });
});

async function cargarColores() {
    try {
        const query = "SELECT * FROM Color";
        const res = await fetch("http://localhost:3000/daw/" + encodeURIComponent(query));
        const colores = await res.json();

        const selectTabla = document.getElementById('colorTaula');
        const selectBoton = document.getElementById('colorBotons');

        colores.data.forEach(({ id, nom }) => {
            const option1 = document.createElement('option');
            option1.value = id;
            option1.textContent = nom;
            selectTabla.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = id;
            option2.textContent = nom;
            selectBoton.appendChild(option2);
        });

    } catch (err) {
        console.error('Error al cargar los colores: ', err);
    }
}

async function cargarIdiomas() {
    try {
        const query = "SELECT * FROM Idioma";
        const res = await fetch("http://localhost:3000/daw/" + encodeURIComponent(query));
        const idiomas = await res.json();

        const selectIdioma = document.getElementById('idioma');
        idiomas.data.forEach(({ id, nom }) => {
            
            const option = document.createElement('option');
            option.value = id;
            option.textContent = nom;
            selectIdioma.appendChild(option);
        });

    } catch (err) {
        console.error('Error al cargar los idiomas: ', err);
    }
}
