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
    //const info = agafarInfo();
    const nom_login = document.querySelector("#nomUsuari").value;
    const contrasenya = document.querySelector("#contrasenya").value;

    const query = `Select id from Usuari where nom_login = '${nom_login}' and contrasenya = '${contrasenya}'`;
    console.log(query);

    try {
        console.log("a4");
        const api = await fetch("http://localhost:3000/daw/"+ encodeURIComponent(query));
        console.log("b1")
        const data = await api.json();
        array_rebuda_id = data.data.map(r=>r.id);
        if (array_rebuda_id.length > 0) {
            console.log("a5");
            ids = array_rebuda_id[0];
            localStorage.setItem("usuariActual", ids);
            //window.location.href = "altaSopa.html";
        } else {
            console.log("a6");
            //location.reload();
        }
    } catch (error) {
        console.log("a7");
        console.error(error);
        alert("Error en la connexió amb el servidor");
        location.reload();

    }
}
const usuariActual = localStorage.getItem("usuariActual");
console.log(usuariActual);
