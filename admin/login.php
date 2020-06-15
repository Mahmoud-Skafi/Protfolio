<?php
session_start();
require_once('./config/dbcon.php');
if (isset($_POST['login'])) {

    $username = $_POST['username'];
    $password = $_POST['password'];
    $sql = $conDb->doSelectQuery($conn, "SELECT * FROM tblusers  WHERE user_name='" . $username . "' ");
    if ($sql['status'] == 1) {
        if ($sql['rows'] == 1) {
            if (password_verify($password, $sql['data'][0]['user_password'])) {
                $role = $sql['data'][0]['user_role'];
                $_SESSION['role'] = $role;
                header("location:./dashboard.php");
            }
        }
    }
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