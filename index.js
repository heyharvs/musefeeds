'use strict';

// dependencies
var express = require('express');
var request = require('request');
var cachedrequest = require('cached-request')(request);
var async = require('async');
var bodyparser = require('body-parser');
var feedparser = require('feedparser');
var _ = require('lodash');

// function to parse url
var parse = function (url, cb) {
  var req = cachedrequest({'url': url, ttl: 3600});
  var items = [];
  var fp = new feedparser({normalize: true, addmeta: false});

  // request error
  req.on('error', function (err) {
    return cb('download error ' + err);
  });

  // with finished response
  req.on('response', function (res) {
    var stream = this;
    if (res.statusCode != 200) {
      return cb('invalid url ' + url);
    } else {
      stream.pipe(fp);
    }
  });

  fp.on('error', function (err) {
    return cb(url + err);
  });

  // handle incoming items
  fp.on('readable', function () {
    var stream = this;
    var item;

    while (item = stream.read()) {
      items.push(item);
    }
  });

  fp.on('end', function () {
    return cb(null, items);
  });
};

// iniail app
var app = express();
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// defind function for route
app.post('/', function (req, res) {
  if (req.body.length > 0) {
    async.map(req.body, parse, function (err, items) {
      if (err) {
        res.status(400);
        return res.send(err);
      }
      
      // merge all items in feed
      var all = _.flatten(items);
      var sorted = _.sortBy(all, 'date').reverse();
      return res.json(sorted);
    });
  } else {
    res.send('Invalid request.  Check out http://github.com/heyharvs/musefeeds for examples of how to make requests.');
  }
});

app.all('*', function (req, res) {
  res.status(400);
  res.send('Invalid request.  Check out http://github.com/heyharvs/musefeeds for examples of how to make requests.');
});

// run server
var server = app.listen(80, function () {
  console.log('listening');
});

