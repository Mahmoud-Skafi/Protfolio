<?php
session_start();
$_CODE = $_GET['code'];
//Client ID Get From github OAuth App.
$_ClIENTID = '';
//Client Secret Get From github OAuth App.
$_CLIENTSECRET = '';

$_URL = 'https://github.com/login/oauth/access_token';

if ($_CODE == "") {
    header('location:http://localhost/index.php');
    exit;
}
$ch = curl_init();
$PostParam = [
    'client_id' => $_ClIENTID,
    'client_secret' => $_CLIENTSECRET,
    'code' => $_CODE
];
curl_setopt($ch, CURLOPT_URL, $_URL);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt(
    $ch,
    CURLOPT_POSTFIELDS,
    $PostParam
);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json'));

$server_output = curl_exec($ch);

curl_close($ch);
$data = json_decode($server_output);
var_dump($data);
if ($data->access_token != "") {
    session_start();
    $_SESSION['access_token'] = $data->access_token;
    header('location:http://localhost/index.php');
}
