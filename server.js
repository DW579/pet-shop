var http = require('http');

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/pets', function(req, res) {
  var age = parseInt(req.body.age);
  var kind = req.body.kind;
  var name = req.body.name;

  if (!age || !kind || !name) {
    res.writeHead(400, {"Content-Type": "text/plain"});
    res.end("Bad Request");
  }
  else if(isNaN === age){
    res.writeHead(400, {"Content-Type": "text/plain"});
    res.end("Bad Request");
  }
  else {
    fs.readFile(petsPath, 'utf8', function(err, data) {
      if(err) {
        throw err;
      }
      var pets = JSON.parse(data);
      pets.push({age: age, kind: kind, name: name});

      var petsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, petsJSON, function(writeErr) {
        if (writeErr) {
          throw writeErr;
        }
      })
      res.send(petsJSON);
    })
  }
})

app.get('/pets', function(req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});
  fs.readFile(petsPath, 'utf8', function(err, data) {
    var pets = JSON.stringify(data);
    var petsParsed = JSON.parse(pets);
    res.end(petsParsed);
  })
})

app.get('/pets/:index', function(req, res) {
  var index = req.params.index;
  if(index <= 1 && index >= 0) {
    res.writeHead(200, {"Content-Type": "application/json"});
    fs.readFile(petsPath, 'utf8', function(err, data) {
      var pets = JSON.parse(data)[index];
      var petsParsed = JSON.stringify(pets);
      res.end(petsParsed);
    })
  }
  else {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.end("404: Page Not Found");
  }
})

app.get('/*', function(req, res) {
  res.status(404).send('404: Page Not Found');
})

app.listen(5000, function() {
  console.log('Starting a server on localhost:5000');
})
