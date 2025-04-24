document.addEventListener('DOMContentLoaded',()=>{
    const select = document.getElementById('nomUsuaris');
    const form = document.getElementById('eliminar');



    (async ()=>{
        const query = "select * from Usuari";
        const api = await fetch("http://localhost:3000/daw/"+encodeURIComponent(query))
        const data = await api.json();
    
        array_rebuda_noms = data.data.map(r=>r.nom);
        array_rebuda_ids = data.data.map(r=>r.id);


        array_rebuda_noms.forEach((nom, index) => {
            const option = document.createElement('option');
            option.value = array_rebuda_ids[index];
            option.textContent = nom;
            select.appendChild(option);

           });
        })();

        form.addEventListener('submit', async(e)=> {
            e.preventDefault()

            const id= select.value;

            if(!id){
                alert('Seleciona un usuario')
                return;

            }
            const query = `DELETE FROM Usuari WHERE id = ${id}`;
            console.log('Consulta DELETE:', query);
    
            try {
                const response = await fetch(`http://localhost:3000/daw/${encodeURIComponent(query)}`, {
                    method: 'GET',
                });
    
                console.log('Respuesta del servidor:', response);
                
                if (response.ok) {
                    const data = await response.json(); 
                    console.log('Datos recibidos del servidor:', data);
    
                    if (data.affectedRows = 1 ) {
                       
                        select.querySelector(`option[value="${id}"]`).remove();
                        location.reload();
                        alert('Usuario eliminado'); 
                        }}
                    }

            catch(error)  {
                alert("error: ",error)
            }          
                

        });
    });



