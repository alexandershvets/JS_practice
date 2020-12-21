import { radioPlayerInit } from './radioPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';
import { videoPlauerInit } from './videoPlayer.js';

const playerBtn = document.querySelectorAll('.player-btn'),
  playerBlock = document.querySelectorAll('.player-block'),
  temp = document.querySelector('.temp');

const deactiovationPlayer = () => {
  temp.style.display = 'none';
  playerBtn.forEach(item => item.classList.remove('active'));
  playerBlock.forEach(item => item.classList.remove('active'));
};

playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
  deactiovationPlayer();
  btn.classList.add('active');
  playerBlock[i].classList.add('active');
}));