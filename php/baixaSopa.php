<?php
// Verificar si el formulario ha sido enviado mediante POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Array de las sopas que pueden ser seleccionadas
    $sopas = ["s1", "s2", "s3", "s4", "s5"];
    
    // Lista para almacenar las sopas seleccionadas
    $sopasSeleccionadas = [];

    // Recorrer las sopas y verificar si están seleccionadas
    foreach ($sopas as $sopa) {
        if (isset($_POST[$sopa])) {
            // Si el checkbox está marcado, se agrega la sopa a la lista
            $sopasSeleccionadas[] = $sopa;
        }
    }
    
    // Mostrar las sopas seleccionadas
    if (!empty($sopasSeleccionadas)) {
        echo "Las sopas seleccionadas son:<br>";
        foreach ($sopasSeleccionadas as $sopa) {
            // Convertir el nombre del checkbox (s1, s2, etc.) en un nombre legible
            echo "Sopa " . substr($sopa, -1) . "<br>";
        }
    } else {
        echo "No se ha seleccionado ninguna sopa.";
    }

} else {
    echo "El formulario no se ha enviado.";
}
?>