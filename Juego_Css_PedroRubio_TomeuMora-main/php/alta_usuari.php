<?php
// Comprobar si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $nomUsuari = isset($_POST['nomUsuari']) ? $_POST['nomUsuari'] : '';
    $contrasenya = isset($_POST['contrasenya']) ? $_POST['contrasenya'] : '';
    $nom = isset($_POST['nom']) ? $_POST['nom'] : '';
    $llinatges = isset($_POST['llinatges']) ? $_POST['llinatges'] : '';
    $correu = isset($_POST['correu']) ? $_POST['correu'] : '';
    $dataNaixement = isset($_POST['dataNaixement']) ? $_POST['dataNaixement'] : '';

    // Aquí podrías validar los datos, por ejemplo:
    if (empty($nomUsuari) || empty($contrasenya) || empty($nom) || empty($llinatges) || empty($correu)) {
        echo "Por favor, complete todos los campos obligatorios.";
    } else {
        // En este ejemplo solo mostramos los datos
        echo "<h1>Datos recibidos</h1>";
        echo "<p><strong>Nom d'Usuari:</strong> " . htmlspecialchars($nomUsuari) . "</p>";
        echo "<p><strong>Contrasenya:</strong> " . htmlspecialchars($contrasenya) . "</p>";
        echo "<p><strong>Nom:</strong> " . htmlspecialchars($nom) . "</p>";
        echo "<p><strong>Llinatges:</strong> " . htmlspecialchars($llinatges) . "</p>";
        echo "<p><strong>Correu Electrònic:</strong> " . htmlspecialchars($correu) . "</p>";
        echo "<p><strong>Data de Naixement:</strong> " . htmlspecialchars($dataNaixement) . "</p>";

        // Aquí podrías hacer más cosas, como guardar estos datos en una base de datos.
    }
}
?>