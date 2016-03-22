var http = require('http');

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

function handleRequest(req, res) {
  if(req.url === '/pets') {
    res.writeHead(200, {"Content-Type": "application/json"});
    fs.readFile(petsPath, 'utf8', function(err, data) {
      var pets = JSON.stringify(data);
      var petsParsed = JSON.parse(pets);
      res.end(petsParsed);
    })
  }
  else if(req.url === '/pets/0') {
    res.writeHead(200, {"Content-Type": "application/json"});
    fs.readFile(petsPath, 'utf8', function(err, data) {
      var pets = JSON.parse(data)[0];
      var petsParsed = JSON.stringify(pets);
      res.end(petsParsed);
    })
  }
  else if(req.url === '/pets/1') {
    res.writeHead(200, {"Content-Type": "application/json"});
    fs.readFile(petsPath, 'utf8', function(err, data) {
      var pets = JSON.parse(data)[1];
      var petsParsed = JSON.stringify(pets);
      res.end(petsParsed);
    })
  }
  else {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.end("404: Not Found");
  }
}

server = http.createServer(handleRequest);

const port = process.env.PORT || 5000;

server.listen(port, function() {
  console.log("Listening on port 5000")
})
