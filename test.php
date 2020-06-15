<?php
session_start();
$_ACCESSTOKEN = $_SESSION['access_token'];
$_ClIENTID='06fe0cfca817bc4cffef';
?>
<!DOCTYPE html>
<html lang="en">

<head>
</head>

<body>
    <?php
    echo '<p>access_token:</p> ';
    echo '<p><code>' . $_ACCESSTOKEN . '</code></p>';
    if ($_ACCESSTOKEN == "") {
        //NOT LOGIN
        echo '<a href="https://github.com/login/oauth/authorize?client_id='.$_ClIENTID.'&scope=user%20repo">SING IN TO GITHUB</a>';
    } else {
        //LOGGED IN 
        echo '<p>LOGGED IN </p>';
    }
    ?>
</body>

</html>