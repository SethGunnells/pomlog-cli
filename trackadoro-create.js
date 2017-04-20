#!/usr/bin/env node

var db = require('./db.js');
var program = require('commander');

program
    .command('task <name>').alias('t').action(createTask);

program.parse(process.argv);

////////////////////////////////////////////////////////////////////////////////

function createTask(name) {
  console.log(`trackadoro-create task ${name}`);
  db.addTask(name)
    .then(() => console.log('SUCCESS'));
}
