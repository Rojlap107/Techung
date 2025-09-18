<?php
session_start();
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['type']) || !isset($input['content'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid payload']);
    exit;
}

$map = [
    'tours' => __DIR__ . '/../data/tours.json',
    'albums' => __DIR__ . '/../data/albums.json',
    'merchandise' => __DIR__ . '/../data/merchandise.json',
];

if (!isset($map[$input['type']])) {
    http_response_code(400);
    echo json_encode(['error' => 'Unknown type']);
    exit;
}

// Ensure directory exists
$dir = dirname($map[$input['type']]);
if (!is_dir($dir)) {
    mkdir($dir, 0775, true);
}

$ok = file_put_contents($map[$input['type']], json_encode($input['content'], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
if ($ok === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to write file']);
    exit;
}

echo json_encode(['success' => true]);
