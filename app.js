
let currentMaskIndex = 0;
let currentTattooIndex = 0;
const totalMaskCount = 8;
const totalTattooCount = 9;

let tattooSettings = {};

fetch("tattoo-settings.json")
  .then(res => res.json())
  .then(data => {
    tattooSettings = data;
    applyTattooPosition(currentTattooIndex + 1);
  });

function change(type, dir) {
  if (type === "mask") {
    currentMaskIndex = (currentMaskIndex + dir + totalMaskCount) % totalMaskCount;
    document.getElementById("baseMask").src = `mask/${currentMaskIndex + 1}.png`;
  } else if (type === "tattoo") {
    currentTattooIndex = (currentTattooIndex + dir + totalTattooCount) % totalTattooCount;
    document.getElementById("tattoo").src = `tattoo/${currentTattooIndex + 1}.png`;
    applyTattooPosition(currentTattooIndex + 1);
  }
}

function applyTattooPosition(index) {
  const tattoo = document.getElementById("tattoo");
  const settings = tattooSettings[index];

  if (!tattoo || !settings) {
    console.warn("Нет настроек для татуировки", index);
    return;
  }

  tattoo.style.position = "absolute";
  tattoo.style.left = settings.left + "px";
  tattoo.style.top = settings.top + "px";
  tattoo.style.transform = `scale(${settings.scale})`;
  tattoo.style.filter = `hue-rotate(${settings.color}deg)`;
}
