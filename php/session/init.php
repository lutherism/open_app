<?php
foreach ($_GET as $value) {
	$_SESSION[$value]=$_GET[$value];
	}
$_SESSION['access_token']=$_GET['access_token'];
