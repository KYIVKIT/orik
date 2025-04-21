
let maskIndex = 1;
let tattooIndex = 1;
const maxMasks = 8;
const maxTattoos = 9;

function updateImages() {
  document.getElementById("mask").src = `mask/${maskIndex}.png`;
  document.getElementById("tattoo").src = `tattoo/${tattooIndex}.png`;
}

function change(type, delta) {
  if (type === "mask") {
    maskIndex = (maskIndex + delta - 1 + maxMasks) % maxMasks + 1;
  } else if (type === "tattoo") {
    tattooIndex = (tattooIndex + delta - 1 + maxTattoos) % maxTattoos + 1;
  }
  updateImages();
}

fetch("tattoo-settings.json")
  .then((res) => res.json())
  .then((settings) => {
    const tattoo = document.getElementById("tattoo");
    const s = settings[tattooIndex];
    if (s) {
      tattoo.style.left = s.x + "px";
      tattoo.style.top = s.y + "px";
      tattoo.style.transform = `scale(${s.scale})`;
      tattoo.style.filter = `brightness(${s.color === "white" ? 100 : 0}%)`;
    }
  });

document.addEventListener("DOMContentLoaded", updateImages);
