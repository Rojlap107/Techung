<?php
session_start();
header('Content-Type: application/json');

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

$credsPath = __DIR__ . '/../data/admin.json';
if (!file_exists($credsPath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Credentials not found']);
    exit;
}

$data = json_decode(file_get_contents($credsPath), true);
$validUser = isset($data['username']) ? $data['username'] : 'admin';
$hash = isset($data['passwordHash']) ? $data['passwordHash'] : '';

if ($username === $validUser && $hash && password_verify($password, $hash)) {
    $_SESSION['admin_logged_in'] = true;
    $_SESSION['admin_name'] = isset($data['displayName']) ? $data['displayName'] : $validUser;
    echo json_encode(['success' => true, 'displayName' => $_SESSION['admin_name'], 'username' => $validUser]);
} else {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Invalid credentials']);
}
