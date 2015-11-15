# musefeeds

This express app is dockerized and parses a list of rss feeds and merges them into a single result list.  Make sure the requests are application/json and the body is an array of urls.  Any invalid urls will return a 400 with the url that is valid, otherwise, will contain a merged list of rss items.

```php
<?php
$urls = array(
        "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
        "http://feeds.wired.com/wired/index"
);
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
```
