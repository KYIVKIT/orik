
let maskIndex = 1;
let tattooIndex = 1;
const maxMasks = 8;
const maxTattoos = 9;

const baseMask = document.getElementById("baseMask");
const tattoo = document.getElementById("tattoo");

function change(type, delta) {
  if (type === 'mask') {
    maskIndex += delta;
    if (maskIndex < 1) maskIndex = maxMasks;
    if (maskIndex > maxMasks) maskIndex = 1;
    baseMask.src = `/orik/mask/${maskIndex}.png`;
  } else if (type === 'tattoo') {
    tattooIndex += delta;
    if (tattooIndex < 1) tattooIndex = maxTattoos;
    if (tattooIndex > maxTattoos) tattooIndex = 1;
    tattoo.src = `/orik/tattoo/${tattooIndex}.png`;
    applyTattooPosition();
  }
}

function applyTattooPosition() {
  const x = document.getElementById("posX").value;
  const y = document.getElementById("posY").value;
  const scale = document.getElementById("scale").value;
  const color = document.getElementById("color").value;
  tattoo.style.left = x + "px";
  tattoo.style.top = y + "px";
  tattoo.style.width = scale + "%";
  tattoo.style.filter = `brightness(0) saturate(100%) invert(100%) sepia(100%) hue-rotate(${getHue(color)})`;
}

function getHue(color) {
  const map = {
    white: '0deg',
    red: '0deg',
    green: '90deg',
    blue: '180deg',
    yellow: '60deg',
    purple: '270deg',
    black: '0deg'
  };
  return map[color] || '0deg';
}

function saveSettings() {
  alert("Настройки тату сохранены для версии 0.011 (локально).");
}

document.getElementById("posX").addEventListener("input", applyTattooPosition);
document.getElementById("posY").addEventListener("input", applyTattooPosition);
document.getElementById("scale").addEventListener("input", applyTattooPosition);
document.getElementById("color").addEventListener("change", applyTattooPosition);
