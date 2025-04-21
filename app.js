// Количество изображений
const counts = { mask: 8, tattoo: 9, scar: 2 };
const state  = { mask: 1, tattoo: 1, scar: 1 };

// Папки
const folderMap = { mask: 'mask', tattoo: 'tattoo', scar: 'scarce' };

// Сохранённые позиции
const saved = { tattoo: {}, scar: {} };

function change(type, delta) {
  const max = counts[type];
  let idx = state[type] + delta;
  if (idx < 1) idx = max;
  if (idx > max) idx = 1;
  state[type] = idx;
  const elId = type === 'mask' ? 'baseMask' : type === 'tattoo' ? 'tattoo' : 'scar';
  const img = document.getElementById(elId);

  // сброс onerror
  img.onerror = null;
  const folder = folderMap[type];

  // Пробуем с расширением
  img.src = folder + '/' + idx + '.png';
  img.onerror = function() {
    this.onerror = null;
    this.src = folder + '/' + idx;
    if (type !== 'mask') applyPosition(type);
  };

  if (type !== 'mask') applyPosition(type);
}

function applyPosition(type) {
  if (!saved[type]) return;
  const idx = state[type];
  const pos = saved[type][idx];
  if (!pos) return;
  const img = document.getElementById(type === 'scar' ? 'scar' : 'tattoo');
  img.style.left = pos.left;
  img.style.top = pos.top;
  img.style.width = pos.width;
}

function savePosition(type) {
  const idx = state[type];
  const imgId = type === 'scar' ? 'scar' : 'tattoo';
  const img = document.getElementById(imgId);
  saved[type][idx] = {
    left: img.style.left,
    top: img.style.top,
    width: img.style.width
  };
  alert(type + ' #' + idx + ' сохранено');
}

document.addEventListener('DOMContentLoaded', () => {
  // Привязка ползунков
  const binds = [
    ['tattoo-x','tattoo','left','%'],
    ['tattoo-y','tattoo','top','%'],
    ['tattoo-scale','tattoo','width','%'],
    ['scar-x','scar','left','%'],
    ['scar-y','scar','top','%'],
    ['scar-scale','scar','width','%']
  ];
  binds.forEach(([id, imgId, prop, unit]) => {
    document.getElementById(id).addEventListener('input', e => {
      document.getElementById(imgId).style[prop] = e.target.value + unit;
    });
  });
  // Кнопки сохранения
  document.getElementById('save-tattoo').addEventListener('click', () => savePosition('tattoo'));
  document.getElementById('save-scar').addEventListener('click', () => savePosition('scar'));
});
