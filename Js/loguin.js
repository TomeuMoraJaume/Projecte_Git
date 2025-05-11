const boto = document.querySelector("form input[type='submit']");
boto.addEventListener("click", (event) => {
    console.log("a1");
    event.preventDefault();
    validarInformacio();

});

function agafarInfo() {
    console.log("a2");
    const nom_login = document.querySelector("#nomUsuari").value;
    const contrasenya = document.querySelector("#contrasenya").value;



    return {
        nom_login,
        contrasenya,
    };

}

async function validarInformacio() {
    console.log("a3");
    //const info = agafarI
        nom_login,
        contrasenya
    };



async function validarInformacio() {
    console.log("a3");nfo();
    const nom_login = document.querySelector("#nomUsuari").value;
    const contrasenya = document.querySelector("#contrasenya").value;

    const query = `Select nom_usuari from Usuari where nom_login = '${nom_login}' and contrasenya = '${contrasenya}'`;
    console.log(query);

    try {
        console.log("a4");
        const api = await fetch("http://localhost:3000/daw/"+ encodeURIComponent(query));
        console.log("b1")
        const data = await api.json();
        array_rebuda_nom = data.data.map(r=>r.id);
        if (array_rebuda_nom.length > 0) {
            console.log("a5");
            localStorage.setItem("usuariActual", nom_login);
            //window.location.href = "altaSopa.html";
        } else {
            console.log("a6");
            //location.reload();
        }3
    } catch (error) {
        console.log("a7");
        console.error(error);
        alert("Error en la connexió amb el servidor");
        location.reload();

    }
}
const usuariActual = localStorage.getItem("usuariActual");
console.log(usuariActual);
