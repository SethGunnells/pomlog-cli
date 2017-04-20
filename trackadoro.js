#!/usr/bin/env node
var program = require('commander');

program
  .version('0.0.1');

program
  .command('create <type>', 'Create a task');

program.parse(process.argv);
