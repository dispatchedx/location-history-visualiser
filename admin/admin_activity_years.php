


<?php

session_start();
require_once "../config.php";


$sql= "SELECT (date_format(FROM_UNIXTIME(`timestampMs`/1000), '%Y')), count(*)
          FROM location_data
          GROUP BY (date_format(FROM_UNIXTIME(`timestampMs`/1000), '%Y'))
          ORDER BY (date_format(FROM_UNIXTIME(`timestampMs`/1000), '%Y')) ASC";


if ($result = mysqli_query($link, $sql))
    {

            $array = [];
              while ($row = mysqli_fetch_row($result)) {
                $array [] = [$row[0],$row[1]];
             }
            echo json_encode($array);

    }else echo mysqli_error($link);


?>