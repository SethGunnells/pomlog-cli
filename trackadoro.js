#!/usr/bin/env node
var program = require('commander');

var timer = require('./core/timer');

program
  .version('0.0.1');

program
  .command('create <type>', 'Create a task');

program
  .command('start')
  .action(startTimer);

program.parse(process.argv);

function startTimer() {
  timer.startTimer();
}
