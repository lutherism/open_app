<?php
require_once '/home1/open/public_html/oauth2-server-php/server.php';

// Handle a request for an OAuth2.0 Access Token and send the response to the client
if (!$server->verifyResourceRequest(OAuth2\Request::createFromGlobals())) {
    $server->getResponse()->send();
    die;
}
$token = $server->getAccessTokenData(OAuth2\Request::createFromGlobals());
//init MySQL database info (not posted to git hub)
include '/home1/open/public_html/open_app/php/mysql_config.php';
if (!$con)
  {
  die('Could not connect: ' . mysqli_error($con));
  }
parse_str($_SERVER['QUERY_STRING']);
$db_selected = mysql_select_db("open_app",$con);
$receipt = mysql_real_escape_string($receipt,$con);
$subject = mysql_real_escape_string($subject,$con);
$message = mysql_real_escape_string($message,$con);
//INSERT INTO `private_message` (sender_id, reciever_id, subject, message) VALUES ((SELECT user_id FROM users WHERE users='xanderjanz'), (SELECT user_id FROM users WHERE users='lutherism'), 'test', 'Test messageee!');
$sql = "INSERT INTO `private_message` (sender_id, reciever_id, subject, message) VALUES ((SELECT user_id FROM users WHERE users='{$token[2]}'), (SELECT user_id FROM users WHERE users='$receipt'),'$subject', '$message');";
//Make query
$result = mysql_query($sql,$con);
//Process query into json
echo($sql);
mysql_close($con);
print "Thanks for registering! Redirecting you now...";
?>
