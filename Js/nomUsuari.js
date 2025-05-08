window.addEventListener('DOMContentLoaded', () => {
    const nomUsuari = localStorage.getItem('nomUsuari');

    console.log(nomUsuari);
    
    if (nomUsuari) {
        const header = document.querySelector('header');

        const span = document.createElement('span');
        span.id = 'nomUsuariLog';
        span.textContent = `Usuari: ${nomUsuari}`;

        header.appendChild(span);
    }


    const logout = document.getElementById('logout');

    logout.addEventListener("click", () => {
        console.log("logout");
        localStorage.clear();
        window.location.href = "wordSearch.html";
});

});
