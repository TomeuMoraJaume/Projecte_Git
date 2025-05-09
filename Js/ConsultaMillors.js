document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 1. Obtener datos de la API
        const query = "SELECT Usuari.nom AS nom_usuari, Partida.punts FROM Partida  JOIN Usuari ON Partida.fk_id_usuari = Usuari.id";
        const response = await fetch(`http://localhost:3000/daw/${encodeURIComponent(query)}`);
        const data = await response.json();
        console.log(data);

        const listaP = document.getElementById('listaP');
        data.data.forEach(({nom_usuari, punts}) => {
            const li = document.createElement('li');
            li.textContent = nom_usuari+":"+punts;
            listaP.appendChild(li);
            
        });

        
        

    } catch (error) {
        console.error('Error:', error);
    }
});






//const query = "select nom, punts from Usuari join Partida on Partida.fk_id_usuari = Usuari.id ORDER by punts desc limit 3 ";