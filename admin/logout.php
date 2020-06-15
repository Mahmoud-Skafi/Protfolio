<?php
require_once('./config/dbcon.php');

session_start();
$_SESSION=="";
session_unset();
session_destroy();

?>
<script language="javascript">
document.location="login.php";
</script>
