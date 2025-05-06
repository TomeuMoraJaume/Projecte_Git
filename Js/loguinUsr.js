// const boto = document.querySelector("form input[type='submit']");
// boto.addEventListener("click", (event) => {
//     event.preventDefault();
//     validarInformacio();
// });
//
// function agafarInfo() {
//     const nom_login = document.querySelector("#nomUsuari").value;
//     const contrasenya = document.querySelector("#contrasenya").value;
//
//     return {
//         nom_login,
//         contrasenya,
//     };
// }
//
// async function validarInformacio() {
//     const info = agafarInfo();
//
//     const query = `Select id from Usuari where nom_login = '${info.nom_login}' and contrasenya = '${info.contrasenya}'`;
//
//
//     try {
//         const api = await fetch(`http://localhost:3000/daw/${encodeURIComponent(query)}`);
//         const data = await api.json();
//         array_rebuda_ids = data.data.map(r=>r.id);
//         if (array_rebuda_ids > 0) {
//             // Guardamos el primer usuario que devuelve la consulta
//             localStorage.setItem("usuariActual", info.nom_login);
//             window.location.href = "joc.html";
//
//         } else {
//             location.reload();
//         }
//     } catch (error) {
//         console.error(error);
//         alert("Error en la connexió amb el servidor");
//         location.reload();
//
//     }
// }
// const usuariActual = localStorage.getItem("usuariActual");
// console.log(usuariActual.nom_login); // O cualquier propiedad que tenga tu objeto usuario