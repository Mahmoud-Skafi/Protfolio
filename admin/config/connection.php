<?php

/**
 * Created by sublime.
 * User: mahmoud skafi
 * Date: 5/29/18
 * Time: 1:42 PM
 */

class connection
{

    private $host;
    private $user;
    private $password;
    private $db;

    /**
     * connection constructor.
     * @param $host
     * @param $user
     * @param $password
     * @param $db
     */
    public function __construct($host, $user, $password, $db)
    {
        $this->host = $host;
        $this->user = $user;
        $this->password = $password;
        $this->db = $db;
    }

    public function doQuery($con, $query)
    {
        if ($stmt = mysqli_prepare($con, $query)) {

            mysqli_stmt_execute($stmt);

            $stmt->close();
            // return 1;
        }
        else{
            return 0;
        }
    }
    function doSelectQuery($con, $sql)
    {
        $status = false;
        $data = array();


        $result = mysqli_query($con, $sql);
        $i = 0;

        $rows = mysqli_num_rows($result);
        if ($rows == 0)
            $status = true;
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

            $data[$i] = $row;

            $status = true;

            $i += 1;
        }
        return ['status' => $status, 'data' => $data, 'rows' => $rows];
    }

    public function starting()
    {

        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        error_reporting(E_ALL);
        ini_set('display_errors', 0); //on server put it to 0
        ini_set('log_errors', 0);
        try {
            if ($con = mysqli_connect($this->host, $this->user, $this->password, $this->db)) {
                $this->doQuery($con, "SET NAMES 'utf8'");
                $this->doQuery($con, "SET CHARACTER SET utf8");
                mysqli_set_charset($con, "utf8");
                return $con;
            } else {
                throw new Exception('Unable to connect');
            }
        } catch (Exception $e) {
            echo $e;
            return false;
        }
    }
}
