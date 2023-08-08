<?php

declare(strict_types=1);

$env = parse_ini_file(__DIR__ . '/.env');
$response = file_get_contents(
    sprintf(
        "https://api.weatherapi.com/v1/history.json?key=%s&q=%s&days=3&aqi=no&alerts=no&dt=%s",
        $env['WEATHERAPI_KEY'],
        $_GET['place'],
        (new \DateTimeImmutable("-3 days"))->format('Y-m-d')
    )
);

if ($response === false) {
    header("HTTP/1.0 404 Not Found");
    die();
}

$data = json_decode($response, true);
foreach ([2, 1] as $i) {
    $data['forecast']['forecastday'][] = json_decode(
        file_get_contents(
            sprintf(
                "https://api.weatherapi.com/v1/history.json?key=%s&q=%s&days=3&aqi=no&alerts=no&dt=%s",
                $env['WEATHERAPI_KEY'],
                $_GET['place'],
                (new \DateTimeImmutable("-{$i} days"))->format('Y-m-d')
            )
        ),
        true
    )['forecast']['forecastday'][0];
}
header("HTTP/1.0 200 OK");
echo json_encode($data);

