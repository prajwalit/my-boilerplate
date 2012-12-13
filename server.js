/* If a static server is needed */

var http = require ("http");
var fs = require ("fs");
var app = require ("connect") ();

app.use ("/static/", function (request, response) {
  var url = request.url.split ("?") [0];
  var type = url.split (".");
  type = type [type.length - 1];

  switch (type) {
  case "css":
    response.setHeader ("Content-Type", "text/css");
    break;
  case "js":
    response.setHeader ("Content-Type", "application/javascript");
    break;
  case "png":
  case "jpg":
  case "jpeg":
  case "gif":
    response.setHeader ("Content-Type", "image/" + type);
    break;
  }
  response.end (fs.readFileSync ("resources/static" + url));
});

app.use ("/", function(request, response) {
  response.setHeader ("Content-Type", "text/html");
  response.end (fs.readFileSync ("index.html"));
});

app.listen (3000);
console.log ("Cool! Now go to - http://localhost:3000");
