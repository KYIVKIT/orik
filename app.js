document.addEventListener("DOMContentLoaded", () => {
  const base = {
    mask: { count: 8, current: 1, el: document.getElementById("baseMask"), folder: "mask" },
    tattoo: { count: 9, current: 1, el: document.getElementById("tattoo"), folder: "tattoo" }
  };

  function applyTattooPosition() {
    const el = document.getElementById("tattoo");
    if (el) {
      el.style.transform = "translate(0px, 0px) scale(1)";
    }
  }

  window.change = function (type, dir) {
    const item = base[type];
    if (!item) return;
    item.current += dir;
    if (item.current < 1) item.current = item.count;
    if (item.current > item.count) item.current = 1;
    item.el.src = `${item.folder}/${item.current}.png`;
    if (type === 'tattoo') applyTattooPosition();
  };

  applyTattooPosition();
});
