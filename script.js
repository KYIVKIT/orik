
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let t = 0;
function animate() {
  t += 0.02;
  const w = canvas.width, h = canvas.height;
  const imgData = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const index = (y * w + x) * 4;
      const noise = 128 + 127 * Math.sin(x * 0.02 + t) * Math.cos(y * 0.02 + t);
      imgData.data[index] = noise;      // R
      imgData.data[index + 1] = noise;  // G
      imgData.data[index + 2] = noise;  // B
      imgData.data[index + 3] = 50;     // A
    }
  }
  ctx.putImageData(imgData, 0, 0);
  requestAnimationFrame(animate);
}
animate();

let current = 1;
const mask = document.getElementById("mask");
const number = document.getElementById("maskNumber");

function updateMask() {
  mask.src = `masks/${current}.png`;
  number.textContent = current;
}

function prevMask() {
  current = (current - 2 + 8) % 8 + 1;
  updateMask();
}
function nextMask() {
  current = (current % 8) + 1;
  updateMask();
}
