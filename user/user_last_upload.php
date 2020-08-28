<?php
session_start();
require_once "../config.php";

$param_user_id = $_SESSION['user_id'];

$sql= "SELECT `lastUpload.timestampMs` FROM users WHERE user_id=?";
if ($stmt = mysqli_prepare($link, $sql))
    {
        mysqli_stmt_bind_param($stmt, "s", $param_user_id);
        if (mysqli_stmt_execute($stmt))
        {

            mysqli_stmt_bind_result($stmt,$lastUpload_timestampMs);
            mysqli_stmt_fetch($stmt);
            echo $lastUpload_timestampMs;
        }
        else echo mysqli_error($link);
        mysqli_stmt_close($stmt);
    }else echo mysqli_error($link);


?>