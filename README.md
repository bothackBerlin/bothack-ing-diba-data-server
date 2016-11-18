# Data server for the ING-DiBa challenge at bothack.berlin • [![challenge](https://img.shields.io/badge/challenge-ING--DiBa--data-black.svg?colorA=424242&colorB=ffd706&style=social)][ingdiba-challenge]

[ingdiba-challenge]: https://github.com/bothackBerlin/bothack-challenges/blob/master/ing-diba/README.md#challenge

This repository provides a small server to provide you with mock data
for the [ING-DiBa data challenge][ingdiba-challenge] at bothack.berlin.

## Routes

### GET /atms/zipcode/:zipcode (Get ATM by zipcode)

Request: `GET /atms/zipcode/12524`

Response:

```
{
  "type": "list.atm",
  "data": [
    {
      "bigger_location": "Wegedorn-Zentrum",
      "zipcode": "12524",
      "city": "Berlin",
      "street": "Semmelweißstraße 105",
      "location": "Outdoor Eingangsbereich",
      "type": "atm"
    }
  ]
}
```

### GET /users/:userid (Get user and their account)

Request: `GET /users/12524`

Response:

```
{
  "type": "user",
  "id": "12524",
  "firstname": "Karolina",
  "lastname": "Schindzielorz",
  "account_number": "FR1420041010050500013M02606",
  "giro_card_number": 4266045139013584,
  "visa_card_number": 4684405558678853
}

```

### GET /users/:userid/transactions (Get transaction history of user)

Request: `GET /users/12524/transactions` (number of transactions in example truncated)

```
{
  "type": "list.transaction",
  "data": [
    {
      "type": "transaction",
      "card_type": "visa",
      "card_number": 4684405558678853,
      "withdrawl_at": "2016-01-03T03:39:12.000Z",
      "withdrawl_amount": 75
    },
    {
      "type": "transaction",
      "card_type": "visa",
      "card_number": 4684405558678853,
      "withdrawl_at": "2016-01-10T14:04:20.000Z",
      "withdrawl_amount": 45
    },
    {
      "type": "transaction",
      "card_type": "visa",
      "card_number": 4684405558678853,
      "withdrawl_at": "2016-01-20T09:36:01.000Z",
      "withdrawl_amount": 125
    }
  ]
}
```

## Starting the server

Clone this repo and run:

```bash
yarn # or your classic `npm install`
node bin/server
```
