<?php
session_start();
require_once('./config/dbcon.php');

$username = $_POST['username'];
$password = $_POST['password'];
$sql = $conDb->doSelectQuery($conn, "SELECT * FROM tblusers  WHERE user_name='" . $username . "' ");
if ($sql['status'] == 1) {
    echo $username;
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>

<body>
    <form method="POST">
        USER NAME :<input type="text" name="username">
        PASSWORD :<input type="password" name="password">
        <button name="login">
            Login in
        </button>
    </form>
</body>

</html>