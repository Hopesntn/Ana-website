const scene = document.getElementById("scene");
const bar = document.getElementById("bar");
const btn = document.getElementById("btn");
const hint = document.getElementById("hint");

let audioCtx, analyser, data;
let rafId = null;

let isLit = true;

// Tunables
const THRESHOLD = 0.22;      // how strong the blow must be (0..1)
const HOLD_MS = 220;         // blow must be above threshold for this long
const SMOOTHING = 0.85;      // analyser smoothing

let aboveSince = null;

function turnOff() {
  if (!isLit) return;
  isLit = false;
  scene.classList.add("off");
  hint.textContent = "Nice! Tap the candle to relight.";
}

function relight() {
  isLit = true;
  scene.classList.remove("off");
  hint.textContent = "Blow into the mic again.";
  aboveSince = null;
}

scene.addEventListener("click", () => {
  if (!isLit) relight();
});

btn.addEventListener("click", async () => {
  btn.disabled = true;
  btn.textContent = "Mic enabled";
  hint.textContent = "Listening… blow into the mic.";

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaStreamSource(stream);

    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = SMOOTHING;

    source.connect(analyser);
    data = new Uint8Array(analyser.fftSize);

    loop();
  } catch (err) {
    btn.disabled = false;
    btn.textContent = "Enable Microphone";
    hint.textContent = "Mic permission blocked. Use the fallback method (mouse/touch) instead.";
    console.error(err);
  }
});

function loop() {
  analyser.getByteTimeDomainData(data);

  // Compute RMS (volume)
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    const v = (data[i] - 128) / 128; // [-1, 1]
    sum += v * v;
  }
  const rms = Math.sqrt(sum / data.length); // 0..~1
  const strength = Math.min(1, rms * 3.2);  // scale to be more “responsive”

  bar.style.width = `${Math.round(strength * 100)}%`;

  // Blow detection: strength must stay above THRESHOLD for HOLD_MS
  const now = performance.now();
  if (isLit && strength > THRESHOLD) {
    if (aboveSince == null) aboveSince = now;
    if (now - aboveSince > HOLD_MS) turnOff();
  } else {
    aboveSince = null;
  }

  rafId = requestAnimationFrame(loop);
}


