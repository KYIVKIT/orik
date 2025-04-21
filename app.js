
const slider = document.getElementById('maskSlider');
const maskImg = document.getElementById('maskImage');
const label = document.getElementById('maskLabel');

slider.addEventListener('input', () => {
  const index = slider.value;
  maskImg.style.opacity = 0;
  setTimeout(() => {
    maskImg.src = `mask/${index}.png`;
    label.textContent = `${index} / 8`;
    maskImg.style.opacity = 1;
  }, 300);
});
