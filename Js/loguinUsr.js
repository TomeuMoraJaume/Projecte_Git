const boto = document.querySelector("form input[type='submit']");
boto.addEventListener("click", (event) => {
    event.preventDefault();
    validarInformacio();
});

function agafarInfo() {
    const nom_login = document.querySelector("#nomUsuari").value;
    const contrasenya = document.querySelector("#contrasenya").value;

    return {
        nom_login,
        contrasenya,
    };
}

async function validarInformacio() {
    const info = agafarInfo();

    if (!info.nom_login || !info.contrasenya) {
        alert("Has de completar tots els camps.");
        return;
    }

    const query = `Select id, nom from Usuari where nom_login = '${info.nom_login}' and contrasenya = '${info.contrasenya}'`;

    try {
        console.log("try");
        const api = await fetch("http://localhost:3000/daw/" + encodeURIComponent(query));
        const data = await api.json();

        console.log(data.data);

        const array_rebuda_ids = data.data.map(r => r.id);
        const array_rebuda_nom = data.data.map(r => r.nom);

        if (array_rebuda_ids.length > 0) {
            // Aquí guardamos el ID y el nombre correctamente en localStorage
            localStorage.setItem("usuariActual", array_rebuda_ids[0]);
            localStorage.setItem("nomUsuari", array_rebuda_nom[0]);

            // Redirigir a otra página (ejemplo: juego)
            window.location.href = "joc.html";
        } else {
            alert("Usuari o contrasenya incorrectes.");
        }

    } catch (error) {
        console.error(error);
        alert("Error en la connexió amb el servidor");
        location.reload();
    }
}
