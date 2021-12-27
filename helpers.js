export function getCustomProp(elem, prop) {
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}

export function setCustomProp(elem, prop, value) {
  elem.style.setProperty(prop, value);
}

export function incrCustomProp(elem, prop, inc) {
  setCustomProp(elem, prop, getCustomProp(elem, prop) + inc);
}
