# Address API Spec

## Add Address

Endpoint : POST /api/contacts/:contactId/adresses

Headers :

- Authorization : Token

Request Body :

```json
{
  "county": "Indonesia",
  "province": "West Java",
  "city": "Bekasi",
  "street": "Soekarno street",
  "postal_code": "1112222"
}
```

Response Success

```json
{
  "data": {
    "id": 1,
    "county": "Indonesia",
    "province": "West Java",
    "city": "Bekasi",
    "street": "Soekarno street",
    "postal_code": "1112222"
  }
}
```

Response Errors

```json
{
  "errors": "Country is required"
}
```

## Update Address

Endpoint : PUT /api/contacts/:contactId/adresses/:addressId

Headers :

- Authorization : Token

Request Body :

```json
{
  "county": "Indonesia",
  "province": "East Java",
  "city": "Malang",
  "street": "Juanda street",
  "postal_code": "12345"
}
```

Response Success

```json
{
  "data": {
    "id": 1,
    "county": "Indonesia",
    "province": "East Java",
    "city": "Malang",
    "street": "Juanda street",
    "postal_code": "12345"
  }
}
```

Response Error

```json
{
  "errors": "Country is required"
}
```

## Get Address

Endpoint : GET /api/contacts/:contactId/adresses/:addressId

Headers :

- Authorization : Token

Response Success

```json
{
  "data": {
    "id": 1,
    "county": "Indonesia",
    "province": "East Java",
    "city": "Malang",
    "street": "Juanda street",
    "postal_code": "12345"
  }
}
```

Response Error

```json
{
  "errors": "Address is not found"
}
```

## List Addresses

Endpoint : GET /api/contacts/:contactId/adresses

Headers :

- Authorization : Token

Response Success

```json
{
  "data": [
    {
      "id": 1,
      "county": "Indonesia",
      "province": "West Java",
      "city": "Bekasi",
      "street": "Soekarno street",
      "postal_code": "112233"
    },
    {
      "id": 2,
      "county": "Indonesia",
      "province": "East Java",
      "city": "Malang",
      "street": "Juanda street",
      "postal_code": "12345"
    }
  ]
}
```

Response Error

```json
{
  "errors": "Address is not found"
}
```

## Delete Address

Endpoint : DELETE /api/contacts/:contactId/adresses/:addressId

Headers :

- Authorization : Token

Response Success

```json
{
  "data": {
    "msg": "OK"
  }
}
```

Response Error

```json
{
  "errors": "Address is not found"
}
```
