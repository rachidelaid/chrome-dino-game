import { setupGround, updateGround } from './ground.js';
import { updateCactus, setupCactus, getCactusRects } from './cactus.js';
import { updateDino, setupDino, getDinoRect, setDinoLose } from './dino.js';

const worldElm = document.querySelector('.world');
const scoreElm = document.querySelector('.score');
const startScreenElm = document.querySelector('.start-screen');

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

setPixelToWorldScale();
window.addEventListener('resize', setPixelToWorldScale);
window.addEventListener('keydown', handleStart, { once: true });

let lastTime;
let speedScale;
let score;
function update(time) {
  if (lastTime === null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }

  const delta = time - lastTime;
  speedScale += delta * SPEED_SCALE_INCREASE;

  updateScore(delta);

  updateGround(delta, speedScale);
  updateCactus(delta, speedScale);
  updateDino(delta, speedScale);

  if (checkLose()) {
    setDinoLose();
    setTimeout(() => {
      startScreenElm.classList.remove('hide');
      document.addEventListener('keydown', handleStart, { once: true });
    }, 100);
    return;
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function checkLose() {
  const dinoRect = getDinoRect();
  return getCactusRects().some((rect) => isCollision(rect, dinoRect));
}

function updateScore(delta) {
  score += delta * 0.01;
  scoreElm.textContent = Math.floor(score);
}

function handleStart() {
  lastTime = null;
  speedScale = 1;
  score = 0;

  setupGround();
  setupCactus();
  setupDino();

  startScreenElm.classList.add('hide');
  window.requestAnimationFrame(update);
}

function setPixelToWorldScale() {
  let scale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    scale = window.innerWidth / WORLD_WIDTH;
  } else {
    scale = window.innerHeight / WORLD_HEIGHT;
  }

  worldElm.style.width = `${WORLD_WIDTH * scale}px`;
  worldElm.style.height = `${WORLD_HEIGHT * scale}px`;
}
