document.addEventListener("DOMContentLoaded", () => {
  const base = {
    mask: { count: 8, current: 2, el: document.getElementById("baseMask"), folder: "mask" },
    tattoo: { count: 9, current: 2, el: document.getElementById("tattoo"), folder: "tattoo" }
  };

  function applyTattooPosition() {
    const el = document.getElementById("tattoo");
    if (el) {
      el.style.transform = "translate(0px, 0px) scale(1)";
    }
  }

  window.change = function (type, dir) {
    const item = base[type];
    if (!item || !item.el) return;
    item.current += dir;
    if (item.current < 2) item.current = item.count;
    if (item.current > item.count) item.current = 2; // только один файл 2.png для стабильности
    item.el.src = `${item.folder}/${item.current}.png`;
    if (type === 'tattoo') applyTattooPosition();
  };

  window.enterAdmin = function () {
    const pass = prompt("Введите пароль администратора:");
    if (pass === "12345") {
      window.location.href = "admin/index.html";
    } else {
      alert("Неверный пароль!");
    }
  };

  applyTattooPosition();
});
