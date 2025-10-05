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

function processFrame() {
  if (!running) return;

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  let frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = frame.data;

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];

    if (g > 100 && r < 100 && b < 100) {
      data[i + 3] = 0; // make transparent
    }
  }

  ctx.putImageData(frame, 0, 0);
  
  if (background) {
    ctx.globalCompositeOperation = "destination-over";
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";
  }

  requestAnimationFrame(processFrame);
}











