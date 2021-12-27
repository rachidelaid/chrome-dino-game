const worldElm = document.querySelector('.world');
const scoreElm = document.querySelector('.score');

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;

setPixelToWorldScale();
window.addEventListener('resize', setPixelToWorldScale);
window.addEventListener('keydown', handleStart, { once: true });

let lastTime;
function update(time) {
  if (lastTime === null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }

  const delta = time - lastTime;
  console.log(delta);

  lastTime = time;
  window.requestAnimationFrame(update);
}

function handleStart() {
  lastTime = null;

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
