exports.startTimer = (task) => {
  var seconds = 1500;
  runTimer(seconds);
};

////////////////////////////////////////////////////////////////////////////////

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var seconds = seconds % 60;

  process.stdout.write(`\r${pad(minutes)}:${pad(seconds)}`);
}

function pad(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

async function runTimer(startingTime) {
  formatTime(startingTime);

  for (var seconds = startingTime - 1; seconds >= 0; seconds--) {
    await tick();
    formatTime(seconds);
  }
}

function tick() {
  return new Promise(resolve => setTimeout(() => resolve(), 1000));
}
