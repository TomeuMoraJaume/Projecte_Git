<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Aquí puedes realizar validaciones y seguridad como hash de la contraseña
    // Para simplificar, solo mostramos los valores
    echo "Nom de usuari: " .$username . "<br>";
    echo "Contrasenya: " . $password . "<br>";
}
?>
