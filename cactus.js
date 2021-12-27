import { getCustomProp, setCustomProp, incrCustomProp } from './helpers.js';

const worldElm = document.querySelector('.world');
const SPEED = 0.05;
const CACTUS_INTERVAL_MIN = 500;
const CACTUS_INTERVAL_MAX = 2000;

function createCactus() {
  const cactus = document.createElement('img');
  cactus.src = 'assets/cactus.png';
  cactus.classList.add('cactus');
  setCustomProp(cactus, '--left', 100);
  worldElm.append(cactus);
}

let nextCactusTime;
export function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN;
  document.querySelectorAll('.cactus').forEach((c) => c.remove());
}

export function updateCactus(delta, speedScale) {
  document.querySelectorAll('.cactus').forEach((cactus) => {
    incrCustomProp(cactus, '--left', delta * speedScale * SPEED * -1);
    if (getCustomProp(cactus, '--left') <= -100) {
      cactus.remove();
    }
  });

  if (nextCactusTime <= 0) {
    createCactus();
    nextCactusTime =
      Math.floor(
        Math.random() * (CACTUS_INTERVAL_MAX - CACTUS_INTERVAL_MIN + 1) +
          CACTUS_INTERVAL_MIN
      ) / speedScale;
  }
  nextCactusTime -= delta;
}

export function getCactusRects() {
  return [...document.querySelectorAll('.cactus')].map((c) =>
    c.getClientRects()
  );
}
