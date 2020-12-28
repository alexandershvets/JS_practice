'use strict';

const $start = document.getElementById('start');
const $game = document.getElementById('game');
const $time = document.getElementById('time');
const $timeHeader = document.getElementById('time-header');
const $resultHeader = document.getElementById('result-header');
const $result = document.getElementById('result');
const $gameTime = document.getElementById('game-time');

let colors = ['#CB356B', '#BD3F32', '#3A1C71', '#D76D77', '#283C86', '#45A247', '#8E44AD', '#155799', '#000046', '#1CB5E0', '#2F80ED'];
let score = 0;
let isGameStarted = false;

const show = ($el) => {
  $el.classList.remove('hide');
};

const hide = ($el) => {
  $el.classList.add('hide');
};

const randomInt = (min, max) => {
  let length = max - min + 1;
  return Math.floor(Math.random() * length) + min;
};

const moveBox = (box) => {
  const boxSize = randomInt(30, 100);
  const gameSize = $game.getBoundingClientRect();
  const maxTop = gameSize.height - boxSize;
  const maxLeft = maxTop;

  box.style.top = randomInt(0, maxTop) + 'px';
  box.style.left = randomInt(0, maxLeft) + 'px';
  box.style.width = box.style.height = boxSize + 'px';
  // box.style.backgroundColor = `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
  box.style.backgroundColor = colors[randomInt(0, colors.length - 1)];
};

const renderBox = () => {
  $game.innerHTML = '';
  
  const box = document.createElement('div');

  box.style.position = 'absolute';
  box.style.cursor = 'pointer';
  box.setAttribute('data-box', 'true');
  moveBox(box);
  $game.append(box);
};

const setGameScore = () => {
  $result.textContent = score.toString();
};

const setGameTime = () => {
  const time = +$gameTime.value;

  $time.textContent = time.toFixed(1);
  $start.textContent = 'Еще раз';

  show($timeHeader);
  hide($resultHeader);
};

const endGame = () => {
  isGameStarted = false;
  setGameScore();
  $gameTime.removeAttribute('disabled');
  show($start);
  $game.innerHTML = '';
  $game.style.backgroundColor = '#ccc';
  hide($timeHeader);
  show($resultHeader);
};

const startGame = () => {
  score = 0;
  setGameTime();
  $gameTime.setAttribute('disabled', 'true');
  isGameStarted = true;
  hide($start);
  $game.style.backgroundColor = '#fff';

  const intervalId = setInterval(() => {
    let time = parseFloat($time.textContent);
    
    if (time <= 0) {
      clearInterval(intervalId);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);
  
  renderBox();
};

const handleBoxClick = (e) => {
  if (!isGameStarted) {
    return;
  }

  const target = e.target;

  if (target && target.dataset.box) {
    score++;
    renderBox();
  }
};

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);