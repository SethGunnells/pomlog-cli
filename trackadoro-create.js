#!/usr/bin/env node

var db = require('./db.js');
var clients = require('./db/client');
var program = require('commander');

program
    .command('client <name>')
    .alias('c')
    .action(createClient);

program
  .command('task <name>')
  .alias('t')
  .action(createTask);

program.parse(process.argv);

////////////////////////////////////////////////////////////////////////////////

function createClient(name) {
  clients.addClient(name);
}

function createTask(name) {
  console.log(`trackadoro-create task ${name}`);
  db.addTask(name);
}
