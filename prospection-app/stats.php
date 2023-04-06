<?php

$_dataRequestEnString = file_get_contents("php://input");
$_dataRequestEnArray = json_decode($_dataClientEnString, true);

function getRdvs()
{
    $rdvs =[];
    foreach (scandir(__DIR__ . "/client-data/") as $rdv) {
        # code...
    }
}

// stat :) (JS)
