<?php
ob_flush();
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
  die('Could not connect: ' . mysql_error($con));
  }
$db_selected = mysql_select_db("open_app",$con);
$sql = "SELECT * FROM `robot_list` r;";
//Make query
$result = mysql_query($sql,$con);
//Process query into json
$new_array = array();
$row = array();
while($row = mysql_fetch_assoc($result)){
    $new_array[] = $row;
}

mysql_close($con);
print json_encode($new_array);
?>
