var uuid = require('uuid/v4');
var db = require('../db.js');

exports.getClientByName = function getClientByName(name) {
  return db.loadData()
    .then(({ clients }) => {
      if (!clients) return;

      var ids = Object.keys(clients);
      return ids.find(id => clients[id].name === name);
    });
};

exports.addProjectToClient = function addProjectToClient(clientId, projectId) {
  return db.loadData()
    .then(data => {
      if (!data.clients || !data.clients[clientId])
        throw `No client with ID ${clientId} exists`;

      data.clients[clientId].projectIds.push(projectId);

      return db.writeData(data);
    });
};

exports.addClient = function addClient(name) {
  return db.loadData()
    .then(data => {
      if (!data.clients) data.clients = {};

      var id = uuid();
      data.clients[id] = {
        name,
        projectIds: [],
      };

      return db.writeData(data);
    })
    .catch(err => console.log(`Error while creating a new client: ${err}`));
};
