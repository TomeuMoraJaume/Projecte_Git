<?php
// Comprobar si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger el valor seleccionado de la sopa de letras
    $sopaSelect = isset($_POST['sopaSelect']) ? $_POST['sopaSelect'] : '';

    // Verificar si se ha seleccionado una opción
    if (empty($sopaSelect)) {
        echo "No has seleccionado ninguna sopa de lletres.";
    } else {
        // Mostrar la sopa seleccionada
        echo "<h1>Has seleccionado la següent sopa de lletres:</h1>";
        echo "<p><strong>Sopa seleccionada:</strong> " . htmlspecialchars($sopaSelect) . "</p>";
    }
}
?>
