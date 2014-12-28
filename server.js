var http = require("http");
var url = require("url");
var fs = require("fs")

function onRequest(request, response) {
  var pathname = '.' + url.parse(request.url).pathname;

  if(pathname.indexOf('favico') >=0)
    return

  console.log("Request for " + pathname + " received.");
  var fileContents = fs.readFileSync(pathname, 'utf8');
  //response.writeHead(200, {"Content-Type": "text/html"});
  response.write(fileContents);
  response.end();
}

http.createServer(onRequest).listen(8888);
console.log("Server has started.");
