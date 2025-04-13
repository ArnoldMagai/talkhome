const startBtn = document.getElementById("start-btn");
const statusText = document.getElementById("status");

const devices = {
  light: document.querySelector("#light .state"),
  door: document.querySelector("#door .state"),
  fan: document.querySelector("#fan .state"),
};

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Your browser does not support Speech Recognition API");
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;

  recognition.onstart = () => {
    statusText.textContent = "Listening... Speak a command.";
  };

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    statusText.textContent = `You said: "${command}"`;

    if (command.includes("turn on the light")) {
      devices.light.textContent = "On";
    } else if (command.includes("turn off the light")) {
      devices.light.textContent = "Off";
    } else if (command.includes("open the door")) {
      devices.door.textContent = "Open";
    } else if (command.includes("close the door")) {
      devices.door.textContent = "Closed";
    } else if (command.includes("turn on the fan")) {
      devices.fan.textContent = "On";
    } else if (command.includes("turn off the fan")) {
      devices.fan.textContent = "Off";
    } else {
      statusText.textContent = `Unknown command: "${command}"`;
    }
  };

  recognition.onerror = (e) => {
    statusText.textContent = `Error: ${e.error}`;
  };

  startBtn.onclick = () => {
    recognition.start();
  };
}
