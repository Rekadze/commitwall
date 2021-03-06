/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('./assets').assetsMiddleware);
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('development', function() {
  require('./demo').attach(app);
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

require('./helpers').attach(app);
require('./web').attach(app);
require('./notifier').attach(app);

app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);