<?php
foreach ($_GET as $value) {
	$_SESSION[$value]=$_GET[$value];
	}

//foreach ($_SESSION as $value) {
	header("test: {$_SESSION['username']}");
	//}
