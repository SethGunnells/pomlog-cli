var fs = require('fs');
var uuid = require('uuid/v4');

const dbFilePath = './db.json';

exports.addTask = function(name) {
  return loadDbFile()
    .then(data => addTask(name, data))
    .then(writeDbFile)
    .catch(err => console.error('Error adding a task:', err));
};

exports.loadData = loadDbFile;
exports.writeData = writeDbFile;

////////////////////////////////////////////////////////////////////////////////

function addTask(name, data) {
  if (!data.tasks) data.tasks = {};

  var id = uuid();
  data.tasks[id] = {
    name: name,
  };

  return data;
}

function loadDbFile() {
  return new Promise((resolve, reject) => {

    fs.readFile(dbFilePath, (err, data) => {
      // File not found
      if (err && err.code === 'ENOENT') return resolve({});
      // Other errors
      if (err) return reject(err);

      var str = data.toString();
      data = JSON.parse(str);
      resolve(data);
    });

  });
}

function writeDbFile(data) {
  return new Promise((resolve, reject) => {

    var dataString = JSON.stringify(data);

    fs.writeFile(dbFilePath, dataString, (err) => {
      if (err) return reject(err);
      resolve();
    });

  });
}
