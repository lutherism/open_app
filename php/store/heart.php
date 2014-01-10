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
$id = mysql_real_escape_string($id,$con);

/*
			========== ON ROBOT HEART ===========
				- add robot to favorites
				- reward artist
				- log reputation reward
*/
// LOG REPUTATION REWARD
$sql = "INSERT INTO `reputation_delta` (parent_id, grantor_id, user_id, rep_delta, notes) VALUES ($id,'(SELECT user_id FROM users WHERE users={$token[2]})',(SELECT u.user_id FROM users u, robot_list l WHERE l.id=$id AND u.users=l.artist), 5, '+5 good');";
//Make query
$result = mysql_query($sql,$con);

//REWARD ARTIST
$sql = "UPDATE `user_rep` positive=positive+5, total=total+5 WHERE user_id=(SELECT u.user_id FROM users u, robot_list l WHERE l.id=$id AND u.users=l.artist);";
//Make query
$result = mysql_query($sql,$con);

///ADD ROBOT TO FAVORITE PLAYLIST
$sql = "INSERT INTO `user_robot_saves` (robot_id, group_id) VALUES ($id, (SELECT id FROM user_robot_groups WHERE group_name='Favorites' AND user='{$token[2]}'));";
//Make query
$result = mysql_query($sql,$con);
//Procs query into json
mysql_close($con);
?>
