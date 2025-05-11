window.addEventListener('DOMContentLoaded', () => {
    cargarUsuarios();

    const form = document.getElementById('Borrar');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const usuarioSeleccionado = document.getElementById('nomUsuaris').value;
        const confirmacion = confirm(`¿Estás seguro de que quieres borrar al usuario '${usuarioSeleccionado}'?`);

        if (!confirmacion) return;

        const query = `DELETE FROM Usuari WHERE id = '${usuarioSeleccionado}'`;

        try {
            const res = await fetch(`http://localhost:3000/daw/${encodeURIComponent(query)}`);
            if (res.ok) {
                alert(`Usuario '${usuarioSeleccionado}' eliminado con éxito.`);
                // Recargar la lista
                document.getElementById('nomUsuaris').innerHTML = '';
                cargarUsuarios();
            } else {
                alert("No se pudo eliminar el usuario.");
            }
        } catch (err) {
            console.error("Error al eliminar usuario:", err);
            alert("Error en la conexión con el servidor.");
        }
    });
});

async function cargarUsuarios() {
    const query = `SELECT id, nom_login FROM Usuari`;

    try {
        const res = await fetch("http://localhost:3000/daw/" + encodeURIComponent(query));
        const data = await res.json();
        console.log(data);

        const select = document.getElementById('nomUsuaris');
        data.data.forEach(({ id, nom_login }) => {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = nom_login;
            select.appendChild(option);
        });
    } catch (err) {
        console.error("Error al cargar usuarios:", err);
        alert("Error cargando la lista de usuarios.");
    }
}
