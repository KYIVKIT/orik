// Количество изображений в папках
const counts = { mask: 8, tattoo: 9, scar: 2 };
const state  = { mask: 1, tattoo: 1, scar: 1 };

// Мэппинг папок
const folderMap = {
  mask:   'mask',
  tattoo: 'tattoo',
  scar:   'scarce'
};

function change(type, delta) {
  const max = counts[type];
  let idx = state[type] + delta;
  if (idx < 1) idx = max;
  if (idx > max) idx = 1;
  state[type] = idx;

  const elId = type === 'mask' ? 'baseMask' : type === 'tattoo' ? 'tattoo' : 'scar';
  const folder = folderMap[type];
  document.getElementById(elId).src = `${folder}/${idx}.png`;
}
