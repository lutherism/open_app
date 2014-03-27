
<?php
//init MySQL database info (not posted to git hub)
include '/home1/open/public_html/open_app/php/mysql_config.php';
if (!$con)
  {
  die('Could not connect: ' . mysql_error($con));
  }
$db_selected = mysql_select_db("open_app",$con);
$sql = "SELECT * FROM `robot_list`";
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
