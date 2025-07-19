let startTime, interval;
let elapsed = 0;
let running = false;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("laps");

function formatTime(ms) {
  const date = new Date(ms);
  const min = String(date.getUTCMinutes()).padStart(2, '0');
  const sec = String(date.getUTCSeconds()).padStart(2, '0');
  const msms = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${min}:${sec}.${msms}`;
}

function updateDisplay() {
  const now = Date.now();
  const time = elapsed + (now - startTime);
  display.textContent = formatTime(time);
}

startPauseBtn.onclick = () => {
  if (!running) {
    startTime = Date.now();
    interval = setInterval(updateDisplay, 10);
    startPauseBtn.textContent = "Pause";
    running = true;
  } else {
    clearInterval(interval);
    elapsed += Date.now() - startTime;
    startPauseBtn.textContent = "Start";
    running = false;
  }
};

resetBtn.onclick = () => {
  clearInterval(interval);
  elapsed = 0;
  running = false;
  display.textContent = "00:00:00.000";
  startPauseBtn.textContent = "Start";
  lapsList.innerHTML = "";
};

lapBtn.onclick = () => {
  if (running) {
    const now = Date.now();
    const time = elapsed + (now - startTime);
    const li = document.createElement("li");
    li.textContent = `Lap ${lapsList.children.length + 1}: ${formatTime(time)}`;
    lapsList.prepend(li);
  }
};
