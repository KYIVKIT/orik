// Настройки количества файлов
const counts = {
  mask:   7,
  tattoo: 9,
  scar:   2
};

// Базовый URL для raw.githubusercontent
const BASE = "https://raw.githubusercontent.com/KYIVKIT/orik/main";

// Текущие индексы (1…N)
const state = { mask: 1, tattoo: 1, scar: 1 };

function change(type, delta) {
  const max = counts[type];
  let idx = state[type] + delta;
  if (idx < 1)    idx = max;
  if (idx > max)  idx = 1;
  state[type] = idx;

  const el = document.getElementById(
    type === 'scar' ? 'scar' :
    type === 'mask' ? 'baseMask' :
    'tattoo'
  );
  const folder = type === 'mask' ? 'mask' :
                 type === 'tattoo' ? 'tattoo' : 'scarce';
  const fileBase = type === 'mask' ? 'mask' :
                   type === 'tattoo' ? 'tattoo' : 'scarce';

  el.src = `${BASE}/${folder}/${fileBase}(${idx}).png`;
}
