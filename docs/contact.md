# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Headers :

- Autorization : Token

Request Body :

```json
{
  "fist_name": "Rifki",
  "last_name": "Ari",
  "email": "rifkiari@gmail.com",
  "phone": "0851123456"
}
```

Response Success

```json
{
  "data": {
    "id": 1,
    "fist_name": "Rifki",
    "last_name": "Ari",
    "email": "rifkiari@gmail.com",
    "phone": "0851123456"
  }
}
```

Response Error

```json
{
  "errors": "Phone already used"
}
```

## Update Contact

Endpoint : PUT /api/contacts

Headers :

- Autorization : Token

Request Body :

```json
{
  "fist_name": "Rifki",
  "last_name": "Ari",
  "email": "rifkiari@gmail.com",
  "phone": "0851123456"
}
```

Response Success

```json
{
  "data": {
    "id": 1,
    "fist_name": "Rifki",
    "last_name": "Ari",
    "email": "rifkiari@gmail.com",
    "phone": "0851123456"
  }
}
```

Response Error

```json
{
  "errors": "Phone already used"
}
```

## Get Contact

Endpoint : GET /api/contacts/:id

Headers :

- Autorization : Token

Response Success

```json
{
  "data": {
    "id": 1,
    "fist_name": "Rifki",
    "last_name": "Ari",
    "email": "rifkiari@gmail.com",
    "phone": "0851123456"
  }
}
```

Response Error

```json
{
  "errors": "Contact not found"
}
```

## Search Contact

Endpoint : GET /api/contacts

Headers :

- Autorization : Token

Query Params :

- name : search by name
- email : search by email
- phone : search by phone
- page : number of page, default 1
- size : size per page, default 10

Response success

```json
{
  "data": [
    {
      "id": 1,
      "fist_name": "Rifki",
      "last_name": "Ari",
      "email": "rifkiari@gmail.com",
      "phone": "0851123456"
    },
    {
      "id": ,
      "fist_name": "Dimas",
      "last_name": "Prasejarah",
      "email": "dimas@gmail.com",
      "phone": "0851123456"
    }
  ],
  "paging" : {
    "page": 1,
    "total_page": 3,
    "total_item" : 28
  }
}
```

Response error

```json
{
  "errors": "Contact not found"
}
```

## Delete Contact

Endpoint : DELETE /api/contacts/:id

Headers :

- Autorization : Token

```json
{
  "data": {
    "msg": "OK"
  }
}
```

Response error

```json
{
  "errors": "Contact not found"
}
```
