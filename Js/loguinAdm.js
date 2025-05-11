window.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault(); 
        validarInformacio();
    });
});

function agafarInfo() {
    const nom_login = document.querySelector("#nomUsuari").value;
    const contrasenya = document.querySelector("#contrasenya").value;
    return { nom_login, contrasenya };
}


async function validarInformacio() {
    const info = agafarInfo();

   
    const query = `SELECT nom_usuari FROM Administrador WHERE nom_usuari = '${info.nom_login}' AND contrasenya = '${info.contrasenya}'`;

    try {
       
        const api = await fetch(`http://localhost:3000/daw/${encodeURIComponent(query)}`);
        const data = await api.json();

       
        const array_rebuda_noms = data.data.map(r => r.nom_usuari);

        if (array_rebuda_noms.length > 0) {
          
            localStorage.setItem("nomUsuari", info.nom_login);
            window.location.href = "altaSopa.html";
        } else {
            alert("Usuari o contrasenya incorrectes");
            location.reload();
        }
    } catch (error) {
        console.error(error);
        alert("Error en la connexió amb el servidor");
        location.reload();
    }
}