<?php
require("connection.php");
$dbhost = "localhost";
$dbuser = "Skafi";
$dbpass = "mahmoudskafi00";
$db = "mad";
$conDb = new connection($dbhost, $dbuser, $dbpass, $db);

$conn = $conDb->starting();

