window.addEventListener('DOMContentLoaded', () => {
    cargarSopasParaEliminar();

    const form = document.getElementById('formSopes');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        await eliminarSopasSeleccionadas();
    });
});

async function cargarSopasParaEliminar() {
    const query = `SELECT id, nom FROM Sopa`;

    try {
        const res = await fetch(`http://localhost:3000/daw/${encodeURIComponent(query)}`);
        const data = await res.json();


        const form = document.getElementById('formSopes');

        data.data.forEach(({ id, nom }) => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = `sopa_${id}`;
            checkbox.value = id;

            const label = document.createElement('label');
            label.htmlFor = `sopa_${id}`;
            label.textContent = nom;


            form.insertBefore(label, form.lastElementChild);
            form.insertBefore(checkbox, form.lastElementChild);
            form.insertBefore(document.createElement('br'), form.lastElementChild);
        });

    } catch (err) {
        console.error("Error al cargar sopas:", err);
        alert("No se pudieron cargar las sopas.");
    }
}

async function eliminarSopasSeleccionadas() {
    const checkboxes = document.querySelectorAll('#formSopes input[type="checkbox"]:checked');
    const ids = Array.from(checkboxes).map(cb => cb.value);

    if (ids.length === 0) {
        alert("Selecciona al menos una sopa para eliminar.");
        return;
    }

    try {
        for (const id of ids) {


            const queryPartida = `DELETE FROM Partida WHERE fk_id_sopa = ${id}`;
            const encodedQueryPartida = encodeURIComponent(queryPartida);
            await fetch(`http://localhost:3000/daw/${encodedQueryPartida}`);


            const queryEstar = `DELETE FROM Estar WHERE fk_id_sopa = ${id}`;
            const encodedQueryEstar = encodeURIComponent(queryEstar);
            await fetch(`http://localhost:3000/daw/${encodedQueryEstar}`);


            const queryConte = `DELETE FROM Conte WHERE fk_id_sopa = ${id}`;
            const encodedQueryConte = encodeURIComponent(queryConte);
            const resConte = await fetch(`http://localhost:3000/daw/${encodedQueryConte}`);


            const query = `DELETE FROM Sopa WHERE id = ${id}`;
            const encodedQuery = encodeURIComponent(query);
            const res = await fetch(`http://localhost:3000/daw/${encodedQuery}`);
            if (!res.ok) {
                throw new Error(`Error al eliminar la sopa con id ${id}`);
            }
        }

        alert("Sopas eliminadas correctamente.");
        location.reload(); 
    } catch (err) {
        console.error("Error al eliminar sopas:", err);
        alert("No se pudieron eliminar.");
    }
}
