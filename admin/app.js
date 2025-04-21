
let currentTattoo = 1;
const maxTattoo = 9;
let settings = {};

function updateTattoo() {
  document.getElementById('tattoo').src = `../tattoo/${currentTattoo}.png`;
  document.getElementById('tattooLabel').innerText = `Тату ${currentTattoo}`;
  applySettings();
}

function changeTattoo(dir) {
  currentTattoo += dir;
  if (currentTattoo < 1) currentTattoo = maxTattoo;
  if (currentTattoo > maxTattoo) currentTattoo = 1;
  updateTattoo();
}

function applySettings() {
  const tattoo = document.getElementById('tattoo');
  const s = settings[currentTattoo] || { x: 0, y: 0, scale: 1, color: 'white' };
  document.getElementById('xSlider').value = s.x;
  document.getElementById('ySlider').value = s.y;
  document.getElementById('scaleSlider').value = s.scale;
  document.getElementById('colorSelect').value = s.color;
  tattoo.style.transform = `translate(${s.x}px, ${s.y}px) scale(${s.scale})`;
  tattoo.style.filter = `drop-shadow(0 0 0 ${s.color})`;
}

['xSlider', 'ySlider', 'scaleSlider', 'colorSelect'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    settings[currentTattoo] = {
      x: parseInt(document.getElementById('xSlider').value),
      y: parseInt(document.getElementById('ySlider').value),
      scale: parseFloat(document.getElementById('scaleSlider').value),
      color: document.getElementById('colorSelect').value
    };
    applySettings();
  });
});

function saveSettings() {
  const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'tattoo-settings.json';
  a.click();
}

updateTattoo();
