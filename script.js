import { setupGround, updateGround } from './ground.js';
import { updateCactus, setupCactus, getCactusRects } from './cactus.js';

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
function update(time) {
  if (lastTime === null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }

  const delta = time - lastTime;
  speedScale += delta * SPEED_SCALE_INCREASE;

  updateGround(delta, speedScale);
  updateCactus(delta, speedScale);

  lastTime = time;
  window.requestAnimationFrame(update);
}

function handleStart() {
  lastTime = null;
  speedScale = 1;

  setupGround();
  setupCactus();

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
