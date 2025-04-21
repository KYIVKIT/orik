
let state = {
  mask: 1,
  tattoo: 1,
  maxMask: 8,
  maxTattoo: 9
};

function change(type, direction) {
  state[type] += direction;

  if (state[type] > state["max" + capitalize(type)]) {
    state[type] = 1;
  } else if (state[type] < 1) {
    state[type] = state["max" + capitalize(type)];
  }

  document.getElementById(type === "mask" ? "baseMask" : "tattoo").src =
    type + "/" + state[type] + ".png";
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
