<?php
//$test = json_encode([{"lat":1,"lng":2}],[{"lat":-1,"lng":-2}]);
//	echo $test;
session_start();
require_once "../config.php";
$current_time = time();
$one_year=31536000;
$last_year = $current_time-$one_year;
$current_time = $current_time;
$first_day_month = strtotime( 'first day of ' . date( 'F Y')); // gets timestamp of 1st of current month
$user_id=$_SESSION['user_id'];
$sql = "SELECT timestampMs
        FROM location_data
        WHERE `timestampMs` = (SELECT MIN(`timestampMs`) FROM location_data)
        UNION
        SELECT timestampMs
        FROM location_data
        WHERE `timestampMs` = (SELECT MAX(`timestampMs`) FROM location_data) ;";

if ($result = mysqli_query($link, $sql))
    {
            $array = [];
              while ($row = mysqli_fetch_row($result)) {
                $array [] = [$row[0]];
                // Loop through file pointer and a line
             }
                     echo json_encode($array);
    }else echo mysqli_error($link);

?>