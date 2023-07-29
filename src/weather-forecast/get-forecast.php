<?php

declare(strict_types=1);

$env = parse_ini_file(__DIR__ . '/.env');
$url = sprintf(
    "https://api.weatherapi.com/v1/forecast.json?key=%s&q=%s&days=3&aqi=no&alerts=no",
    $env['WEATHERAPI_KEY'],
    $_GET['city']
);

$response = file_get_contents($url);
if ($response === false) {
    header("HTTP/1.0 404 Not Found");
} else {
    header("HTTP/1.0 200 OK");
    echo $response;
}
