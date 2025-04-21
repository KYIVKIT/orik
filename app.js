const counts = { mask: 6, tattoo: 9 };
const state = { mask: 1, tattoo: 1 };
const folderMap = { mask: 'mask', tattoo: 'tattoo' };

const tattooFixed = {
  1: { left: '55%', top: '35%', width: '40%', colorHue: 0 },
  2: { left: '50%', top: '40%', width: '45%', colorHue: 100 },
  3: { left: '48%', top: '30%', width: '38%', colorHue: 200 },
  4: { left: '60%', top: '50%', width: '42%', colorHue: 270 },
  5: { left: '40%', top: '45%', width: '35%', colorHue: 60 },
  6: { left: '45%', top: '32%', width: '50%', colorHue: 0 },
  7: { left: '53%', top: '37%', width: '40%', colorHue: 300 },
  8: { left: '52%', top: '39%', width: '43%', colorHue: 150 },
  9: { left: '57%', top: '36%', width: '41%', colorHue: 30 },
};

function change(type, delta) {
  const max = counts[type];
  let idx = state[type] + delta;
  if (idx < 1) idx = max;
  if (idx > max) idx = 1;
  state[type] = idx;

  const elId = type === 'mask' ? 'baseMask' : 'tattoo';
  const img = document.getElementById(elId);
  img.src = folderMap[type] + '/' + idx;

  if (type === 'tattoo') applyTattooPosition(idx);
}

function applyTattooPosition(idx) {
  const pos = tattooFixed[idx];
  const img = document.getElementById('tattoo');
  img.style.left = pos.left;
  img.style.top = pos.top;
  img.style.width = pos.width;
  img.style.filter = 'brightness(0) saturate(100%) sepia(100%) hue-rotate(' + pos.colorHue + 'deg)';
}

document.addEventListener('DOMContentLoaded', () => {
  applyTattooPosition(1);
});
