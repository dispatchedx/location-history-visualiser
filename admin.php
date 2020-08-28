
<?php
session_start();
if (!isset($_SESSION['loggedin'])) {
	echo "Access Forbidden";
	header("refresh:3; login.php");
	die();
	//header('location: login.php');
//test
}elseif ($_SESSION['usertype']==0) {
	    echo "Access Forbidden";
	    die();
	    //header('location: login.php');
}elseif($_SESSION['usertype']==1) {
	    //echo "you are admin";
	    //header('location: login.php');
    }
?>
<!DOCTYPE html>
<html lang="en">

<meta charset="UTF-8">

<title>Management</title>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<meta name="description" content="Admin management page">
<link rel="stylesheet" href="heatmap/index.css">
<link rel="stylesheet" href="heatmap/lib/leaflet.css">
<link rel="stylesheet" href="credentials.css">
    <link rel="stylesheet" href="admin.css">


</head>
<body>
<div class="visualizer">

    <div class="container">
        <div id="content-div" class="content">
            <div id="flex1">
            <div id="intro" class="content-box">
                    <button id="dashboard" class="btn button">Go to dashboard</button>
                    <div id="options-box" class="option-box">
                        <h2> Location History Heatmap </h2>
                        Select year
                        <select id="year" class="select" style="margin-left: 9px;margin-bottom: 5px;">
                            <option value=''>--Select Year--</option>
                              <option value='all'>All</option>
                            <option value='2015'>2015</option>
                            <option value='2016'>2016</option>
                            <option value='2017'>2017</option>
                            <option value='2018'>2018</option>
                            <option value='2019'>2019</option>
                            <option selected value='2020'>2020</option>
                        </select>
                        to
                        <select id="to-year" class="select" style="margin-left: 9px;">
                            <option selected value=''></option>
                            <option value='2015'>2015</option>
                            <option value='2016'>2016</option>
                            <option value='2017'>2017</option>
                            <option value='2018'>2018</option>
                            <option value='2019'>2019</option>
                            <option value='2020'>2020</option>
                        </select>

                        <br>
                        Select month
                        <select id="month" class="select">
                            <option value=''>--Select Month--</option>
                            <option value='all'>All</option>
                            <option value='1'>January</option>
                            <option selected value='2'>February</option>
                            <option value='3'>March</option>
                            <option value='4'>April</option>
                            <option value='5'>May</option>
                            <option value='6'>June</option>
                            <option value='7'>July</option>
                            <option value='8'>August</option>
                            <option value='9'>September</option>
                            <option value='10'>October</option>
                            <option value='11'>November</option>
                            <option value='12'>December</option>
                        </select>
                        to
                        <select id="to-month" class="select">
                            <option selected value=''></option>
                            <option value='1'>January</option>
                            <option value='2'>February</option>
                            <option value='3'>March</option>
                            <option value='4'>April</option>
                            <option value='5'>May</option>
                            <option value='6'>June</option>
                            <option value='7'>July</option>
                            <option value='8'>August</option>
                            <option value='9'>September</option>
                            <option value='10'>October</option>
                            <option value='11'>November</option>
                            <option value='12'>December</option>
                        </select>
                        <br>
                        Select day
                        <select id="day" class="select">
                            <option value=''>--Select Day--</option>
                            <option value='all'>All</option>
                            <option value='1'>Monday</option>
                            <option selected value='2'>Tuesday</option>
                            <option value='3'>Wednesday</option>
                            <option value='4'>Thursday</option>
                            <option value='5'>Friday</option>
                            <option value='6'>Saturday</option>
                            <option value='0'>Sunday</option>
                        </select>
                        to
                        <select id="to-day" class="select">
                            <option selected value=''></option>
                            <option value='1'>Monday</option>
                            <option value='2'>Tuesday</option>
                            <option value='3'>Wednesday</option>
                            <option value='4'>Thursday</option>
                            <option value='5'>Friday</option>
                            <option value='6'>Saturday</option>
                            <option value='0'>Sunday</option>
                        </select>
                        <br>
                        Select hour
                        <select id="hour" class="select">
                            <option selected value=''>--Select Hour--</option>
                            <option value='all'>All</option>
                            <option value='0'>00:00</option>
                            <option value='1'>01:00</option>
                            <option value='2'>02:00</option>
                            <option value='3'>03:00</option>
                            <option value='4'>04:00</option>
                            <option value='5'>05:00</option>
                            <option value='6'>06:00</option>
                            <option value='7'>07:00</option>
                            <option value='8'>08:00</option>
                            <option value='9'>09:00</option>
                            <option value='10'>10:00</option>
                            <option value='11'>11:00</option>
                            <option value='12'>12:00</option>
                            <option value='13'>13:00</option>
                            <option value='14'>14:00</option>
                            <option value='15'>15:00</option>
                            <option value='16'>16:00</option>
                            <option value='17'>17:00</option>
                            <option value='18'>18:00</option>
                            <option value='19'>19:00</option>
                            <option value='20'>20:00</option>
                            <option value='21'>21:00</option>
                            <option value='22'>22:00</option>
                            <option value='23'>23:00</option>
                        </select>
                        to
                        <select id="to-hour" class="select">
                            <option selected value=''></option>
                            <option value='0'>00:00</option>
                            <option value='1'>01:00</option>
                            <option value='2'>02:00</option>
                            <option value='3'>03:00</option>
                            <option value='4'>04:00</option>
                            <option value='5'>05:00</option>
                            <option value='6'>06:00</option>
                            <option value='7'>07:00</option>
                            <option value='8'>08:00</option>
                            <option value='9'>09:00</option>
                            <option value='10'>10:00</option>
                            <option value='11'>11:00</option>
                            <option value='12'>12:00</option>
                            <option value='13'>13:00</option>
                            <option value='14'>14:00</option>
                            <option value='15'>15:00</option>
                            <option value='16'>16:00</option>
                            <option value='17'>17:00</option>
                            <option value='18'>18:00</option>
                            <option value='19'>19:00</option>
                            <option value='20'>20:00</option>
                            <option value='21'>21:00</option>
                            <option value='22'>22:00</option>
                            <option value='23'>23:00</option>
                        </select>
                        		<div class="form-check">
                            <label class="form-check-label" >Select all   activities</label>
                            <input type="checkbox" name="CheckAll" id="CheckAll">
                          </div>
                        <form name="form" id="activities-form">

                          <div id="check-flex2">
                        		<div class="form-check">
                            <input type="checkbox" name="CheckBox" class="form-check-input" id="running">
                            <label class="form-check-label" >Running</label>
                          </div>
                        		<div class="form-check">
                            <input type="checkbox" name="CheckBox" class="form-check-input" id="walking">
                            <label class="form-check-label" >Walking</label>
                          </div>
                        		<div class="form-check">
                            <input type="checkbox" name="CheckBox" class="form-check-input" id="in-vehicle">
                            <label class="form-check-label" >In vehicle</label>
                          </div>
                          </div>
                          <div id="check-flex3">
                          <div class="form-check">
                                <input type="checkbox" name="CheckBox" class="form-check-input" id="on-bicycle">
                                <label class="form-check-label" >On Bicycle</label>
                          </div>
                          <div class="form-check">
                                <input type="checkbox" name="CheckBox" class="form-check-input" id="still">
                                <label class="form-check-label" >Still</label>
                          </div>
                          </div>
                        	</form>
                        <br>
                         <form name="export-as" id="export-as">
                         <div id="radio-flex1">
                           Export as
                           </div>
                           <div id="radio-flex2">
                           <input type="radio" id="csv" name="export-as" value="csv">
                           <label for="export-as">csv</label><br>
                           <input type="radio" id="json" name="export-as" value="json">
                           <label for="export-as">json</label><br>
                           <input type="radio" id="xml" name="export-as" value="xml">
                           <label for="export-as">xml</label>
                           </div>
                           </form>
                         <br>
                        <button id="apply" class="btn button">Apply filters</button>
                        <button id="export-data" class="btn button">Export selected data</button>
                        <button id="delete-data" class="btn button">Delete all data</button>
                    </div>
                </div>
            </div>


            </div>

        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.1/Chart.min.js" integrity="sha512-o9zl61bgD9FuW1ww4rlG7/wQgg0V5Iy0Sm2qcLLwUHZqUyMgKIJjIk/ai8egAMwnOL8nyNOltB70cg+ZSrsjgw==" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.css">
    <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="heatmap/lib/leaflet.js"></script>
    <script src="heatmap/lib/leaflet.heat.min.js"></script>
    <script src="admin.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.4.2/leaflet.draw.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.4.2/leaflet.draw.js"></script>





</div>>
</body><!-- <a href="https://www.123freevectors.com/">Free Vector</a> <!-- cool background pic :) -->
</html>