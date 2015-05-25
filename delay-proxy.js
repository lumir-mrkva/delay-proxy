var http = require('http'),
    httpProxy = require('http-proxy'),
    args = require('minimist')(process.argv.slice(2));

var proxy = httpProxy.createProxyServer({}),
    to = args._[0] || 'http://localhost';

var server = http.createServer(function(req, res) {
  var url = req.url,
      delay = 0;
  if (url) {
    tokens = url.split('/');
    tokens.shift();
    tokens.shift();
    req.url = '/' + tokens.join('/');
    delay = parseInt(tokens.shift()) || delay;
    if (delay) {
      req.url = '/' + tokens.join('/');
    }
  }
  console.log(req.method + '('+delay+') ' +to + req.url);
  setTimeout(function () {
    proxy.web(req, res, {
      target: to
    });
  }, delay);
});

console.log("listening on port 5050")
server.listen(5050);
