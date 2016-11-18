function randomBoolean(rng) {
  return rng.random() >= 0.5;
}

function randomAge(rng) {
  return rng.intBetween(1, 100);
}

function randomArrayValue(rng, arr) {
  const max = arr.length - 1;
  return arr[rng.intBetween(0, max)];
}

module.exports = { randomBoolean, randomAge, randomArrayValue };
