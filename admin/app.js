
let maskIndex = 1;
let tattooIndex = 1;
const maxMasks = 8;
const maxTattoos = 9;
let settings = {};

const baseMask = document.getElementById("baseMask");
const tattoo = document.getElementById("tattoo");

const posX = document.getElementById("posX");
const posY = document.getElementById("posY");
const scale = document.getElementById("scale");
const color = document.getElementById("color");

function change(type, dir) {
  if (type === "mask") {
    maskIndex = (maskIndex + dir + maxMasks - 1) % maxMasks + 1;
    baseMask.src = `mask/${maskIndex}.png`;
  } else if (type === "tattoo") {
    tattooIndex = (tattooIndex + dir + maxTattoos - 1) % maxTattoos + 1;
    tattoo.src = `tattoo/${tattooIndex}.png`;
    applyTattooPosition();
  }
}

function applyTattooPosition() {
  const s = settings[tattooIndex] || { x: 0, y: 0, scale: 1, color: "#ffffff" };
  tattoo.style.transform = `translate(${s.x}px, ${s.y}px) scale(${s.scale})`;
  tattoo.style.filter = `brightness(0) saturate(100%) sepia(100%) hue-rotate(${getHue(s.color)}deg)`;
  posX.value = s.x;
  posY.value = s.y;
  scale.value = s.scale;
  color.value = s.color;
}

function getHue(hex) {
  const colors = {
    "#ff0000": 0, "#ffff00": 60, "#00ff00": 120, "#00ffff": 180,
    "#0000ff": 240, "#ff00ff": 300, "#ffffff": 0
  };
  return colors[hex.toLowerCase()] ?? 0;
}

function saveSettings() {
  settings[tattooIndex] = {
    x: parseInt(posX.value),
    y: parseInt(posY.value),
    scale: parseFloat(scale.value),
    color: color.value
  };
  applyTattooPosition();
  const blob = new Blob([JSON.stringify(settings, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "tattoo_settings.json";
  a.click();
}

posX.addEventListener("input", () => applyTattooPosition());
posY.addEventListener("input", () => applyTattooPosition());
scale.addEventListener("input", () => applyTattooPosition());
color.addEventListener("input", () => applyTattooPosition());

document.addEventListener("DOMContentLoaded", () => {
  applyTattooPosition();
});
