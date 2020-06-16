<?php
include('./config/dbcon.php');
include('./config/permissions.php');
session_start();
error_reporting(0);
$pagename = basename($_SERVER['PHP_SELF']);
$role = $_SESSION['role'];
if (checkPermision($pagename, $role)) {
    $access_token = $_SESSION['access_token'];

    if ($access_token == '') {
        echo 'ERROR 404';
    } else {
        //Request URL=https://api.github.com* GitHub API
        // Request To Get All Repos For All User That Registered Using access_token
        $_URL = 'https://api.github.com/user/repos?access_token=' . $access_token;
        //OAhut Header
        $header_token = 'Authorization: token' . $access_token;
        //App Name
        $header_app_user = 'User-Agent:MaD';
        //CURL POST Request
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $_URL);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        /*Headers*/
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json', $header_app_user, $header_token));

        $server_output = curl_exec($ch);

        curl_close($ch);
        $data = json_decode($server_output);
        var_dump($data[2]->language);
        $sql = $conDb->doSelectQuery($conn, "DELETE FROM `tblgithub` WHERE 1");
        if ($sql['status'] == 1) {
            for ($i = 0; $i < sizeof($data); $i++) {
                $repo_id = $data[$i]->id;
                $repo_name = $data[$i]->name;
                $repo_url = $data[$i]->url;
                $repo_description = $data[$i]->description;
                $repo_private = $data[$i]->private;
                $repo_fork = $data[$i]->fork;
                $repo_forks_coun = $data[$i]->forks_coun;
                $repo_stargazers_count = $data[$i]->stargazers_count;
                $repo_language = $data[$i]->language;

                // $sql = $conDb->doSelectQuery($conn, "SELECT * FROM tblgithub WHERE repo_id != '$repo_id'  ");
                // if ($sql['status'] == 1) {
                $sql = $conDb->doSelectQuery($conn, "INSERT INTO tblgithub (repo_id, reop_name, repo_url, repo_description, repo_private, repo_fork, repo_fork_count, reop_stargazers_count,repo_language) 
                    VALUES ('$repo_id','$repo_name','$repo_url','$repo_description','$repo_private','$repo_fork',' $repo_forks_coun','$repo_stargazers_count','$repo_language')");
                if ($sql['status'] == 1) {
                    header('location:../index.php');
                } else {
                    echo "fuck";
                }
                // var_dump($data[$i]);
            }
        }
    }
} else {
    header('location:./login.php');
}
