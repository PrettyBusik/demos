<?php

declare(strict_types=1);

$env = parse_ini_file(__DIR__ . '/.env');
header("HTTP/1.0 200 OK");
echo json_encode(['mapsApiKey' => $env['YANDEX_MAP_API_KEY']]);
