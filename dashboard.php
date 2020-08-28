
<?php
session_start();
if (!isset($_SESSION['loggedin'])) {
	echo "Access Forbidden";
	header("refresh:3; login.php");
	die();
	//header('location: login.php');

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

<title>Dashboard</title>
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

            <div id="intro" class="content-box">

                    <button id="go-back" class="btn button">Go back</button>

                </div>
                <div class="chart-container">
                    <canvas id="chart-registries" style="display: block; width: 733px; height: 321px;" width="733" height="321"></canvas>
                </div>
                <div class="chart-container">
                    <canvas id="pie-basic" style="display: block; width: 733px; height: 321px;" width="733" height="321"></canvas>
                </div>
                <div class="chart-container">
                     <canvas id="chart-years" style="display: block; width: 733px; height: 321px;" width="733" height="321"></canvas>
                </div>
                <div class="chart-container">
                     <canvas id="chart-months" style="display: block; width: 733px; height: 321px;" width="733" height="321"></canvas>
                </div>
                <div class="chart-container">
                 <canvas id="chart-hours" style="display: block; width: 733px; height: 321px;" width="733" height="321"></canvas>
                </div>
                <div class="chart-container">
                 <canvas id="chart-days" style="display: block; width: 733px; height: 321px;" width="733" height="321"></canvas>
                </div>
            </div>
            <div id="graphs" class="graphs">



            </div>

        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.1/Chart.min.js" integrity="sha512-o9zl61bgD9FuW1ww4rlG7/wQgg0V5Iy0Sm2qcLLwUHZqUyMgKIJjIk/ai8egAMwnOL8nyNOltB70cg+ZSrsjgw==" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.css">
    <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="heatmap/lib/leaflet.js"></script>
    <script src="heatmap/lib/leaflet.heat.min.js"></script>
    <script src="dashboard.js?"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.4.2/leaflet.draw.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.4.2/leaflet.draw.js"></script>





</div><!-- <a href="https://www.123freevectors.com/">Free Vector</a> <!-- cool background pic :) -->
</body>
</html>