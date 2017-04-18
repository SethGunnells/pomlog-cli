#!/usr/bin/env node
var program = require('commander');
var firebase = require('firebase');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBnq04uewXYu4oOiYNZ7KvsJlRMi6keFXQ",
  authDomain: "trackadoro.firebaseapp.com",
  databaseURL: "https://trackadoro.firebaseio.com",
  projectId: "trackadoro",
  storageBucket: "trackadoro.appspot.com",
  messagingSenderId: "139300037615"
};
firebase.initializeApp(config);

var db = firebase.database();

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
  db.ref('tasks').push({ name: taskName })
    .then(close);
}

function close() {
  firebase.app().delete();
}
