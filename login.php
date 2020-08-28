<?php

session_start();

//Show successful registration message
if (@$_GET['registered'] == 'true')
    echo "<h3> <font color=yellow>You have registered successfully.</font></h3>";

// Include config file
require_once "config.php";


// Define variables and initialize with empty values
$password = $email = $user_id = $username = "";
$password_err  = $email_err = $login_err = "";

if ($_SERVER["REQUEST_METHOD"] == "POST"){

    // Validate email
    if(empty(trim($_POST["email"]))){
        $email_err = "Please enter your email.";
    } else{
        $email = $_POST["email"];
    }

    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter your password.";
    }
    else{
       $password = trim($_POST["password"]);
    }
    if(empty($username_err) && empty($password_err) && empty($confirm_password_err) && empty($email_err)){
        $sql = "SELECT user_id, email, username, usertype FROM users WHERE email=? AND password=?";
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "ss", $param_email, $param_password);
            $param_password = md5($password);
            $param_email = $email;

            if(mysqli_stmt_execute($stmt)){

                // store result
                mysqli_stmt_store_result($stmt);

                    // If account exists
                if(mysqli_stmt_num_rows($stmt) == 1){
                    session_start();
                    // Bind result variables
                    mysqli_stmt_bind_result($stmt, $user_id, $email, $username, $usertype);
                    // Fetch results
                    mysqli_stmt_fetch($stmt);
                    // Set session variables
                    $_SESSION["loggedin"] = true;
                    $_SESSION["email"] = $email;
                    $_SESSION["user_id"] = $user_id;
                    $_SESSION["usertype"] = $usertype;

                    // If user is logged in
                	if($usertype==0){
                	header("location: heatmap/index.php");

                    // If admin is logged in
                	}elseif($usertype==1){
                	header("location: admin.php");
                	}
                	else{
                	die ("usertype Error");
                	}



                } else{
                    $login_err = "Invalid credentials";
                }
            }
            else{
                echo "your mysql sucks".mysqli_error();
            }
            // Close statement
            mysqli_stmt_close($stmt);

        }
        // Close connection
        mysqli_close($link);
    }
}


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Log In</title>
    <link rel="stylesheet" href="credentials.css"/>
</head>
<body>
 <script>0</script> <!-- random firefox bug flashing unloaded css -->
<span $fresh_register> </span>
    <div class="wrapper">
        <h2>Sign In</h2>
        <p> Please sign in to continue.</p>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
        <span class="help-block"><?php  echo "<font color=#a94442> $login_err </font>"; ?></span>
            <div class="form-group <?php echo (!empty($email_err)) ? 'has-error' : ''; ?>">
                <label>Email</label>
                <input type="text" name="email" class="form-control" value="<?php echo $email; ?>">
                <span class="help-block"><?php echo $email_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                <label>Password</label>
                <input type="password" name="password" class="form-control" value="<?php echo $password; ?>">
                <span class="help-block"><?php echo $password_err; ?></span>
            </div>
            <div class="form-group">
                <input type="submit" id="login" class="btn button" value="Login">
            </div>
            <p>Dont have an account? <a href="register.php">Register here</a>.</p>
        </form>
    </div>
</body><!-- <a href="https://www.123freevectors.com/">Free Vector</a> <!-- cool background pic :) -->
</html>