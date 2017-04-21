var uuid = require('uuid/v4');
var db = require('../db.js');

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
