# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "aribroo",
  "password": "ari123",
  "name": "Rifki Ari"
}
```

Response Success :

```json
{
  "data": {
    "username": "aribroo",
    "name": "Rifki Ari"
  }
}
```

Response Error :

```json
{
  "errors": "username already use"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "aribroo",
  "password": "ari123"
}
```

Response Success :

```json
{
  "data": {
    "token": "token123"
  }
}
```

Response Error :

```json
{
  "errors": "username or password wrong"
}
```

## Update User

Endpoint : PATCH /api/users/current

- Header : Authorization Token

Request Body :

```json
{
  "name": "aribroo", // optional
  "password": "rahasia" // optional
}
```

Response Success :

```json
{
  "data": {
    "username": "aribroo",
    "name": "Darmawan"
  }
}
```

Response Error :

```json
{
  "errors": "name max length 100"
}
```

## Get User

Endpoint : GET /api/users/current

- Header : Authorization Token

Response Success :

```json
{
  "data": {
    "username": "aribroo",
    "name": "Darmawan"
  }
}
```

Response Error :

```json
{
  "errors": "Unauthorized"
}
```

-

## Logout User

Endpoint : DELETE /api/users/logout

- Header : Authorization Token

Response Success :

```json
{
  "data": {
    "msg": "OK"
  }
}
```

Response Error :

```json
{
  "errors": "Unauthorized"
}
```
