<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

$_dataEnString = file_get_contents("php://input");
$_dataEnArray = json_decode($_dataEnString, true);

$username = $_dataEnArray["mail"];
$password = $_dataEnArray["password"];

$filename = __DIR__ . "/user-data/" . $username . ".json";

if(file_exists($filename))
{
    echo "false";
    exit();
}


file_put_contents($filename, $_dataEnString);

echo("Compte créé pour l'utilisateur : " .$username);