'use strict';

var http = require('http');

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var express = require('express');
var app = express();

var petsData;

fs.readFile(petsPath, 'utf8', function(err, data) {
  petsData = JSON.parse(data);
});

app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);

var morgan = require('morgan');
app.use(morgan('short'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/pets', function(req, res) {
  res.send(petsData);
})

app.get('/pets/:index', function(req, res) {
  var index = Number.parseInt(req.params.index);

  if(Number.isNaN(index) || index < 0 || index >= petsData.length) {
    return res.sendStatus(404);
  }

  res.send(petsData[index]);
})

app.post('/pets', function(req, res) {
  var age = parseInt(req.body.age);
  var kind = req.body.kind;
  var name = req.body.name;

  if (!age || !kind || !name) {
    return res.sendStatus(400);
  }
  else if(isNaN === age){
    return res.sendStatus(400);
  }
  else {
    petsData.push({age, kind, name});

    var petsJSON = JSON.stringify(petsData);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
    })

    res.send({age, kind, name});
  }
})

app.put('/pets/:index', function(req, res) {
  var index = Number.parseInt(req.params.index);

  if(Number.isNaN(index) || index < 0 || index >= petsData.length) {
    return res.sendStatus(404);
  }

  var age = parseInt(req.body.age);
  var kind = req.body.kind;
  var name = req.body.name;

  if (!age || !kind || !name) {
    return res.sendStatus(400);
  }

  petsData[index] = {age, kind, name};

  var petsJSON = JSON.stringify(petsData);

  fs.writeFile(petsPath, petsJSON, function(writeErr) {
    if (writeErr) {
      throw writeErr;
    }
  })

  res.send({age, kind, name});
})

app.delete('/pets/:index', function(req, res) {
  var index = Number.parseInt(req.params.index);

  if(Number.isNaN(index) || index < 0 || index >= petsData.length) {
    return res.sendStatus(404);
  }

  var petDelete = petsData.splice(index, 1);

  var petsJSON = JSON.stringify(petsData);

  fs.writeFile(petsPath, petsJSON, function(writeErr) {
    if (writeErr) {
      throw writeErr;
    }
  })
  res.send(petDelete);
})


app.get('/*', function(req, res) {
  res.status(404).send('404: Page Not Found');
})

app.listen(app.get('port'), function() {
  console.log('Listening on', app.get('port'));
});
