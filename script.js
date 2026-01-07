// Initialize the app to always start with the incoming call window
window.onload = function () {
  if (!sessionStorage.getItem("appLaunched")) {
    sessionStorage.setItem("appLaunched", "true");
    window.location.href = "incomingCall.html";
  }
};

// Button logic
buttonReg = {
  microphone: true,
  webcam: true,
  parts: false,
  chat: false,
  share: false,
};
function activate(id) {
  const btn = document.getElementById(id);
  const icon = document.getElementById(id + "-icon");
  if (!buttonReg[id]) {
    btn.classList.add("active");
    icon.src = `images/${id}-slash.svg`;
    icon.classList.remove("active");
    buttonReg[id] = true;
  } else {
    btn.classList.remove("active");
    icon.src = `images/${id}.svg`;
    icon.classList.add("active");
    buttonReg[id] = false;
  }
}

function endCall() {
  // Close the app (if running in a browser, redirect to a "Goodbye" page)
  console.log("Ending the call...");
  window.location.href = "goodbye.html"; // Redirect to a goodbye page
}

// Scan for DeepFake Logic
function startScan() {
  const btn = document.querySelector(".special");
  btn.style.backgroundColor = "#7a7a7aff";

  // Simulate AI delay
  setTimeout(() => {
    // Randomly decide if it's a deepfake or not for the demo
    // OR checks which video is playing if you implement video switching
    video = document.getElementById("callerVideo");
    var isDeepfake = false;
    if (video.src.split("/")[4].toString() === "video-deepfake.mp4")
      isDeepfake = true;

    var popup = document.getElementById("overlay");
    var popup_icon = document.getElementById("alert-icon");
    var popup_text = document.getElementById("alert-text");
    if (isDeepfake) {
      popup_icon.src = "images/warning.svg";
      popup_text.innerText = "DEEPFAKE DETECTED";
      popup.classList.add("visible");
      btn.style.backgroundColor = "rgba(255, 75, 75, 1)";
    } else {
      popup_icon.src = "images/shield.svg";
      popup_text.innerText = "VERIFIED REAL";
      popup.classList.add("visible");
      btn.style.backgroundColor = "rgba(35, 232, 111, 1)";
    }
  }, 2000); // 2 second delay
  setTimeout(() => {
    document.getElementById("overlay").classList.remove("visible");
    btn.style.backgroundColor = "rgba(255, 255, 255, 0.833)";
  }, 6000);
}

// Participants Logic
var isPartsShown = false;

function showHideParts() {
  activate("parts");
  if (!isPartsShown) {
    document.getElementById("participants-list").classList.add("visible");
    isPartsShown = true;
  } else {
    document.getElementById("participants-list").classList.remove("visible");
    isPartsShown = false;
  }
}

function showPerson(id) {
  const video = document.getElementById("callerVideo");
  if (id == 1) {
    video.src = "video/video-normal.mp4"; // Switch to the fake video
    video.play();
  }
  if (id == 2) {
    video.src = "video/video-deepfake.mp4"; // Switch to the fake video
    video.play();
  }
}

// Timer logic
let callStartTime;

function startCallTimer() {
  callStartTime = Date.now();
  updateCallTimer();
}

function updateCallTimer() {
  const elapsed = Date.now() - callStartTime;
  const minutes = Math.floor(elapsed / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((elapsed % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  const timerElement = document.getElementById("call-timer");
  if (timerElement) {
    timerElement.textContent = `${minutes}:${seconds}`;
  }
  requestAnimationFrame(updateCallTimer);
}

//Window switching logic
function acceptCall() {
  window.location.href = "index.html"; // Redirect to the main app
}

function denyCall() {
  window.close(); // Close the window
}

function closeApp() {
  window.location.href = "incomingCall.html";
}

function startVideo() {
  const videoElement = document.getElementById("callerVideo");
  if (videoElement) {
    videoElement.play();
  }
}

if (window.location.pathname.endsWith("index.html")) {
  startCallTimer();
  startVideo();
}
