#!/usr/bin/env node
var program = require('commander');

program
  .version('0.0.1');

program
  .command('create [type] <taskName>')
  .description('Create a new task')
  .action(createNewTask);

program.parse(process.argv);

////////////////////////////////////////////////////////////////////////////////

function createNewTask(type, taskName) {
  console.log('Create New Task Called');
  console.log(`New Level Type: ${type}`);
  console.log(`New Task Name: ${taskName}`);
}
