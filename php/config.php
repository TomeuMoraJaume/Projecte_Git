<?php
// Comprobar si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los valores enviados desde el formulario
    $idioma = isset($_POST['idioma']) ? $_POST['idioma'] : '';
    $colorTaula = isset($_POST['colorTaula']) ? $_POST['colorTaula'] : '';
    $colorBotons = isset($_POST['colorBotons']) ? $_POST['colorBotons'] : '';

    // Verificar que todos los valores han sido seleccionados
    if (empty($idioma) || empty($colorTaula) || empty($colorBotons)) {
        echo "Tots els camps han de ser omplerts.";
    } else {
        // Mostrar la configuración seleccionada
        echo "<h1>Configuració desada</h1>";
        echo "<p><strong>Idioma de la web:</strong> " . htmlspecialchars($idioma) . "</p>";
        echo "<p><strong>Color de les taules:</strong> " . htmlspecialchars($colorTaula) . "</p>";
        echo "<p><strong>Color dels botons:</strong> " . htmlspecialchars($colorBotons) . "</p>";
        
        // Aquí podrías guardar estos valores en una base de datos o en un archivo de configuración
    }
}
?>

