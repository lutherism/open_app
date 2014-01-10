<?php
//init MySQL database info (not posted to git hub)
include '/home1/open/public_html/open_app/php/mysql_config.php';
if (!$con)
  {
  die('Could not connect: ' . mysqli_error($con));
  }
$db_selected = mysql_select_db("open_app",$con);
$user = mysql_real_escape_string($user,$con);
$email = mysql_real_escape_string($email,$con);
$reason = mysql_real_escape_string($reason,$con);
parse_str($_SERVER['QUERY STRING']);
$sql = "INSERT INTO `beta_requests` (username, email, reason) VALUES ('$user', '$email', '$reason');";
header("Location: http://store.openrobot.net");
//Make query
$result = mysql_query($sql,$con);
//Process query into json
mysql_close($con);
print "Thanks for registering! Redirecting you now...";
?>
