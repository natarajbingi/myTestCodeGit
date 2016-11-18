<?php
//header('Content-type: application/json');
date_default_timezone_set("Asia/Calcutta");
/* connect to the db */
$link = new mysqli('localhost', 'root', 'admin','gym') or die(mysqli_error($link));;
//$link = new mysqli('culque12.db.7399347.hostedresource.com', 'culque12', 'Pspl@123','culque12') or die(mysqli_error($link));;

?>