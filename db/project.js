var uuid = require('uuid/v4');
var db = require('../db.js');

exports.addProject = function addProject(name, clientId) {
  return db.loadData()
    .then(data => {
      if (!data.projects) data.projects = {};

      var id = uuid();
      data.projects[id] = {
        name,
        taskIds: [],
      };

      if (clientId) data.projects[id].clientId = clientId;

      return db.writeData(data);
    })
    .catch(err => console.log(`Error while creating a new project: ${err}`));
};
