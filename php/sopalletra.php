<?php
// Verificar si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $nomSopa = $_POST['nomSopa']; // Nombre de la sopa de letras
    $dificultatSopa = $_POST['dificultatSopa']; // Nivel de dificultad
    $paraules = $_POST['paraula']; // Array de palabras

    // Validar los campos
    if (empty($nomSopa) || empty($dificultatSopa)) {
        echo "El nombre de la sopa de letras y la dificultad son obligatorios.";
    } else {
        // Mostrar los datos recogidos
        echo "<h1>Sopa de Lletres: $nomSopa</h1>";
        echo "<p>Nivell de Dificultat: $dificultatSopa</p>";
        echo "<h2>Paraules a incloure:</h2>";
        echo "<ol>";
        
        // Mostrar las palabras
        foreach ($paraules as $paraula) {
            if (!empty($paraula)) {
                echo "<li>" . htmlspecialchars($paraula) . "</li>";
            }
        }
        echo "</ol>";
    }
} else {
    echo "No se ha enviado el formulario.";
}
?>
