#!/usr/bin/env node
var program = require('commander');

program
  .version('0.0.1');

program.parse(process.argv);

tooFewArguments();

////////////////////////////////////////////////////////////////////////////////

function tooFewArguments() {
  console.log('You must specify an action from the following list: create');
  process.exit(1);
}
