
let maskIndex = 1;
let tattooIndex = 1;

const baseMask = document.getElementById("baseMask");
const tattoo = document.getElementById("tattoo");

function change(type, delta) {
  if (type === 'mask') {
    maskIndex += delta;
    baseMask.src = `/orik/mask/${maskIndex}.png`;
  } else if (type === 'tattoo') {
    tattooIndex += delta;
    tattoo.src = `/orik/tattoo/${tattooIndex}.png`;
    applyTattooPosition();
  }
}

function applyTattooPosition() {
  const x = document.getElementById("posX").value;
  const y = document.getElementById("posY").value;
  const scale = document.getElementById("scale").value;
  tattoo.style.left = x + "px";
  tattoo.style.top = y + "px";
  tattoo.style.width = scale + "%";
}

document.getElementById("posX").addEventListener("input", applyTattooPosition);
document.getElementById("posY").addEventListener("input", applyTattooPosition);
document.getElementById("scale").addEventListener("input", applyTattooPosition);

function saveSettings() {
  alert("Настройки сохранены (имитация)!");
}
