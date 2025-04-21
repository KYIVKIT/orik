// Counts and state
const counts = { mask: 7, tattoo: 9, scar: 2 };
const state = { mask: 1, tattoo: 1, scar: 1 };

// Folder mapping
const folderMap = { mask: 'mask', tattoo: 'tattoo', scar: 'scarce' };

// Saved positions
const savedPositions = { tattoo: {}, scar: {} };
const tattooLocked = {};

// Change function
function change(type, delta) {
  const max = counts[type];
  let idx = state[type] + delta;
  if (idx < 1) idx = max;
  if (idx > max) idx = 1;
  state[type] = idx;
  const elId = type === 'mask' ? 'baseMask' : type === 'tattoo' ? 'tattoo' : 'scar';
  const img = document.getElementById(elId);
  img.src = folderMap[type] + '/' + idx;
  applyPosition(type);
}

// Apply saved position
function applyPosition(type) {
  if (type === 'mask') return;
  const idx = state[type];
  const pos = savedPositions[type][idx];
  if (!pos) return;
  const elId = type === 'tattoo' ? 'tattoo' : 'scar';
  const img = document.getElementById(elId);
  img.style.left = pos.left;
  img.style.top = pos.top;
  img.style.width = pos.width;
  img.style.filter = `brightness(0) saturate(100%) sepia(100%) hue-rotate(${pos.colorHue || 0}deg)`;
}

// Save current position
function savePosition(type) {
  const idx = state[type];
  const elId = type === 'tattoo' ? 'tattoo' : 'scar';
  const img = document.getElementById(elId);
  savedPositions[type][idx] = {
    left: img.style.left,
    top: img.style.top,
    width: img.style.width
  };
  if (type === 'tattoo') {
    const color = document.getElementById('tattoo-color').value;
    const hueMap = {
      white: 0, black: 0, red: 0, blue: 200,
      green: 100, yellow: 60, purple: 270
    };
    savedPositions[type][idx].colorHue = hueMap[color] || 0;
    tattooLocked[idx] = true;
  }
  alert(type + ' #' + idx + ' сохранено');
}

// DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Bind sliders
  [['tattoo-x','tattoo','left','%'],
   ['tattoo-y','tattoo','top','%'],
   ['tattoo-scale','tattoo','width','%'],
   ['scar-x','scar','left','%'],
   ['scar-y','scar','top','%'],
   ['scar-scale','scar','width','%']]
  .forEach(([id,img,prop,unit]) => {
    document.getElementById(id).addEventListener('input', e => {
      document.getElementById(img).style[prop] = e.target.value + unit;
    });
  });

  // Bind save buttons
  document.getElementById('save-tattoo').addEventListener('click', () => savePosition('tattoo'));
  document.getElementById('save-scar').addEventListener('click', () => savePosition('scar'));
});
