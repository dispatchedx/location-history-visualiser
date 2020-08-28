<?php
//$test = json_encode([{"lat":1,"lng":2}],[{"lat":-1,"lng":-2}]);
//	echo $test;
session_start();
require_once "../config.php";


$sql= "SELECT user_id,count(*)
          FROM location_data
          GROUP BY user_id
          ORDER BY count(*) DESC;";


if ($result = mysqli_query($link, $sql))
    {

            $array = [];
              while ($row = mysqli_fetch_row($result)) {
                $array [] = [$row[0],$row[1]];
             }
            echo json_encode($array);

    }else echo mysqli_error($link);


?>