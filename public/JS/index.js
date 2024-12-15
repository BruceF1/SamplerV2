// Function to handle mouse down event on buttons
function handleMouseDown() {
  this.classList.add("active"); 
  playSample(this.getAttribute('data-key'));
}

// Function to handle mouse up event on buttons
function handleMouseUp() {
  this.classList.remove("active"); 
  stopSample(this.getAttribute('data-key'));
}

// Add mouse event listeners to buttons
document.querySelectorAll('button').forEach(button => {
  button.addEventListener("mousedown", handleMouseDown);
  button.addEventListener("mouseup", handleMouseUp);
  // button.addEventListener("mouseleave", () => stopSample(button.getAttribute('data-key')));
});

// Keyboard event listeners for keydown and keyup
document.addEventListener("keydown", event => {
  playSample(event.key);
  buttonAnimation(event.key);  // Assuming this function exists elsewhere
});

document.addEventListener("keyup", event => {
  stopSample(event.key);
});

// Object to store loaded sound files
const sounds = {};

// Function to play a sound sample based on a key
function playSample(key) {
  const button = document.querySelector(`button[data-key="${key}"]`);
  if (button) button.classList.add("active");  // Add active class to the button

  if (!sounds[key]) {  // Check if the sound has already been loaded
    const sound = getSoundFile(key);
    if (sound) {
      sounds[key] = new Audio(sound);
      sounds[key].loop = true;  // Loop the sound
      sounds[key].play();
    }
  }
}

// Function to get the sound file corresponding to the key
function getSoundFile(key) {
  const soundMap = {
    "w": "sounds/dubstep-kick.wav",
    "q": "sounds/dubstep-snare.wav",
    "e": "sounds/dubstep-short-hi-hat.wav",
    "r": "sounds/dubstep-kick-237919.wav",
    "a": "sounds/dubstep-saw-237922.wav",
    "s": "sounds/dubstep-growl-83961.wav",
    "d": "sounds/dubstep-soft-growl-45931.wav",
    "f": "sounds/dubstep-beat_150-104072.wav",
    "z": "sounds/dubstep-wobble-140bpm-106360.wav",
    "x": "sounds/neuro-bass-stab-104501.wav",
    "c": "sounds/dry-wobbles-one-note-47903.wav",
    "v": "sounds/rhythmic-noise-30775.wav"
  };
  
  return soundMap[key] || null;  // Return the corresponding sound file or null if key isn't mapped
}

// Function to stop the sound sample for a key
function stopSample(key) {
  const button = document.querySelector(`button[data-key="${key}"]`);
  if (button) button.classList.remove("active");  // Remove active class

  if (sounds[key]) {
    sounds[key].pause();  // Pause the sound
    sounds[key].currentTime = 0;  // Reset the sound to the beginning
    delete sounds[key];  // Remove the sound from memory
  }
}


//VolumeKnob
var knob = document.querySelector("#knob1 .knob-indicator-container");
var ring = document.querySelector("#knob1 .ring-fill");

knob.onpointerdown = OnPointerDown;

var startY = 0;
var currentY = 0;
var lastRot = 140;

var maxRot = 140;
var speed = 1.5;

function OnPointerDown(event)
{
  document.addEventListener('pointermove', OnPointerMove);
  document.addEventListener('pointerup', OnPointerUp);
  
  startY = event.clientY;
}

function OnPointerMove(event)
{
  delta = startY - event.clientY;
  
  currentY = lastRot + delta * speed;
  
  if(currentY > maxRot)

    currentY = maxRot;
  
  if(currentY < -maxRot)

    currentY = -maxRot;
  
  knob.style.transform = "rotate(" + currentY + "deg)";
  
  if(currentY > 0)
    ring.style.background = "conic-gradient(var(--accent) " + currentY + "deg, rgba(255,255,255,0.0) 0 360deg, var(--accent) 0deg)";
  
  else
    ring.style.background = "conic-gradient(var(--accent) 0deg, rgba(255,255,255,0.0) 0 " + (360 + currentY) + "deg, var(--accent) 0deg)";
}

function OnPointerUp(event)
{
  lastRot = currentY;
  
  document.removeEventListener('pointermove', OnPointerMove);
  document.removeEventListener('pointerup', OnPointerUp);
}
s
