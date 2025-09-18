<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit;
}

$username = $_POST['username'] ?? '';
$current = $_POST['current'] ?? '';
$next = $_POST['next'] ?? '';

$credsPath = __DIR__ . '/../data/admin.json';
if (!file_exists($credsPath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Credentials not found']);
    exit;
}

$data = json_decode(file_get_contents($credsPath), true);
$validUser = isset($data['username']) ? $data['username'] : 'admin';
$hash = isset($data['passwordHash']) ? $data['passwordHash'] : '';

if ($username !== $validUser || !$hash || !password_verify($current, $hash)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Current password is incorrect']);
    exit;
}

$data['passwordHash'] = password_hash($next, PASSWORD_DEFAULT);
$ok = file_put_contents($credsPath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
if ($ok === false) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to update password']);
    exit;
}

echo json_encode(['success' => true]);
