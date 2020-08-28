<?php

session_start();
require_once "../config.php";

$year=$_POST['year'];
$toYear=$_POST['toYear'];

$month=$_POST['month'];
$toMonth=$_POST['toMonth'];

$day=$_POST['day'];
$toDay=$_POST['toDay'];

$hour=$_POST['hour'];
$toHour=$_POST['toHour'];

if(!$toYear) $toYear=$year;
if(!$toMonth) $toMonth=$month;
if(!$toDay) $toDay=$day;
if(!$toHour) $toHour=$hour;

if($year=='all'){
$year=1;
$toYear=5000;
}
if($month=='all'){
$month=1;
$toMonth=12;
}
if($day=='all'){
$day=0;
$toDay=7;
}
if($hour=='all'){
$hour=0;
$toHour=23;
}

$running=$_POST['running'];
$walking=$_POST['walking'];
$on_bicycle=$_POST['on_bicycle'];
$in_vehicle=$_POST['in_vehicle'];
$still=$_POST['still'];

$base = " AND (date_format(FROM_UNIXTIME(`activity.timestampMs`/1000), '%Y')) BETWEEN $year AND $toYear
                  AND (date_format(FROM_UNIXTIME(`activity.timestampMs`/1000), '%m')) BETWEEN $month AND $toMonth
                  AND (date_format(FROM_UNIXTIME(`activity.timestampMs`/1000), '%w')) BETWEEN $day AND $toDay
                  AND (date_format(FROM_UNIXTIME(`activity.timestampMs`/1000), '%H')) BETWEEN $hour and $toHour";

$sql= "SELECT  latitudeE7, longitudeE7
          FROM location_data
          where  false ";



$temp=[];
if ($running){
    $sql.= " or  `activity.type` = 'RUNNING' $base";
}
if ($walking){
    $sql.= " or `activity.type` = 'WALKING' $base";
}
if ($on_bicycle){
     $sql.= " or `activity.type` = 'ON_BICYCLE' $base";
}
if ($in_vehicle){
     $sql.= " or `activity.type` = 'IN_VEHICLE' $base";
}
if ($still){
     $sql.=  " or `activity.type` = 'STILL' $base";
}


//var_dump($sql);
//echo $sql; //TODO running+walking+bicycle breaks it

if ($result = mysqli_query($link, $sql))
    {

            $array = [];
              while ($row = mysqli_fetch_row($result)) {
                $array [] = [$row[0],$row[1]];
             }
            echo json_encode($array);

    }else echo mysqli_error($link);


?>