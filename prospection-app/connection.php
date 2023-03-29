 <?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

$_dataEnString = file_get_contents("php://input");
$_dataEnArray = json_decode($_dataEnString, true);

$username = $_dataEnArray["username"];
$password = $_dataEnArray["password"];

$filename = __DIR__ . "/user-data/" . $username . ".json";

if(!file_exists($filename))
{
    echo "tu n'es pas inscrit, crée un compte";
    exit();
}

$serverData = file_get_contents($filename);
$serverData = json_decode($serverData, true);
if($serverData["password"]== $password)
{
    echo("true");
}
else echo "mot de passe incorrect. Essaie encore.";