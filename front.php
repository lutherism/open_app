<?php

 header("Access-Control-Allow-Origin: http://store.openrobot.net");
// include our OAuth2 Server object
require_once '/home1/open/public_html/oauth2-server-php/server.php';

// Handle a request for an OAuth2.0 Access Token and send the response to the client
if (!$server->verifyResourceRequest(OAuth2\Request::createFromGlobals())) {
    $server->getResponse()->send();
		readfile("http://store.openrobot.net/html/store/login.html");
}
else{
		readfile("http://store.openrobot.net/html/store/main.html");
}


?>
