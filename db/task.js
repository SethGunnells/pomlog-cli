var uuid = require('uuid/v4');
var db = require('../db');
var projects = require('./project');

exports.addTask = function addTask(name, projectId) {
  return db.loadData()
    .then(data => {
      if (!data.tasks) data.tasks = {};

      var id = uuid();
      data.tasks[id] = {
        name,
        subtaskIds: [],
      };

      if (projectId) {
        data.tasks[id].projectId = projectId;
        return db.writeData(data)
          .then(() => projects.addTaskToProject(projectId, id));
      }

      return db.writeData(data);
    })
    .catch(err => console.log(`Error while creating a new task: ${err}`));
};
