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

// transcript

const transcriptDisplay = document.querySelector('#transcriptDisplay');
const transcript = document.querySelector('#transcript');

transcript.addEventListener('click', transcriptHandler);


function transcriptHandler() {
  if (transcriptDisplay.style.display == 'block') {
    transcriptDisplay.style.display = 'none';
  } else {
    transcriptDisplay.style.display = 'block';
    transcriptDisplay.children[1].textContent = transcripts[video.title];
  }
  



}



const transcripts = {
  batman: `every punk in this town is scared, stiff.
  They say he can't be killed.
  They say he drinks.
  Is there a six foot back in Gotham city?
  
  Nicky Vail
  Bruce Wayne
  What do you do for a living?
  
  The city without me,
  knock is about to change
  free terrorizes.
  Really get a load of
  me out there right now.
  I've got to go to work.
  I have given a name to my pain.`,
  full_house: `
(Ahhh, ahhh, ahhh, ahhh)
Whatever happened to predictability
The milkman, the paperboy, evening TV?
How did I get delivered here?
Somebody tell me, please
This old world's confusing me

With clouds as mean as you've ever seen
Ain't a bird who knows your tune.
Then a little voice inside you whispers,
"Kid don't sell your dreams, so soon."

Everywhere you look
(Everywhere you look)
There's a heart
(There's a heart)
A hand to hold onto
Everywhere you look
(Everywhere you look)
There's a face
Of somebody who needs you
Everywhere you look

When you're lost out there
and you're all alone,
A light is waiting
to carry you home.
Everywhere you look
Everywhere you look
(doop-a-dee-ba-ba-dow)

  `,
  cats_in_the_cradle: `
  My child arrived just the other day
He came to the world in the usual way
But there were planes to catch, and bills to pay
He learned to walk while I was away
And he was talking 'fore I knew it, and as he grew
He'd say "I'm gonna be like you, dad"
"You know I'm gonna be like you"
And the cat's in the cradle and the silver spoon
Little boy blue and the man in the moon
"When you coming home, dad?" "I don't know when"
But we'll get together then
You know we'll have a good time then
My son turned ten just the other day
He said, thanks for the ball, dad, come on let's play
Can you teach me to throw, I said-a, not today
I got a lot to do, he said, that's okay
And he, he walked away, but his smile never dimmed
It said, I'm gonna be like him, yeah
You know I'm gonna be like him
And the cat's in the cradle and the silver spoon
Little boy blue and the man in the moon
"When you coming home, dad?" "I don't know when"
But we'll get together then
You know we'll have a good time then
Well, he came from college just the other day
So much like a man I just had to say
Son, I'm proud of you, can you sit for a while?
He shook his head, and they said with a smile
What I'd really like, dad, is to borrow the car keys
See you later, can I have them please?
And the cat's in the cradle and the silver spoon
Little boy blue and the man in the moon
"When you coming home, son?" "I don't know when"
But we'll get together then, dad
You know we'll have a good time then
I've long since retired, my son's moved away
I called him up just the other day
I said, I'd like to see you if you don't mind
He said, I'd love to, dad, if I can find the time
You see, my new job's a hassle, and the kids have the flu
But it's sure nice talking to you, dad
It's been sure nice talking to you
And as I hung up the phone, it occurred to me
He'd grown up just like me
My boy was just like me
And the cat's in the cradle and the silver spoon
Little boy blue and the man in the moon
"When you coming home, son?" "I don't know when"
But we'll get together then, dad
We're gonna have a good time then
  `
}