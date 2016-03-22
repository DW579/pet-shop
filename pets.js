'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];
var sub = process.argv[3];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    if (sub === '0') {
      var pets = JSON.parse(data)[sub];
      console.log(pets);
      process.exit(1);
    }
    if (sub === '1') {
      var pets = JSON.parse(data)[sub];
      console.log(pets);
      process.exit(1);
    }
    if (sub < 0) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }
    if (sub > 1) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }

    var pets = JSON.parse(data);

    console.log(pets);
  });
}
else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    var pets = JSON.parse(data);
    var age = parseInt(process.argv[3]);
    var kind = process.argv[4];
    var name = process.argv[5];

    if (!age) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }
    if (!kind) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }
    if (!name) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }
    pets.push({age, kind, name});

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
    })
  })
}
else {
  console.error(`Usage: ${node} ${file} [read | create | update | destory]`);
  process.exit(1);
}
