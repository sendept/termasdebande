<?php
// Simple server-side proxy for embalses.net
// Lives at termasdebande.com/proxy.php
// Avoids dependency on unreliable third-party CORS proxies

header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html; charset=UTF-8');

$url = 'https://www.embalses.net';

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
