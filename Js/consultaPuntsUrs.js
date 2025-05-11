window.addEventListener('DOMContentLoaded', async () => {
    const lista = document.getElementById('lista');
    const user = localStorage.getItem("usuariActual");

    if (!user) {
        lista.innerHTML = "<li>No s'ha trobat l'usuari actual.</li>";
        return;
    }

    const query = `SELECT Sopa.nom, Partida.punts FROM Sopa, Partida WHERE Partida.fk_id_usuari = '${user}' AND Partida.fk_id_sopa = Sopa.id`;

    try {
        const res = await fetch("http://localhost:3000/daw/" + encodeURIComponent(query));
        const data = await res.json();
        lista.innerHTML = "";

        if (data.data.length > 0) {
            data.data.forEach(({ nom, punts }) => {
                const li = document.createElement('li');
                li.textContent = `En la sopa "${nom}" tens ${punts} punts.`;
                lista.appendChild(li);
            });
        } else {
            lista.innerHTML = "<li>No tens cap partida jugada.</li>";
        }

    } catch (error) {
        console.error("Error carregant puntuacions:", error);
        lista.innerHTML = "<li>Error carregant dades.</li>";
    }
});
