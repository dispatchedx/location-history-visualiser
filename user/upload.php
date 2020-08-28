<?php
session_start();
require_once "../config.php";


// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
$sql = "INSERT INTO `location_data` (`longitudeE7`, `latitudeE7`, `accuracy`, `timestampMs`, `velocity`, `activity.type`,
         `activity.confidence`, `activity.timestampMs`, heading, altitude, verticalAccuracy, `user_id`)
         VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
//$sql = "UPDATE users SET data=? WHERE user_id=?";

        $param_user_id = $_SESSION['user_id'];
        if($stmt = mysqli_prepare($link, $sql)){
            mysqli_stmt_bind_param($stmt, "ddisisisiiis", $param_longitudeE7, $param_latitudeE7, $param_accuracy,
                                   $param_timestampMs, $param_velocity, $param_activity_type,
                                   $param_activity_confidence, $param_activity_timestampMs,$param_heading,
                                   $param_altitude, $param_verticalAccuracy, $param_user_id
                                   );

            $param_user_id = $_SESSION['user_id'];
            $lls = $_POST['locationData']; //some data is lost here.. php.ini solution is temporary wont work for big files
            $lls = json_decode($lls, true);
            //echo sizeof($lls);
            foreach ($lls as $row){
                $param_longitudeE7 = $row['longitude'];
                $param_latitudeE7 = $row['latitude'];
                $param_accuracy = $row['accuracy'];
                $param_timestampMs = $row['timestampMs'];
                // make empty variables incase row doesnt contain such info
                $param_velocity = $param_heading = $param_altitude = $param_verticalAccuracy = "";
                $param_activity_type = $param_activity_confidence = $param_activity_timestampMs = "";
                if(isset($row['velocity'])){
                    $param_velocity = $row['velocity'];
                 }
                if(isset($row['activity.type'])){
                     $param_activity_type = $row['activity.type'];
                }
                if(isset($row['activity.confidence'])){
                     $param_activity_confidence = $row['activity.confidence'];
                }
                if(isset($row['activity.timestampMs'])){
                     $param_activity_timestampMs = $row['activity.timestampMs'];
                }
                if(isset($row['heading'])){
                     $param_heading = $row['heading'];
                }
                if(isset($row['altitude'])){
                     $param_altitude = $row['altitude'];
                }
                if(isset($row['verticalAccuracy'])){
                     $param_verticalAccuracy = $row['verticalAccuracy'];
                }

                if(mysqli_stmt_execute($stmt)){
                   // echo "uploading: ";
                } else echo mysqli_error($link);
            }
            $var = count($lls);
            echo "uploading: $var data points";
            // Close statement
             mysqli_stmt_close($stmt);
        } else echo mysqli_error($link);


        $sql2="UPDATE users SET `lastUpload.timestampMs`=? WHERE user_id=?";
        if($stmt = mysqli_prepare($link, $sql2)){
            $param_current_time=time();
            mysqli_stmt_bind_param($stmt, "ss", $param_current_time,$param_user_id);
            if (mysqli_stmt_execute($stmt)){
            }else echo mysqli_error($link);

            mysqli_stmt_close($stmt);
        }
        // Close connection
        mysqli_close($link);
}