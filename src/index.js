var gen = require('random-seed');
var express = require('express');

var random = require('./random.js');

function generateFakeData(id) {
  var rng = gen.create(id);

  return {
    user_id: id,
  };
}

function getATMsForZipcode(zipcode) {
  var atms = [];
  var json = require('../assets/atm.json');

  for (var atm of json) {
    if (atm.zipcode == zipcode) {
      atms.push(enrichWithType('atm', atm));
    }
  }

  return atms;
}

function enrichWithType(type, object) {
  object.type = type;
  return object;
}

function formatList(type, arr) {
  return {
    "type": "list." + type,
    "data": arr,
  };
}

function buildServer() {
  const app = express();

  app.use('/static', express.static('assets'));

  app.get('/atms/zipcode/:zipcode', function(req, res) {
    var atms = getATMsForZipcode(req.params.zipcode);
    var formatted = formatList('atm', atms);
    res.send(JSON.stringify(formatted));
  });

  return app;
}

module.exports = { buildServer };
