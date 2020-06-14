<?php
session_start();
$access_token = $_SESSION['access_token'];

if ($access_token == '') {
    echo 'ERROR 404';
} else {
    //Request URL=https://api.github.com* GitHub API
    // Requset To Get All Repos For All User Login In Using access_token
    $_URL = 'https://api.github.com/user/repos?access_token=' . $access_token;
    //OAhut Header
    $header_token = 'Authorization: token' . $access_token;
    //App Name
    $header_app_user = 'User-Agent:MaD';
    //CURL POST Requset
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $_URL);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    /*Headers*/
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json', $header_app_user, $header_token));
    $server_output = curl_exec($ch);
    curl_close($ch);
    $data = json_decode($server_output);

    for ($i = 0; $i < sizeof($data); $i++) {
        var_export($data[$i]->name);
    }
}
