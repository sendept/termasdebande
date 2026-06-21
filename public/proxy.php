<?php
// Simple server-side proxy for embalses.net
// Lives at termasdebande.com/proxy.php
// Avoids dependency on unreliable third-party CORS proxies
// Usage: /proxy.php?url=https://www.embalses.net/pantano-706-las-conchas.html

header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html; charset=UTF-8');

$url = isset($_GET['url']) ? $_GET['url'] : 'https://www.embalses.net';

// Security: only allow fetching from embalses.net
$host = parse_url($url, PHP_URL_HOST);
if (!$host || strpos($host, 'embalses.net') === false) {
          http_response_code(403);
          echo json_encode(['error' => 'Only embalses.net URLs are allowed']);
          exit;
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36');
curl_setopt($ch, CURLOPT_TIMEOUT, 15);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($response === false || $httpCode >= 400) {
          http_response_code(502);
          echo json_encode([
                                   'error' => 'Failed to fetch source site',
                                   'details' => $error,
                                   'http_code' => $httpCode
                               ]);
          exit;
}

echo $response;
