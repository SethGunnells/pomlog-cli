#!/usr/bin/env node
var program = require('commander');

var timer = require('./core/timer');
var db = require('./db.js');
var tasks = require('./db/task');

program
  .version('0.0.1');

program
  .command('create <type>', 'Create a task');

program
  .command('start')
  .description('Start a timer for a particular task')
  .action(startTimer);

program.parse(process.argv);

async function startTimer(name) {
  var taskId = await tasks.getTaskByName(name);
  await timer.startTimer();
  await tasks.logTimerCompletion(taskId);
}
