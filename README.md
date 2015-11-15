# musefeeds

This express app is dockerized and parses a list of rss feeds and merges them into a single result list.  Make sure the requests are application/json and the body is an array of urls.  Any invalid urls will return a 400 with the url that is valid, otherwise, will contain a merged list of rss items.
