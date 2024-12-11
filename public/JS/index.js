// var coll = document.getElementsByClassName("collapsible");
// var i;

// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.display === "block") {
//       content.style.display = "none";
//     } else {
//       content.style.display = "block";
//     }
//   });
// }

document.querySelectorAll('button').forEach(button => {
  button.addEventListener("mousedown", function() {
    this.classList.add("active"); 
    playSample(this.getAttribute('data-key')); 
  });

  button.addEventListener("mouseup", function() {
    this.classList.remove("active"); 
    stopSample(this.getAttribute('data-key')); 
  });

  // button.addEventListener("mouseleave", function() {
  //   this.classList.remove("active"); // In case the user drags the mouse off the button
  //   stopSample(this.getAttribute('data-key')); // Stop the sample
  // });
});

document.addEventListener("keydown", function(event) {
  playSample(event.key);
  buttonAnimation(event.key);
});

document.addEventListener("keyup", function(event) {
  stopSample(event.key);
});

const sounds = {};

function playSample(key) {
  const button = document.querySelector(`button[data-key="${key}"]`);
  if (button) {
    button.classList.add("active");
  }

  if (!sounds[key]) { 
    let sound;
    switch (key) {
      case "w":
        sound = "sounds/dubstep-kick.wav";
        break;
      case "q":
        sound = "sounds/dubstep-snare.wav";
        break;
      case "e":
        sound = "sounds/dubstep-short-hi-hat.wav";
        break;
      case "r":
        sound = "sounds/dubstep-kick-237919.wav";
        break;
      case "a":
        sound = "sounds/dubstep-saw-237922.wav";
        break;
      case "s":
        sound = "sounds/dubstep-growl-83961.wav";
        break;
      case "d":
        sound = "sounds/dubstep-soft-growl-45931.wav";
        break;
      case "f":
        sound = "sounds/dubstep-beat_150-104072.wav";
        break;
      case "z":
        sound = "sounds/dubstep-wobble-140bpm-106360.wav";
        break;
      case "x":
        sound = "sounds/neuro-bass-stab-104501.wav";
        break;
      case "c":
        sound = "sounds/dry-wobbles-one-note-47903.wav";
        break;
      case "v":
        sound = "sounds/rhythmic-noise-30775.wav";
        break;
    }

    if (sound) {
      sounds[key] = new Audio(sound);
      sounds[key].loop = true; 
      sounds[key].play();
    }
  }
}

function stopSample(key) {
  const button = document.querySelector(`button[data-key="${key}"]`);
  if (button) {
    button.classList.remove("active");
  }

  if (sounds[key]) {
    sounds[key].pause();            
    sounds[key].currentTime = 0;    
    delete sounds[key];             
  }
}
