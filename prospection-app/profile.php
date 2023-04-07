<?php

error_reporting(E_ALL);
ini_set("display_errors",1);

$_profileEnString = file_get_contents("php://input");
$_profileIdEnArray = json_decode($_profileEnString, true);

$username = $_profileIdEnArray["username"];

$currentProfile = file_get_contents("./user-data/" . $username . ".json");
$currentProfileEnArray = json_decode($currentProfile, true);

$name = $_profileIdEnArray["nom"];
$tel = $_profileIdEnArray["tel"];
$role = $_profileIdEnArray["role"];

$currentProfileEnArray["name"] = $name;
$currentProfileEnArray["tel"] = $tel;
$currentProfileEnArray["role"] = $role;
$currentProfileEnString = json_encode($currentProfileEnArray);

file_put_contents("./user-data/" . $username . ".json", $currentProfileEnString);








echo ("profile is updated.");

