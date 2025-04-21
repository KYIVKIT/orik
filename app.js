
let maskIndex = 1;
let tattooIndex = 1;
const maskCount = 8;
const tattooCount = 9;

let settings = {};

fetch('tattoo-settings.json')
  .then((res) => res.json())
  .then((data) => {
    settings = data;
    applyTattooPosition();
  });

function change(type, delta) {
  if (type === 'mask') {
    maskIndex += delta;
    if (maskIndex > maskCount) maskIndex = 1;
    if (maskIndex < 1) maskIndex = maskCount;
    document.getElementById('baseMask').src = `mask/${maskIndex}.png`;
  }

  if (type === 'tattoo') {
    tattooIndex += delta;
    if (tattooIndex > tattooCount) tattooIndex = 1;
    if (tattooIndex < 1) tattooIndex = tattooCount;
    document.getElementById('tattoo').src = `tattoo/${tattooIndex}.png`;
    applyTattooPosition();
  }
}

function applyTattooPosition() {
  const tattoo = document.getElementById('tattoo');
  const set = settings[tattooIndex];
  if (!set || !tattoo) return;
  tattoo.style.transform = `translate(${set.x}px, ${set.y}px) scale(${set.scale})`;
  tattoo.style.filter = `brightness(0) saturate(100%) ${getColorFilter(set.color)}`;
}

function getColorFilter(color) {
  switch (color) {
    case 'red': return 'invert(13%) sepia(96%) saturate(7471%) hue-rotate(1deg) brightness(103%) contrast(117%)';
    case 'green': return 'invert(50%) sepia(86%) saturate(448%) hue-rotate(63deg) brightness(92%) contrast(92%)';
    case 'blue': return 'invert(18%) sepia(93%) saturate(7484%) hue-rotate(238deg) brightness(95%) contrast(115%)';
    case 'yellow': return 'invert(93%) sepia(74%) saturate(7492%) hue-rotate(359deg) brightness(99%) contrast(101%)';
    case 'cyan': return 'invert(78%) sepia(34%) saturate(621%) hue-rotate(142deg) brightness(93%) contrast(95%)';
    case 'white': return 'invert(100%)';
    default: return 'invert(100%)';
  }
}
