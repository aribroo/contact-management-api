# **contact-manajement-api**

## Installation
##### Clone the repository
```bash
git clone https://github.com/aribroo/contact-manajement-api.git
```

##### Change the working directory
```bash
cd contact-manajement-api
 ```

##### Install all dependencies
```bash
npm install
```

## **API Example**

### User API Spec

### Register User

##### Endpoint : POST /api/users

##### Request Body :

```json
{
  "username": "test",
  "password": "secretkey",
  "name": "test"
}
```

### Login User

##### Endpoint : POST /api/users/login

##### Request Body :

```json
{
  "username": "test",
  "password": "secretkey"
}
```

### Update User

##### Endpoint : PATCH /api/users/current

##### - Header : Authorization Token

##### Request Body :

```json
{
  "name": "test123", 
  "password": "secretkey123"
}
```

### Get User

##### Endpoint : GET /api/users/current

##### - Header : Authorization Token

### Logout User

##### Endpoint : DELETE /api/users/logout

##### - Header : Authorization Token

### **Read more in the docs file**
[docs](https://github.com/aribroo/contact-manajement-api/tree/main/docs)
