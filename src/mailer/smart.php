<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Создаем debug.log
$logFile = __DIR__ . '/debug.log';
file_put_contents($logFile, date('Y-m-d H:i:s') . " - Request received\n", FILE_APPEND);
file_put_contents($logFile, "POST data: " . print_r($_POST, true) . "\n", FILE_APPEND);

header('Content-Type: application/json; charset=utf-8');

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Проверка данных
if (empty($name) || empty($email) || empty($message)) {
    file_put_contents($logFile, "Error: Empty fields\n", FILE_APPEND);
    echo json_encode(['success' => false, 'error' => 'Заполните все поля']);
    exit;
}

// ВРЕМЕННО: просто возвращаем успех (без отправки почты)
file_put_contents($logFile, "Success response sent\n", FILE_APPEND);
echo json_encode(['success' => true]);
exit;
?>