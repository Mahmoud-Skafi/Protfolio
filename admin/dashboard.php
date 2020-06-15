<?php
include('./config/dbcon.php');
include('./config/permissions.php');
session_start();
error_reporting(0);
$pagename = basename($_SERVER['PHP_SELF']);
$role = $_SESSION['role'];
if (checkPermision($pagename, $role)) {
    $_ClIENTID = '06fe0cfca817bc4cffef';
    echo '<a href="https://github.com/login/oauth/authorize?client_id=' . $_ClIENTID . '&scope=user%20repo">github</a> <br>';
    echo '<a href="./logout.php">logout</a>';
} else {
    header('location:./login.php');
}
