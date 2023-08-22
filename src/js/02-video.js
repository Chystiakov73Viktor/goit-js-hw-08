import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const VAULT_KEY = 'videoplayer-current-time';

const onVideo = function (data) {
  const currentTime = JSON.stringify(data.seconds);
  localStorage.setItem(VAULT_KEY, currentTime);
};

player.on('timeupdate', throttle(onVideo, 1000));

const actualTime = JSON.parse(localStorage.getItem(VAULT_KEY));
player.setCurrentTime(actualTime);
