<?php
/**
 * Database Connection File - Hostinger Configuration
 */

error_reporting(E_ALL);
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');

// Database configuration based on Hostinger hPanel
define('DB_HOST', '127.0.0.1');
define('DB_NAME', 'cenro_nasipit');
define('DB_USER', '');

/**
 * IMPORTANT: Ang password na ito ay DAPAT tumugma sa password
 * sa Hostinger hPanel > Databases > MySQL Databases.
 * Palitan ang 'BAGONG_PASSWORD_MO_DITO' ng tamang password.
 */
define('DB_PASS', 'BAGONG_PASSWORD_MO_DITO');

// BASE_URL adjustment para sa routing
if (!defined('BASE_URL')) {
    define('BASE_URL', '/');
}

try {
    // Establishing PDO connection
    $pdo = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4', DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    // Kapag connected na, wala itong ilalabas na error.
    // Kung gusto mong i-test kung gumagana, i-uncomment ang line sa ibaba:
    // echo "Database connection successful!";
} catch (PDOException $e) {
    // Log the error internally sa server
    error_log('Database connection error: ' . $e->getMessage());

    // Set response code to 500 (Internal Server Error)
    http_response_code(500);

    // Output JSON error for debugging
    header('Content-Type: application/json');
    die(json_encode([
        'error' => 'Database connection failed.',
        'message' => $e->getMessage(),
    ]));
}

?>
