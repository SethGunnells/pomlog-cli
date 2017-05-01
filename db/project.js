var uuid = require('uuid/v4');
var db = require('../db.js');
var clients = require('./client');

exports.getProjectByName = function getProjectByName(name) {
  return db.loadData()
    .then(({ projects }) => {
      if (!projects) return;

      var ids = Object.keys(projects);
      return ids.find(id => projects[id].name === name);
    });
};

exports.addTaskToProject = function addTaskToProject(projectId, taskId) {
  return db.loadData()
    .then(data => {
      if (!data.projects || !data.projects[projectId])
        throw `No project with ID ${projectId} exists`;

      data.projects[projectId].taskIds.push(taskId);

      return db.writeData(data);
    });
};

exports.addProject = function addProject(name, clientId) {
  return db.loadData()
    .then(data => {
      if (!data.projects) data.projects = {};

      var id = uuid();
      data.projects[id] = {
        name,
        taskIds: [],
      };

      if (clientId) {
        data.projects[id].clientId = clientId;
        return db.writeData(data)
          .then(() => clients.addProjectToClient(clientId, id));
      }

      return db.writeData(data);
    })
    .catch(err => console.log(`Error while creating a new project: ${err}`));
};
