<?php
// Include config file
require_once "config.php";

// Define variables and initialize with empty values
$username = $password = $confirm_password = $email = $user_id = $first_name = $last_name = "";
$username_err = $password_err = $confirm_password_err = $email_err = $first_name_err = $last_name_err = "";

// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){

    // Validate username
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter a username.";
    } else{
        $username = $_POST["username"];
    }

    // Validate password
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter a password.";
    }
    elseif(strlen(trim($_POST["password"])) < 8){ // 8 char check
        $password_err = "Password must have at least 8 characters.";
    }
    elseif(!preg_match("/[!@#$%^&*()_+{}\[\]:\"'\/,\.<>\-=\?\;`~]/", trim($_POST["password"]))){ // 1 special char check
        $password_err = "Password must contain at least 1 special character example:[!@#$].";
    }
    elseif(!preg_match("/[0-9]/", trim($_POST["password"]))){ // 1 number check
        $password_err = "Password must contain at least 1 number.";
    }
    elseif(!preg_match("/[A-Z]/", trim($_POST["password"]))){
        $password_err = "Password must contain at least 1 capital letter.";
    }
    else{
        $password = trim($_POST["password"]);
    }

    // Validate confirm password
    if(empty(trim($_POST["confirm_password"]))){
        $confirm_password_err = "Please confirm password.";
    } else{
        $confirm_password = trim($_POST["confirm_password"]);
        if(empty($password_err) && ($password != $confirm_password)){
            $confirm_password_err = "Password did not match.";
        }
    }

    //Validate email
    if(empty(trim($_POST["email"]))){
    $email_err = "Please enter your email.";
    } elseif(!preg_match("/.+@.+\..+/", trim($_POST["email"]))){
            $email_err = "Please enter a valid email.";
        }
    else{
                // Prepare a select statement
                $sql = "SELECT user_id FROM users WHERE email = ?";

                if($stmt = mysqli_prepare($link, $sql)){
                    // Bind variables to the prepared statement as parameters
                    mysqli_stmt_bind_param($stmt, "s", $param_email);

                    // Set parameters
                    $param_email = trim($_POST["email"]);

                    // Attempt to execute the prepared statement
                    if(mysqli_stmt_execute($stmt)){
                        /* store result */
                        mysqli_stmt_store_result($stmt);

                        if(mysqli_stmt_num_rows($stmt) == 1){
                            $email_err = "This email is already taken.";
                        } else{
                            $email = trim($_POST["email"]);
                        }
                    } else{
                        echo "Oops! Something went wrong. Please try again later.";
                    }

                    // Close statement
                    mysqli_stmt_close($stmt);
                }
            }
        if(empty(trim($_POST["first_name"]))){
            $first_name_err = "Please enter your first name.";
        } else{
            $first_name = $_POST["first_name"];
        }
        if(empty(trim($_POST["last_name"]))){
            $last_name_err = "Please enter your last name.";
        } else{
            $last_name = $_POST["last_name"];
        }


    // Check input errors before inserting in database
    if(empty($username_err) && empty($password_err) && empty($confirm_password_err) && empty($email_err) && empty($last_name_err) && empty($first_name_err)){

        // Prepare an insert statement
        $sql = "INSERT INTO users (username, password, user_id, email, usertype, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?, ?)";
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "ssssbss", $param_username, $param_password, $param_user_id, $param_email,
             $param_usertype, $param_first_name, $param_last_name);

            // Set parameters
            $user_id = openssl_encrypt($email, "AES-256-CBC", $password); // Creates 2 way encryption id
            $param_username = $username;
            $param_password = md5($password); // Creates a password hash
            $param_user_id = $user_id;
            $param_email = $email;
            $param_usertype = 0;
            $param_first_name = $first_name;
            $param_last_name = $last_name;
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Redirect to login page
                header("location: login.php?registered=true");
            } else{
                echo "Something went wrong. Please try again later.";
            }


            // Close statement
            mysqli_stmt_close($stmt);
        }
    }

    // Close connection
    mysqli_close($link);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign Up</title>

    <link rel="stylesheet" href="credentials.css"/>
<style>
.wrapper{
    width: 350px;
    padding: 20px;
    border: 2px;
    border-radius: 20px;
    margin: 0;
    background: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%)
}
</style>
</head>
<body>
    <div class="wrapper">
        <h2>Sign Up</h2>
        <p>Please fill this form to create an account.</p>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                <label>Username</label>
                <input type="text" name="username" class="form-control" value="<?php echo $username; ?>">
                <span class="help-block"><?php echo $username_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                <label>Password</label>
                <input type="password" name="password" class="form-control" value="<?php echo $password; ?>">
                <span class="help-block"><?php echo $password_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($confirm_password_err)) ? 'has-error' : ''; ?>">
                <label>Confirm Password</label>
                <input type="password" name="confirm_password" class="form-control" value="<?php echo $confirm_password; ?>">
                <span class="help-block"><?php echo $confirm_password_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($email_err)) ? 'has-error' : ''; ?>">
                <label>Email</label>
                <input type="text" name="email" class="form-control" value="<?php echo $email; ?>">
                <span class="help-block"><?php echo $email_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($first_name_err)) ? 'has-error' : ''; ?>">
                <label>First name</label>
                <input type="text" name="first_name" class="form-control" value="<?php echo $first_name; ?>">
                <span class="help-block"><?php echo $first_name_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($last_name_err)) ? 'has-error' : ''; ?>">
                <label>Last name</label>
                <input type="text" name="last_name" class="form-control" value="<?php echo $last_name; ?>">
                <span class="help-block"><?php echo $last_name_err; ?></span>
            </div>
            <div class="form-group">
                <input type="submit" id="register" class="btn button" value="Sign up">
            </div>
            <p>Already have an account? <a href="login.php">Login here</a>.</p>
        </form>
    </div>
</body><!-- <a href="https://www.123freevectors.com/">Free Vector</a> <!-- cool background pic :) -->
</html>