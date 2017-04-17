#!/usr/bin/env node
var program = require('commander');

program
  .version('0.0.1');

program
  .command('create <taskName>')
  .description('Create a new task')
  .action(createNewTask);

program.parse(process.argv);

tooFewArguments();

////////////////////////////////////////////////////////////////////////////////

function createNewTask(taskName) {
  console.log('Create New Task Called');
  console.log(`New Task Name: ${JSON.stringify(taskName)}`);
}

function tooFewArguments() {
  console.log('You must specify an action from the following list: create');
  process.exit(1);
}
