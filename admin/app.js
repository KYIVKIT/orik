document.addEventListener("DOMContentLoaded", () => {
  const state = {
    mask: { count: 8, current: 1, el: document.getElementById("baseMask"), folder: "../mask" },
    tattoo: { count: 9, current: 1, el: document.getElementById("tattoo"), folder: "../tattoo" },
    transform: { x: 0, y: 0, scale: 1 }
  };

  function updateTransform() {
    const el = document.getElementById("tattoo");
    if (!el) return;
    const x = document.getElementById("posX").value;
    const y = document.getElementById("posY").value;
    const s = document.getElementById("scale").value;
    el.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
  }

  window.change = function (type, dir) {
    const item = state[type];
    if (!item) return;
    item.current += dir;
    if (item.current < 1) item.current = item.count;
    if (item.current > item.count) item.current = 1;
    item.el.src = `${item.folder}/${item.current}.png`;
    updateTransform();
  };

  updateTransform();
});
