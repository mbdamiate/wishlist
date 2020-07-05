# Auth

  - [POST /api/auth/register](#post-apiauthregister)
  - [POST /api/auth/signin](#post-apiauthsignin)

---

## POST /api/auth/register
Register a new user

**URL** : `/api/auth/register`

**Method** : `POST`

**Auth required** : No

**Headers** : 
  - `Content-Type: application/json`

**Body** :
  - `email: string`
  - `fullName: string`

**Example** :
  ``` bash
  curl -X POST \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{\"email\":\"user@mail.test\",\"fullName\":\"User Name\"}' \
  https://mbdamiate-wishlist-app.herokuapp.com/api/auth/register
  ```

### Success

**Status Code** : `201`

**Content Example** :
  ``` json
  {
    "id": "00000000-0000-0000-0000-000000000000",
  }
  ```

### Error

**Status Code** : `409`

**Content Example**
  ``` json
  {
    "message": "User already exists"
  }
  ```

**Status Code** : `500`

**Content Example**
  ``` json
  {
    "message": "Internal Server Error"
  }
  ```

---

## POST /api/auth/signin
Edit your registration

**URL** : `/api/users`

**Method** : `POST`

**Auth required** : No

**Headers** : 
  - `Content-Type: application/json`

**Body** :
  - `email: string`

**Example** :
  ``` bash
  curl -X POST \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{\"email\":\"user@mail.test\"}' \
  https://mbdamiate-wishlist-app.herokuapp.com/api/auth/signin
  ```

### Success

**Status Code** : `200`

**Content Example** :
  ``` json
  {
    "token": <token>
  }
  ```

### Error

**Status Code** : `404`

**Content Example**
  ``` json
  {
    "message": "User not found"
  }
  ```

**Status Code** : `500`

**Content Example**
  ``` json
  {
    "message": "Internal Server Error"
  }
  ```

---

[Return to features](../../../README.md#features)
