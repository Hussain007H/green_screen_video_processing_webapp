const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resumeBtn = document.getElementById("resume");
const bgInput = document.getElementById("backgroundInput");

let background = null;
let stream = null;
let running = false;

startBtn.onclick = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    running = true;
    processFrame();
  } catch (err) {
    alert("Error accessing webcam: " + err);
  }
};

pauseBtn.onclick = () => (running = false);
resumeBtn.onclick = () => {
  if (!running) {
    running = true;
    processFrame();
  }
};
bgInput.onchange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    if (file.type.startsWith("image")) {
      background = new Image();
      background.src = url;
    } else if (file.type.startsWith("video")) {
      background = document.createElement("video");
      background.src = url;
      background.loop = true;
      background.play();
    }
  }
};









