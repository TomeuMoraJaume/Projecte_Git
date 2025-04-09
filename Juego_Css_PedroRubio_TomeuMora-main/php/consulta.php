<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener el nombre de usuario seleccionado
    $Sopa = $_POST['BSopa'];

    // Mostrar el nombre de usuario seleccionado
    echo "La sopa selecionada es: " .$Sopa . "<br>";
}


?>
