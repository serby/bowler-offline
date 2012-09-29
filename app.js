var express = require('express')
  , http = require('http')
  , path = require('path')
  , app = express()
  ;

app.configure(function() {
  app.set('port', process.env.PORT || 3002);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(path.join(__dirname, '/public/images/favicon.ico')));
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public/'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', require('./routes/index'));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port http://localhost:' + app.get('port'));
});