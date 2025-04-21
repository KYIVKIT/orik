// Количество изображений
const counts = { mask: 8, tattoo: 9, scar: 2 };
const state = { mask: 1, tattoo: 1, scar: 1 };

// Папки для каждого типа
const folderMap = { mask: 'mask', tattoo: 'tattoo', scar: 'scarce' };

// Сохранённые позиции для тату и шрамов
const savedPositions = { tattoo: {}, scar: {} };

function change(type, delta) {
  // Обновляем индекс
  const max = counts[type];
  let idx = state[type] + delta;
  if (idx < 1) idx = max;
  if (idx > max) idx = 1;
  state[type] = idx;

  // Получаем элемент и путь
  const elId = type === 'mask' ? 'baseMask' : type === 'tattoo' ? 'tattoo' : 'scar';
  const img = document.getElementById(elId);
  img.onerror = null;
  const folder = folderMap[type];

  // Пробуем загрузить файл без расширения и с расширением
  img.src = folder + '/' + idx;
  img.onerror = () => {
    img.onerror = null;
    img.src = folder + '/' + idx + '.png';
  };

  // Применяем ранее сохранённые настройки
  if (type !== 'mask') applyPosition(type);
}

function applyPosition(type) {
  const idx = state[type];
  const pos = savedPositions[type][idx];
  if (!pos) return;
  const imgId = type === 'mask' ? 'baseMask' : type === 'tattoo' ? 'tattoo' : 'scar';
  const img = document.getElementById(imgId);
  img.style.left = pos.left;
  img.style.top = pos.top;
  img.style.width = pos.width;
}

function savePosition(type) {
  const idx = state[type];
  const imgId = type === 'mask' ? 'baseMask' : type === 'tattoo' ? 'tattoo' : 'scar';
  const img = document.getElementById(imgId);
  savedPositions[type][idx] = {
    left: img.style.left,
    top: img.style.top,
    width: img.style.width
  };
  alert(type + ' #' + idx + ' сохранено');
}

document.addEventListener('DOMContentLoaded', () => {
  // Ползунки
  [['tattoo-x','tattoo','left','%'],
   ['tattoo-y','tattoo','top','%'],
   ['tattoo-scale','tattoo','width','%'],
   ['scar-x','scar','left','%'],
   ['scar-y','scar','top','%'],
   ['scar-scale','scar','width','%']]
    .forEach(([id,img,prop,unit]) => {
      document.getElementById(id)
        .addEventListener('input', e => document.getElementById(img).style[prop] = e.target.value + unit);
    });
  // Кнопки сохранения
  document.getElementById('save-tattoo').addEventListener('click', () => savePosition('tattoo'));
  document.getElementById('save-scar').addEventListener('click', () => savePosition('scar'));
});
