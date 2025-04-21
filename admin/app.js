document.addEventListener("DOMContentLoaded", () => {
  const base = {
    mask: { count: 8, current: 2, el: document.getElementById("baseMask"), folder: "../mask" },
    tattoo: { count: 9, current: 2, el: document.getElementById("tattoo"), folder: "../tattoo" }
  };

  const tattooImg = document.getElementById("tattoo");
  const posX = document.getElementById("posX");
  const posY = document.getElementById("posY");
  const scale = document.getElementById("scale");

  function applyTattooPosition() {
    if (tattooImg) {
      const x = parseInt(posX.value, 10);
      const y = parseInt(posY.value, 10);
      const s = parseFloat(scale.value);
      tattooImg.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
    }
  }

  window.change = function (type, dir) {
    const item = base[type];
    if (!item || !item.el) return;
    item.current += dir;
    if (item.current < 2) item.current = item.count;
    if (item.current > item.count) item.current = 2;
    item.el.src = `${item.folder}/${item.current}.png`;
    applyTattooPosition();
  };

  [posX, posY, scale].forEach(el => el.addEventListener("input", applyTattooPosition));

  applyTattooPosition();
});
