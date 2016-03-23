'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var indexPets = JSON.parse(data);
    var index = process.argv[3];

    if (!isNaN(index)) {
      if (indexPets[index]) {
        console.log(indexPets[index]);
      } else {
        console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      }
      process.exit(1);
    }

    console.log(indexPets);
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
else if (cmd === 'update') {
  fs.readFile(petsPath, 'utf8', function(createErr, data) {
    if (createErr) {
      throw createErr;
    }

    var pets = JSON.parse(data);
    var index = process.argv[3];
    var age = parseInt(process.argv[4]);
    var kind = process.argv[5];
    var name = process.argv[6];

    if(!index) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }
    if(!age) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }
    if(!kind) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }
    if(!name) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }

    pets[index] = {age, kind, name};

    var petsStringify = JSON.stringify(pets);

    fs.writeFile(petsPath, petsStringify, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
    })
  })
}
else if (cmd === 'destory') {
  fs.readFile(petsPath, 'utf8', function(createErr, data) {
    if (createErr) {
      throw createErr;
    }

    var pets = JSON.parse(data);
    var index = process.argv[3];

    if(!index) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
    }

    pets[index].remove();

    var petsStringify = JSON.stringify(pets);

    fs.writeFile(petsPath, petsStringify, function(writeErr) {
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
