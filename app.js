// === PLAYLIST BEETHOVEN ===
const tracks = [
    "beethoven1.mp3",
    "beethoven2.mp3",
    "beethoven3.mp3",
    "beethoven4.mp3"
  ];
  
  let currentTrack = 0;
  let audio = new Audio(tracks[currentTrack]);
  audio.volume = 0.4;
  
  // Quando finisce una traccia → passa alla successiva
  audio.addEventListener("ended", () => {
    currentTrack = (currentTrack + 1) % tracks.length;   // rotazione 1→4
    audio.src = tracks[currentTrack];
    audio.currentTime = 0;
    audio.play();
  });
  
  // === TIMER ===
  const WORK_SECONDS = 25 * 60;
  let remaining = WORK_SECONDS;
  let intervalId = null;
  let running = false;
  
  const timeEl = document.getElementById("time");
  const btnStart = document.getElementById("start");
  const btnPause = document.getElementById("pause");
  const btnReset = document.getElementById("reset");
  const volumeSlider = document.getElementById("volume");
  
  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }
  
  function updateDisplay() {
    timeEl.textContent = formatTime(remaining);
  }
  
  // === CONTROLLI ===
  function startTimer() {
    if (running) return;
    running = true;
  
    // fai partire la playlist beethoven
    audio.play().catch(err => console.log(err));
  
    intervalId = setInterval(() => {
      remaining--;
      updateDisplay();
  
      if (remaining <= 0) {
        clearInterval(intervalId);
        running = false;
        remaining = 0;
        updateDisplay();
  
        // stop musica
        audio.pause();
        audio.currentTime = 0;
  
        alert("Session completed!");
      }
    }, 1000);
  }
  
  function pauseTimer() {
    if (!running) return;
    running = false;
    clearInterval(intervalId);
  
    audio.pause();
  }
  
  function resetTimer() {
    running = false;
    clearInterval(intervalId);
    remaining = WORK_SECONDS;
    updateDisplay();
  
    audio.pause();
    audio.currentTime = 0;
    currentTrack = 0;
    audio.src = tracks[currentTrack];
  }
  
  // === EVENTI UI ===
  btnStart.addEventListener("click", startTimer);
  btnPause.addEventListener("click", pauseTimer);
  btnReset.addEventListener("click", resetTimer);
  
  volumeSlider.addEventListener("input", () => {
    audio.volume = parseFloat(volumeSlider.value);
  });
  
  // init
  updateDisplay();
  