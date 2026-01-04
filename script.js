// Button logic
buttonReg = { microphone: false, webcam: false, parts: false };
function activate(id) {
  const btn = document.getElementById(id);
  const icon = document.getElementById(id + "-icon");
  if (!buttonReg[id]) {
    btn.classList.add("active");
    icon.src = "images/" + id + "-slash.svg";
    icon.classList.remove("active");
    buttonReg[id] = true;
  } else {
    btn.classList.remove("active");
    icon.src = "images/" + id + ".svg";
    icon.classList.add("active");
    buttonReg[id] = false;
  }
}

// Scan for DeepFake Logic
function startScan() {
  const btn = document.querySelector(".special");
  btn.innerText = "Scanning...";
  btn.style.backgroundColor = "#fbbc05"; // Yellow for processing

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
      btn.innerText = "Threat Detected";
      btn.style.backgroundColor = "red";
    } else {
      popup_icon.src = "images/shield.svg";
      popup_text.innerText = "VERIFIED REAL";
      popup.classList.add("visible");
      btn.innerText = "Verified Safe";
      btn.style.backgroundColor = "green";
    }
  }, 3000); // 3 second delay
  setTimeout(() => {
    document.getElementById("overlay").classList.remove("visible");
    btn.innerText = "🛡️ Scan Call";
    btn.style.backgroundColor = "#4285f4";
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
