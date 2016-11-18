var gen = require('random-seed');
var express = require('express');

function generateFakeData(id) {
  var rng = gen.create(id);

  return {
    user_id: id,
  };
}

function randomBoolean(rng) {
  return rng.random() >= 0.5;
}

function randomAge(rng) {
  return rng.intBetween(1, 100);
}

function randomLastLogin(rng) {
  return rng.intBetween(0, 300);
}

function randomArrayValue(rng, arr) {
  const max = arr.length - 1;
  return arr[rng.intBetween(0, max)];
}

function buildServer() {
  const app = express();

  app.use('/static', express.static('assets'));

  // app.get('/users/:id', function(req, res) {
  //   var fakeUser = generateFakeData(req.params.id);
  //   res.send(JSON.stringify(fakeUser));
  // });

  return app;
}

module.exports = { buildServer };
