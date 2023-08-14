# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "test",
  "password": "secretkey",
  "name": "test"
}
```

Response Success :

```json
{
  "data": {
    "username": "test",
    "name": "secretkey"
  }
}
```

Response Error :

```json
{
  "errors": "Username already used"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "test",
  "password": "secretkey"
}
```

Response Success :

```json
{
  "data": {
    "token": "token"
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
  "name": "testupdate",
  "password": "secretkey123"
}
```

Response Success :

```json
{
  "data": {
    "username": "test",
    "name": "testupdate"
  }
}
```

Response Error :

```json
{
  "errors": "Name max length 100"
}
```

## Get User

Endpoint : GET /api/users/current

- Header : Authorization Token

Response Success :

```json
{
  "data": {
    "username": "test",
    "name": "testupdate"
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
