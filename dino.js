import { getCustomProp, setCustomProp, incrCustomProp } from './helpers.js';

const dinoElm = document.querySelector('.dino');
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity;
export function setupDino() {
  isJumping = false;
  dinoFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  setCustomProp(dinoElm, '--bottom', 0);
  document.removeEventListener('keydown', onJump);
  document.addEventListener('keydown', onJump);
}

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}

export function setDinoLose() {
  dinoElm.src = 'assets/dino-lose.png';
}

export function getDinoRect() {
  return dinoElm.getBoundingClientRect();
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElm.src = `assets/dino-stationary.png`;
    return;
  }

  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
    dinoElm.src = `assets/dino-run-${dinoFrame}.png`;
    currentFrameTime -= FRAME_TIME;
  }
  currentFrameTime += delta * speedScale;
}

function onJump(e) {
  if (e.code !== 'Space' || isJumping) return;

  yVelocity = JUMP_SPEED;
  isJumping = true;
}

function handleJump(delta) {
  if (!isJumping) return;

  incrCustomProp(dinoElm, '--bottom', yVelocity * delta);

  if (getCustomProp(dinoElm, '--bottom') <= 0) {
    setCustomProp(dinoElm, '--bottom', 0);
    isJumping = false;
  }

  yVelocity -= GRAVITY * delta;
}
