import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const onPlay = function (data) {
  //data is an object containing properties specific to that event
  localStorage.setItem('videoplayer-current-time', data.seconds);
  console.log(data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));
const currentTime = localStorage.getItem('videoplayer-current-time');
if (currentTime) {
  player.setCurrentTime(currentTime);
}
