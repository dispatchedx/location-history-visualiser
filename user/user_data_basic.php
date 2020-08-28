<?php
session_start();
require_once "../config.php";


// Processing form data when form is submitted
$current_month=date("m", strtotime('m'));
$current_year=date("Y", strtotime('Y'));

//$first_day_month = strtotime( 'first day of ' . date( 'F Y'));

if ($_SERVER["REQUEST_METHOD"] == "GET")
{
    $foot_activities = "";
    $all_activities = "";
    $percent_yearly_score=$percent_current_score="";
    $param_user_id = $_SESSION['user_id'];


    $base = " AND `user_id`='$param_user_id'
            AND (date_format(FROM_UNIXTIME(`activity.timestampMs`/1000), '%m'))=$current_month
            AND (date_format(FROM_UNIXTIME(`activity.timestampMs`/1000), '%Y'))=$current_year";

    $sql= "SELECT  *
              FROM location_data
              where false";

        $sql.= " or  `activity.type` = 'RUNNING' $base";
        $sql.= " or  `activity.type` = 'WALKING' $base";
        $sql.= " or  `activity.type` = 'ON_BICYCLE' $base";

    $sql2= "SELECT  *
              FROM location_data
              where false";

        $sql2.= " or  `activity.type` = 'RUNNING' $base";
        $sql2.= " or  `activity.type` = 'WALKING' $base";
        $sql2.= " or  `activity.type` = 'ON_BICYCLE' $base";
        $sql2.= " or  `activity.type` = 'IN_VEHICLE' $base";

  $base = " AND `user_id`='$param_user_id'
            AND (date_format(FROM_UNIXTIME(`activity.timestampMs`/1000), '%m'))=$current_month
            AND (date_format(FROM_UNIXTIME(`activity.timestampMs`/1000), '%Y'))BETWEEN $current_year-1 AND $current_year";

    $sql3= "SELECT  *
              FROM location_data
              where false";

        $sql3.= " or  `activity.type` = 'RUNNING' $base";
        $sql3.= " or  `activity.type` = 'WALKING' $base";
        $sql3.= " or  `activity.type` = 'ON_BICYCLE' $base";

    $sql4= "SELECT  *
              FROM location_data
              where false";

        $sql4.= " or  `activity.type` = 'RUNNING' $base";
        $sql4.= " or  `activity.type` = 'WALKING' $base";
        $sql4.= " or  `activity.type` = 'ON_BICYCLE' $base";
        $sql4.= " or  `activity.type` = 'IN_VEHICLE' $base";

    if ($result = mysqli_query($link, $sql))
    {
            $foot_activities = mysqli_num_rows($result);

    } else echo mysqli_error($link);

    if ($result = mysqli_query($link, $sql2))
    {
            $all_activities = mysqli_num_rows($result);

    } else echo mysqli_error($link);

    if ($all_activities==""){
        $percent_current_score="no activities this month :(";
    } else{
        $current_score = $foot_activities/$all_activities;
        $percent_current_score = round($current_score * 100 ) . '%';
    }

    if ($result = mysqli_query($link, $sql3))
    {
            $foot_activities = mysqli_num_rows($result);

    } else echo mysqli_error($link);

    if ($result = mysqli_query($link, $sql4))
    {
            $all_activities = mysqli_num_rows($result);

    } else echo mysqli_error($link);
    if ($all_activities==""){
        $percent_yearly_score="no activities this year :(";
    } else{
        $yearly_score = $foot_activities/$all_activities;
        $percent_yearly_score = round($yearly_score * 100 ) . '%';

    }

    $result = array($percent_current_score,$percent_yearly_score);
    $result = json_encode($result);
    echo "$result";
    // Close connection
    mysqli_close($link);
}

