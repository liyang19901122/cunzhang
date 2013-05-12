/**
 * Module dependencies.
 */
var express = require('express'),
  routes = require('./route'),
  http = require('http'),
  puer = require("puer"), // livereload connect middleware
  https = require('https'),
  net = require('net'),
  fs = require('fs'),
  path = require('path');

var cluster = require('cluster');
var numCPUs = require("os").cpus().length;



var logger = require('log4js').getLogger(__filename);

var basePath = process.cwd();
var app = express();

var publicPath = basePath + '/public';

app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: "keyboard cat"
  }));
  app.use(app.router);
  app.set('port', 8001);
  app.set('view engine', 'html');
  app.engine('.html', require('ejs').__express);
  app.set('view options', {
    layout: false
  });
  app.set('basepath', publicPath);
  app.enable('trust proxy');
});

app.configure('development', function() {
  app.set('views', basePath + '/view');
  app.use(express.static(publicPath));
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'Error');
  });
  app.use(function(req, res, next) {
    res.send('404');
  });
});

app.configure('production', function() {
  app.set('views', basePath + '/view');
  var oneYear = 31557600000;
  app.use(express.static(publicPath, {
    maxAge: oneYear
  }));
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'Error');
  });
  app.use(function(req, res, next) {
    res.send('404');
  });
});

routes(app);


if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + "died");
  });
} else {
    http.createServer(app).listen(8001, function() {
      logger.info("elearn http server started http://61test.163.com:8001");
    });
}
