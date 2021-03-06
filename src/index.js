var gen = require('random-seed');
var express = require('express');

var random = require('./random.js');
var faker = require('faker');

const ACCOUNT_NUMBERS = [
  'DE89370400440532013000',
  'AT841200000687083902',
  'CR0515202001026284066',
  'FR1420041010050500013M02606',
];

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

function generateFakeUser(id) {
  faker.seed(parseInt(id));
  faker.locale = 'de';
  var firstname = faker.name.firstName();
  var lastname = faker.name.lastName();

  var rng = gen.create(id);

  var account_number = random.randomArrayValue(rng, ACCOUNT_NUMBERS);
  var giro_card_number = rng.intBetween(4242424242424242, 4848484848484848);
  var visa_card_number = rng.intBetween(4242424242424242, 4848484848484848);

  return {
    'type': 'user',
    id,
    firstname,
    lastname,
    account_number,
    giro_card_number,
    visa_card_number,
  };
}

function generateFakeTransactionHistory(id) {
  var user = generateFakeUser(id);

  faker.seed(parseInt(id));
  faker.locale = 'de';
  var rng = gen.create(id);

  var numTransactions = rng.intBetween(10, 40);
  var transactions = [];
  for (var i = 0; i < numTransactions; i++) {
    var transaction = { "type": "transaction" };

    var giro_used = random.randomBoolean(rng);
    if (giro_used) {
      transaction.card_type = "giro";
      transaction.card_number = user.giro_card_number;
    } else {
      transaction.card_type = "visa";
      transaction.card_number = user.visa_card_number;
    }

    transaction.withdrawl_at = new Date(rng.intBetween(1451606400, 1479427200) * 1000);
    transaction.withdrawl_amount = rng.intBetween(4, 42) * 5;

    transactions.push(transaction);
  }

  transactions = transactions.sort(function(a, b) {
    return new Date(a.withdrawl_at) - new Date(b.withdrawl_at);
  })

  return transactions;
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

  app.get('/users/:userid', function(req, res) {
    var user = generateFakeUser(req.params.userid);
    res.send(JSON.stringify(user));
  });

  app.get('/users/:userid/transactions', function(req, res) {
    var history = generateFakeTransactionHistory(req.params.userid);
    var formatted = formatList('transaction', history);
    res.send(JSON.stringify(formatted));
  });

  return app;
}

module.exports = { buildServer };
