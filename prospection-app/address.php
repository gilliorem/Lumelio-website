<?php

$request_body = file_get_contents('php://input');
$request_data = json_decode($request_body, true);
$city_name = $request_data['city_name'];


$addresses = [
    'Lille' => [
        'Rue Faidherbe' => [1, 2, 3, 4, 5],
        'Rue Jules Guesdes' => [10, 11, 12, 13, 14],
        'Impasse du Stade' => [20, 21, 22, 23, 24]
    ],
    'Douai' => [
        'Rue de la Mairie' => [30, 31, 32, 33, 34],
        'Rue de la République' => [40, 41, 42, 43, 44],
        'Rue de la Gare' => [50, 51, 52, 53, 54]
    ],
    'Dunkerque' => [
        'Rue de la Mer' => [60, 61, 62, 63, 64],
        'Rue de la Paix' => [70, 71, 72, 73, 74],
        'Rue de la Victoire' => [80, 81, 82, 83, 84]
    ]
];


if (isset($_POST['city_name']))
{
    $city_name = $_POST['city_name'];

    if(isset($addresses[$city_name]))
    {
        $streets = $addresses[$city_name];
        $response = [];

        foreach($streets as $street =>$numbers)
    {
        $response[$street] = $numbers;
    }
    echo json_encode($response);
    }
}
else
{
    echo 'Ville non trouvée.';
}
