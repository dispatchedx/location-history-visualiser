<?php

require_once "../config.php";

$sql="truncate table location_data";

if(mysqli_query($link,$sql)){
 echo "All data deleted.";
}else echo mysqli_error($link);

?>