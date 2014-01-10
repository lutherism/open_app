<?php
parse_str($_SERVER['QUERY_STRING']);
require_once "php/mysql_config.php";
require_once "home1/open/public_html/oauth2-server-php/server.php";
if (!$server->verifyResourceRequest(OAuth2\Request::createFromGlobals())) {
    $server->getResponse()->send();
    die;
}
$token = $server->getAccessTokenData(OAuth2\Request::createFromGlobals());
$id = mysql_real_escape_string($id,$con);
$sql = ("SELECT * FROM users u LEFT JOIN robot_list r ON r.artist = u.users AND u.user_id={$token[2]} AND r.id = $id");
$result = mysql_query($sql, $con);
mysql_close($con);
while($row = mysql_fetch_assoc($result)){
	$image
}
