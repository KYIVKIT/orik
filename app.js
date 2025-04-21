
let maskIndex = 1;
let tattooIndex = 1;
const maxMasks = 8;
const maxTattoos = 9;
let tattooSettings = {};

fetch("tattoo-settings.json")
  .then(response => response.json())
  .then(data => {
    tattooSettings = data;
    applyTattooSettings();
  });

function change(type, delta) {
  if (type === "mask") {
    maskIndex = (maskIndex + delta + maxMasks - 1) % maxMasks + 1;
    document.getElementById("baseMask").src = `mask/${maskIndex}.png`;
  } else if (type === "tattoo") {
    tattooIndex = (tattooIndex + delta + maxTattoos - 1) % maxTattoos + 1;
    document.getElementById("tattoo").src = `tattoo/${tattooIndex}.png`;
    applyTattooSettings();
  }
}

function applyTattooSettings() {
  const tattoo = document.getElementById("tattoo");
  const setting = tattooSettings[tattooIndex];
  if (!setting) return;
  tattoo.style.top = setting.top;
  tattoo.style.left = setting.left;
  tattoo.style.width = setting.width;
  tattoo.style.filter = setting.filter;
}
