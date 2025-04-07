<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener el nombre de usuario seleccionado
    $nomUsuaris = $_POST['nomUsuaris'];

    // Mostrar el nombre de usuario seleccionado
    echo "El nombre de usuario seleccionado es: " .$nomUsuaris . "<br>";
}


?>