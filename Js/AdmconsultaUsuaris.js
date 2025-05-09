window.addEventListener('DOMContentLoaded', async () => {
    try {

        const query = "SELECT nom_login, contrasenya FROM Usuari";
        
        const res = await fetch(`http://localhost:3000/daw/${encodeURIComponent(query)}`);
        const data = await res.json();

        const ol = document.getElementById('users');

        ol.innerHTML = "";

        data.data.forEach(({ nom_login, contrasenya }) => {
            const li = document.createElement('li');
            li.textContent = `${nom_login}:${contrasenya}`;
            ol.appendChild(li);
        });
    } catch (err) {
        console.error('Error al obtener los usuarios:', err);
    }
});
