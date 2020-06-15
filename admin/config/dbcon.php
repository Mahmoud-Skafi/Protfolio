<?php
require("connection.php");
$dbhost = "localhost";
$dbuser = "Skafi";
$dbpass = "mahmoudskafi00";
$db = "MaD";
$conDb = new connection($dbhost, $dbuser, $dbpass, $db);

$conn = $conDb->starting();

