var uuid = require('uuid/v4');
var db = require('../db');
var projects = require('./project');

exports.getTaskByName = async (name) => {
  var data = await db.loadData();

  if (tasksNotInitialized(data))
    throw `Error while retrieving task by name: Tasks not initialized`;

  var { tasks } = data;
  var taskIds = Object.keys(tasks);
  var id = taskIds.find(t => tasks[t].name === name);
  return id;
};

exports.addTask = function addTask(name, projectId) {
  return db.loadData()
    .then(data => {
      if (!data.tasks) data.tasks = {};

      var id = uuid();
      data.tasks[id] = {
        name,
        logs: [],
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

exports.logTimerCompletion = async (id) => {
  var data = await db.loadData();

  if (taskDoesNotExist(id, data))
    throw `Error while logging time: Task does not exist`;

  var task = data.tasks[id];
  var now = new Date();
  task.logs.push({
    date: now.toISOString(),
  });

  return db.writeData(data);
};

////////////////////////////////////////////////////////////////////////////////

function tasksNotInitialized(data) {
  return !data.tasks;
}

function taskDoesNotExist(id, data) {
  return tasksNotInitialized(data) || !data.tasks[id];
}
