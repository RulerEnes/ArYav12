var http = require('http');

http.createServer(function (req, res){
  res.write("ArYa");
  res.end();
}).listen(8080);