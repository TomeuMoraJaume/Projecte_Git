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
});
