let maskIndex = 1;
let tattooIndex = 1;
let tattooSettings = {};

function loadSettings() {
  fetch('tattoo-settings.json')
    .then(res => res.json())
    .then(data => {
      tattooSettings = data;
      updateDisplay();
    });
}

function change(type, delta) {
  if (type === 'mask') {
    maskIndex += delta;
    if (maskIndex < 1) maskIndex = 1;
    if (maskIndex > 9) maskIndex = 9;
    document.getElementById('baseMask').src = `mask/${maskIndex}.png`;
  } else if (type === 'tattoo') {
    tattooIndex += delta;
    if (tattooIndex < 1) tattooIndex = 1;
    if (tattooIndex > 9) tattooIndex = 9;
    updateDisplay();
  }
}

function updateDisplay() {
  const tattooImg = document.getElementById('tattoo');
  tattooImg.src = `tattoo/${tattooIndex}.png`;
  const s = tattooSettings[tattooIndex];
  if (s) {
    tattooImg.style.transform = `translate(${s.x}px, ${s.y}px) scale(${s.scale})`;
    tattooImg.style.filter = s.color === 'black' ? 'brightness(0)' : s.color === 'white' ? 'brightness(10)' : '';
  }
}

window.onload = loadSettings;