
let currentMask = 1;
let currentTattoo = 1;
let maxMasks = 8;
let maxTattoos = 9;
let settings = {};

// Загрузка настроек татуировок
fetch('tattoo-settings.json')
  .then(response => response.json())
  .then(data => {
    settings = data;
    loadImages();
  });

function loadImages() {
  document.getElementById("mask").src = `mask/${currentMask}.png`;
  document.getElementById("tattoo").src = `tattoo/${currentTattoo}.png`;
  applyTattooPosition();
}

function applyTattooPosition() {
  const tattoo = document.getElementById("tattoo");
  const config = settings[currentTattoo];
  if (!config) return;
  tattoo.style.position = "absolute";
  tattoo.style.left = `calc(50% + ${config.x}px)`;
  tattoo.style.top = `calc(50% + ${config.y}px)`;
  tattoo.style.transform = `translate(-50%, -50%) scale(${config.scale})`;
  tattoo.style.filter = `brightness(0) saturate(100%) ${getColorFilter(config.color)}`;
}

function getColorFilter(color) {
  switch (color) {
    case "white": return "invert(1)";
    case "red": return "invert(17%) sepia(96%) saturate(7469%) hue-rotate(1deg) brightness(104%) contrast(110%)";
    case "blue": return "invert(27%) sepia(92%) saturate(747%) hue-rotate(175deg) brightness(91%) contrast(90%)";
    case "green": return "invert(58%) sepia(96%) saturate(339%) hue-rotate(71deg) brightness(91%) contrast(86%)";
    case "yellow": return "invert(88%) sepia(27%) saturate(749%) hue-rotate(359deg) brightness(90%) contrast(86%)";
    default: return "invert(0)";
  }
}

function change(type, delta) {
  if (type === 'mask') {
    currentMask = ((currentMask - 1 + delta + maxMasks) % maxMasks) + 1;
  } else if (type === 'tattoo') {
    currentTattoo = ((currentTattoo - 1 + delta + maxTattoos) % maxTattoos) + 1;
  }
  loadImages();
}
