exports.startTimer = (task) => {
  var seconds = 1500;
  return runTimer(seconds);
};

////////////////////////////////////////////////////////////////////////////////

function printTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var seconds = seconds % 60;

  process.stdout.write(`\r${pad(minutes)}:${pad(seconds)}`);
}

function pad(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

async function runTimer(startingTime) {
  printTime(startingTime);

  for (var seconds = startingTime - 1; seconds >= 0; seconds--) {
    await tick();
    printTime(seconds);
  }

  return Promise.resolve();
}

function tick() {
  return new Promise(resolve => setTimeout(() => resolve(), 5));
}
