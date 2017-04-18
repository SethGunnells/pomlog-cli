#!/usr/bin/env node
var program = require('commander');

program
  .version('0.0.1');

program
  .command('create <taskName>')
  .description('Create a new task')
  .action(createNewTask);

program.parse(process.argv);

////////////////////////////////////////////////////////////////////////////////

function createNewTask(taskName) {
  console.log('Create New Task Called');
  console.log(`New Task Name: ${taskName}`);
}
