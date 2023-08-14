# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Headers :

- Autorization : Token

Request Body :

```json
{
  "fist_name": "Jhon",
  "last_name": "Doe",
  "email": "john@gmail.com",
  "phone": "081234567"
}
```

Response Success

```json
{
  "data": {
    "id": 1,
    "fist_name": "John",
    "last_name": "Doe",
    "email": "john@gmail.com",
    "phone": "081234567"
  }
}
```

Response Error

```json
{
  "errors": "Number phone already used"
}
```

## Update Contact

Endpoint : PUT /api/contacts

Headers :

- Autorization : Token

Request Body :

```json
{
  "fist_name": "Jhonny",
  "last_name": "",
  "email": "john@gmail.com",
  "phone": "081234567"
}
```

Response Success

```json
{
  "data": {
    "id": 1,
    "fist_name": "Jhonny",
    "last_name": "",
    "email": "john@gmail.com",
    "phone": "081234567"
  }
}
```

Response Error

```json
{
  "errors": "Number phone already used"
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
    "fist_name": "John",
    "last_name": "",
    "email": "john@gmail.com",
    "phone": "0851234567"
  }
}
```

Response Error

```json
{
  "errors": "Contact is not found"
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
      "fist_name": "Jhon",
      "last_name": "",
      "email": "john@gmail.com",
      "phone": "081234567"
    },
    {
      "id": ,
      "fist_name": "Zack",
      "last_name": "Arnold",
      "email": "zck@gmail.com",
      "phone": "08111222333"
    }
  ],
  "paging" : {
    "page": 1,
    "total_page": 1,
    "total_item" : 2
  }
}
```

Response error

```json
{
  "errors": "Contact is not found"
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
  "errors": "Contact is not found"
}
```
