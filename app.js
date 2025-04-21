
let state = {
  mask: 1,
  tattoo: 1,
  maxMask: 8,
  maxTattoo: 9,
};

function change(type, dir) {
  state[type] += dir;
  const max = state[type === "mask" ? "maxMask" : "maxTattoo"];
  if (state[type] > max) state[type] = 1;
  if (state[type] < 1) state[type] = max;
  document.getElementById(type === "mask" ? "baseMask" : "tattoo").src = type + "/" + state[type] + ".png";
}
