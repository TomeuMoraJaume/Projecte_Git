<?php
// Comprobar si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos enviados desde el formulario
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $type = isset($_POST['type']) ? $_POST['type'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $birthday = isset($_POST['birthday']) ? $_POST['birthday'] : '';
    $message = isset($_POST['message']) ? $_POST['message'] : '';

    // Validar los campos obligatorios
    if (empty($name) || empty($email) || empty($type) || empty($phone) || empty($message)) {
        echo "Tots els camps obligatoris han de ser omplerts.";
    } else {
        // Mostrar los datos recibidos
        echo "<h1>Informació rebuda</h1>";
        echo "<p><strong>Nom:</strong> " . htmlspecialchars($name) . "</p>";
        echo "<p><strong>Correu Electrònic:</strong> " . htmlspecialchars($email) . "</p>";
        echo "<p><strong>Tipus:</strong> " . htmlspecialchars($type) . "</p>";
        echo "<p><strong>Telèfon:</strong> " . htmlspecialchars($phone) . "</p>";
        echo "<p><strong>Data de Naixement:</strong> " . htmlspecialchars($birthday) . "</p>";
        echo "<p><strong>Missatge:</strong> " . nl2br(htmlspecialchars($message)) . "</p>";

        // Aquí podrías almacenar estos datos en una base de datos, enviarlos por correo, etc.
    }
}
?>

