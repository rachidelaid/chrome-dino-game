import { getCustomProp, setCustomProp, incrCustomProp } from './helpers.js';

const SPEED = 0.05;
const groundElms = document.querySelectorAll('.ground');

export function setupGround() {
  setCustomProp(groundElms[0], '--left', 0);
  setCustomProp(groundElms[1], '--left', 300);
}

export function updateGround(delta, speedScale) {
  groundElms.forEach((ground) => {
    incrCustomProp(ground, '--left', delta * speedScale * SPEED * -1);

    if (getCustomProp(ground, '--left') <= -300) {
      incrCustomProp(ground, '--left', 600);
    }
  });
}
