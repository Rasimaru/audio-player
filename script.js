
let currentSong = 0;

const audio = document.querySelector('#audio');
const progressBar = document.querySelector('.player__bar');
const songName = document.querySelector('.player__name');
const songArtist = document.querySelector('.player__artist');
const songCover = document.querySelector('.player__image');
const songTime = document.querySelector('.player__time');
const songDuration = document.querySelector('.player__duration');

const prevBtn = document.querySelector('.controls__prev');
const playBtn = document.querySelector('.controls__play');
const nextBtn = document.querySelector('.controls__next');
const volumeBtn = document.querySelector('.controls__volume');
const volumeBar = document.querySelector('.controls__volume-bar');

playBtn.addEventListener('click', ()=>{
  if(playBtn.classList.contains('_pause')){
    playBtn.classList.remove('_pause');
    audio.pause();
  } else{
    playBtn.classList.add('_pause');
    audio.play();
  }
})

volumeBtn.addEventListener('click', ()=>{
  volumeBar.classList.remove('_hidden');
})

const setSong = (i) => {
  progressBar.value = 0;
  let song = songs[i];
  currentSong = i;
  audio.src = song.path;
  songName.innerHTML = song.name;
  songArtist.innerHTML = song.artist;
  songCover.src = song.cover;

  setTimeout(() => {
    progressBar.max = audio.duration
    songDuration.innerHTML = formatTime(audio.duration);
  }, 300);
  
  setInterval(() => {
    progressBar.value = audio.currentTime;
    songTime.innerHTML = formatTime(audio.currentTime);
  }, 500);
}

setSong(0);

progressBar.addEventListener('change', ()=>{
  audio.currentTime = progressBar.value;
})

nextBtn.addEventListener('click', () => {
  if(currentSong >= songs.length - 1){
    currentSong = 0;
  } else {
    currentSong++;
  }
  setSong(currentSong);
  playBtn.classList.add('_pause');
  audio.play();
})

prevBtn.addEventListener('click', () => {
  if(currentSong <= 0){
    currentSong = songs.length - 1;
  } else {
    currentSong--;
  }
  setSong(currentSong);
  playBtn.classList.add('_pause');
  audio.play();
})










function formatTime (time){
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);

  if (min < 10) {
    min = `0` + min;
  }
  if (sec < 10){
    sec = `0` + sec;
  }
  return `${min} : ${sec}`;
}