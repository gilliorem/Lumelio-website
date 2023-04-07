<?php

$_dataClientEnString = file_get_contents("php://input");
$_dataClientEnArray = json_decode($_dataClientEnString, true);



$nom = $_dataClientEnArray["nom"];

if(!is_dir(__DIR__ . "/client-data/"))
mkdir(__DIR__ . "/client-data/");
$filename = __DIR__ . "/client-data/" . $nom . ".json";

file_put_contents($filename, $_dataClientEnString);

echo("Prise de contact validé pour : " .$nom);