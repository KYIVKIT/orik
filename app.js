let maskIndex = 1;
let tattooIndex = 1;
const maxMasks = 8;
const maxTattoos = 9;
let tattooSettings = {};

fetch('tattoo-settings.json')
  .then(res => res.json())
  .then(data => {
    tattooSettings = data;
    update();
  });

function update() {
  document.getElementById('baseMask').src = `mask/${maskIndex}.png`;
  document.getElementById('tattoo').src = `tattoo/${tattooIndex}.png`;

  const tattoo = document.getElementById('tattoo');
  const settings = tattooSettings[tattooIndex];
  if (settings) {
    tattoo.style.left = settings.x + '%';
    tattoo.style.top = settings.y + '%';
    tattoo.style.width = settings.size + '%';
    tattoo.style.filter = `hue-rotate(${settings.color}deg)`;
    tattoo.style.position = 'absolute';
  }
}

function change(type, delta) {
  if (type === 'mask') {
    maskIndex += delta;
    if (maskIndex < 1) maskIndex = maxMasks;
    if (maskIndex > maxMasks) maskIndex = 1;
  } else if (type === 'tattoo') {
    tattooIndex += delta;
    if (tattooIndex < 1) tattooIndex = maxTattoos;
    if (tattooIndex > maxTattoos) tattooIndex = 1;
  }
  update();
}