
let maskIndex = 1;
let tattooIndex = 1;
const maxMasks = 8;
const maxTattoos = 9;

let tattooSettings = {};

fetch('tattoo-settings.json')
  .then(response => response.json())
  .then(data => {
    tattooSettings = data;
    applyTattooSettings();
  });

function change(type, delta) {
  if (type === 'mask') {
    maskIndex = (maskIndex + delta - 1 + maxMasks) % maxMasks + 1;
    document.getElementById('baseMask').src = `mask/${maskIndex}.png`;
  } else if (type === 'tattoo') {
    tattooIndex = (tattooIndex + delta - 1 + maxTattoos) % maxTattoos + 1;
    document.getElementById('tattoo').src = `tattoo/${tattooIndex}.png`;
    applyTattooSettings();
  }
}

function applyTattooSettings() {
  const img = document.getElementById('tattoo');
  const settings = tattooSettings[tattooIndex];
  if (settings) {
    img.style.left = settings.left;
    img.style.top = settings.top;
    img.style.width = settings.width;
    img.style.height = settings.height;
    img.style.filter = settings.filter || 'none';
  }
}
