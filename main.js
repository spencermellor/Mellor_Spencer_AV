const playPause = document.querySelector('#play-pause');
const duration = document.querySelector('#duration');
const volume = document.querySelector('#volume');
const fullscreen = document.querySelector('#fullscreen');
const speed = document.querySelector('#speed');

const audioIndicator = document.querySelector('#audio');


const video = document.querySelector('video');
const videoplayer = document.querySelector('#videoplayer');

if (video.src.includes('.mp3') || video.src.includes('.wav')) {
  audioIndicator.style.display = 'block';
}

// click the video to play or pause

video.addEventListener('click', playPauseHandler);
// Play and pause 
playPause.addEventListener('click', playPauseHandler);

function playPauseHandler() {
  console.log('play or pause')
  if (video.paused) {
    video.play();
    playPause.textContent = "Pause";
  }  else {
    video.pause();
    playPause.textContent = "Play";
  }
}

// duration
duration.addEventListener('input', durationHandler);

function durationHandler() {
  console.log(duration.value);
  // set the new time
  video.currentTime = (duration.value/100) * video.duration;
}

// volume
volume.addEventListener('input', volumeHandler);

function volumeHandler() {
  console.log(volume.value);
  // set the new volume
  video.volume = volume.value/100;
}

// fullscreen
fullscreen.addEventListener('click', fullscreenHandler);

function fullscreenHandler() {
  console.log('toggling fullscreen')

  // if its not fullscreen
  if (!window.fullScreen) {
    if (videoplayer.requestFullscreen) {
      videoplayer.requestFullscreen();
    } else if (videoplayer.webkitRequestFullscreen) {
      videoplayer.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

}

// speed value toggles every 0.25 seconds
speed.addEventListener('click', speedHandler);

function speedHandler() {
  console.log('speed toggle')

  // get value
  let val = video.playbackRate + 0.25;
  if (val > 2) {
    val = 0.25;
  }
  video.playbackRate = val;

  // speed set on button text
  speed.textContent = 'Speed (' + val + 'x)'

}

// loop to update video length
function loopDurationUpdate() {
  duration.value = Math.round((video.currentTime/video.duration)*100);
  setTimeout(() => {
    // run it again to loop forever
    loopDurationUpdate();
  }, 1000);
}

loopDurationUpdate()