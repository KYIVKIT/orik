
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 4 + 1,
    d: Math.random() * 0.5 + 0.2
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.beginPath();
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    ctx.moveTo(p.x, p.y);
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  update();
}

function update() {
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.y -= p.d;
    if (p.y < 0) {
      p.y = canvas.height;
      p.x = Math.random() * canvas.width;
    }
  }
}

setInterval(draw, 50);

// Маски
let current = 1;
const max = 8;
const maskImg = document.getElementById("mask");

function changeMask(direction) {
  current += direction;
  if (current < 1) current = max;
  if (current > max) current = 1;
  maskImg.src = `mask/${current}.png`;
}
