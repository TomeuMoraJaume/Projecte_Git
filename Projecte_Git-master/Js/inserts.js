const boto = document.querySelector("form input[type='submit']");
boto.addEventListener("click", (event) => {
    event.preventDefault();
    insertarInfo();
});

function agafarInfo() {
    const nom_login = document.querySelector("#nomUsuari").value;
    const contrasenya = document.querySelector("#contrasenya").value;
    const nom = document.querySelector("#nom").value
    const llin1 = document.querySelector("#llinatge1").value;
    const llin2 = document.querySelector("#llinatge2").value;
    const correu = document.querySelector("#correu").value;
    const data_naixament = document.querySelector("#dataNaixement").value;

    return {
        nom_login,
        nom,
        contrasenya,
        llin1,
        llin2,
        correu,
        data_naixament,
    };
}

async function insertarInfo() {
    const info = agafarInfo();

    // IMPORTANTE: este método es solo para pruebas, no es seguro frente a inyecciones SQL.
    const query = `insert into Usuari (nom , nom_login , llin1, llin2 , contrasenya , correu, data_naixament) values ('${info.nom}' ,'${info.nom_login}', '${info.llin1}', '${info.llin2}' , '${info.contrasenya}', '${info.correu}', '${info.data_naixament}')`;

    try {
        const api = await fetch(`http://localhost:3000/daw/${encodeURIComponent(query)}`);
        const data = await api.json();
        console.log("Respuesta del servidor:", data);
        alert("Usuario registrado correctamente");
    } catch (error) {
        console.error("Error al insertar en la base de datos:", error);
        alert("Hubo un error al registrar el usuario.");
    }
}