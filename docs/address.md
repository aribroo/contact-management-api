# Address API Spec

## Add Address

Endpoint : POST /api/contacts/:contactId/adresses

Headers :

- Authorization : Token

Request Body :

```json
{
  "county": "Indonesia",
  "province": "Jawa Barat",
  "city": "Bekasi",
  "street": "Jalan Ceri",
  "postal_code": "17520"
}
```

Response Success

```json
{
  "data": {
    "id": 1,
    "county": "Indonesia",
    "province": "Jawa Barat",
    "city": "Bekasi",
    "street": "Jalan Ceri",
    "postal_code": "17520"
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
  "province": "Jawa Barat",
  "city": "Bekasi",
  "street": "Jalan Ceri",
  "postal_code": "17520"
}
```

Response Success

```json
{
  "data": {
    "id": 1,
    "county": "Indonesia",
    "province": "Jawa Barat",
    "city": "Bekasi",
    "street": "Jalan Ceri",
    "postal_code": "17520"
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
    "province": "Jawa Barat",
    "city": "Bekasi",
    "street": "Jalan Ceri",
    "postal_code": "17520"
  }
}
```

Response Error

```json
{
  "errors": "Address not found"
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
      "province": "Jawa Barat",
      "city": "Bekasi",
      "street": "Jalan Ceri",
      "postal_code": "17520"
    },
    {
      "id": 2,
      "county": "Indonesia",
      "province": "Jawa Barat",
      "city": "Bekasi",
      "street": "Jalan Ceri",
      "postal_code": "17520"
    }
  ]
}
```

Response Error

```json
{
  "errors": "Address not found"
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
  "errors": "Address not found"
}
```
