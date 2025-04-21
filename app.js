
let current = { mask: 1, tattoo: 1 };
let total = { mask: 8, tattoo: 9 };
let tattooPositions = {};

async function loadTattooSettings() {
  try {
    const res = await fetch("tattoo-settings.json");
    tattooPositions = await res.json();
  } catch {
    tattooPositions = {};
  }
}

function change(type, delta) {
  current[type] += delta;
  const max = total[type];
  if (current[type] > max) current[type] = 1;
  if (current[type] < 1) current[type] = max;

  const el = document.getElementById(type === "mask" ? "baseMask" : "tattoo");
  el.src = `${type}/${current[type]}.png`;

  if (type === "tattoo") applyTattooSettings();
}

function applyTattooSettings() {
  const id = current.tattoo;
  const el = document.getElementById("tattoo");
  const set = tattooPositions[id];
  if (!el || !set) return;

  el.style.position = "absolute";
  el.style.left = (set.x || 0) + "px";
  el.style.top = (set.y || 0) + "px";
  el.style.width = (set.size || 100) + "%";
  el.style.filter = set.color ? `hue-rotate(${set.color}deg)` : "none";
}

window.onload = async () => {
  await loadTattooSettings();
  applyTattooSettings();
};
