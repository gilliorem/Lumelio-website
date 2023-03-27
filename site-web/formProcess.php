<?php
echo ("form envoyé.\n");
$_dataEnString = file_get_contents('php://input');
echo($_dataEnString);
$mailPerso = "r.gilliot@lumelio.fr" ;
$mailPro = "lumelio.pv@gmail.com";
$objetMail = "Nouvelle Demande Photovoltaïque";
$message = "les infos concernant la demande suite au formulaire du site :";
mail($mailPerso, $objetMail, $message . "\n" . $_dataEnString);
mail($mailPro, $objetMail, $message . "\n" . $_dataEnString);

$_dataEnArray = json_decode($_dataEnString,true);
$_dataEnArray["time"] = time();
file_put_contents("./dataClients/" . $_dataEnArray["mail"],json_encode($_dataEnString));
mail($_dataEnArray["mail"],"Votre demande photovoltaïque", "Bonjour " . $_dataEnArray["nom"] . 
", merci pour votre demande de renseignement photovoltaïque, notre conseillère vous rappelle dans la journée.
\nÀ bientôt, 
\nDevenez acteur de votre consommation avec Lumélio.", "From: lumelio.pv@gmail.com\r\nReply-To: lumelio.pv@gmail.com");

?>  