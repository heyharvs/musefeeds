<?php

//definearrays
$urls = array("http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml","http://feeds.wired.com/wired/index");
$send = json_encode($urls,true);

$ch = curl_init('http://dev.mymuse.com:8000');
curl_setopt($ch, CURLOPT_CUSTOMREQUEST,"POST");
curl_setopt($ch, CURLOPT_POSTFIELDS,$send);
curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
curl_setopt($ch, CURLOPT_HTTPHEADER,array(
	'Content-Type:application/json'
));

$result = curl_exec($ch);
print_r($result);
