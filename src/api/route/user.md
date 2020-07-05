# Users

  - [DELETE /api/users](#delete-apiusers)
  - [GET /api/users](#get-apiusers)
  - [PATCH /api/users](#patch-apiusers)

---

## GET /api/users
Retrieves user list

**URL** : `/api/users`

**Method** : `GET`

**Auth required** : Yes

**Headers** : 
  - `Content-Type: application/json` 
  - `Authorization: Bearer <token>` 

**Example** :
  ``` bash
  curl -X GET \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  https://mbdamiate-wishlist-app.herokuapp.com/api/users
  ```

### Success

**Status Code** : `200`

**Content Example** :
  ``` json
  {
    "meta": {
      "page": 1
    },
    "users": [
      {
        "id": "00000000-0000-0000-0000-000000000000",
        "email": "user@mail.test",
        "fullName": "User Name"
      }
    ]
  }
  ```

### Error

**Status Code** : `404`

**Content Example**
  ``` json
  {
    "message": "Users not found"
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

## PATCH /api/users
Edit your registration

**URL** : `/api/users`

**Method** : `PATCH`

**Auth required** : Yes

**Headers** : 
  - `Content-Type: application/json` 
  - `Authorization: Bearer <token>`

**Body** :
  - `fullMame: string`

**Example** :
  ``` bash
  curl -X PATCH \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{\"fullName\":\"Edited User Name\"}' \
  https://mbdamiate-wishlist-app.herokuapp.com/api/users
  ```

### Success

**Status Code** : `200`

**Content Example** :
  ``` json
  {
    "id": "00000000-0000-0000-0000-000000000000"
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

## DELETE /api/users
Remove your registration

**URL** : `/api/users`

**Method** : `DELETE`

**Auth required** : Yes

**Headers** : 
  - `Content-Type: application/json` 
  - `Authorization: Bearer <token>`

**Example** :
  ``` bash
  curl -X DELETE \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  https://mbdamiate-wishlist-app.herokuapp.com/api/users
  ```

### Success

**Status Code** : `200`

**Content Example** :
  ``` json
  {
    "id": "00000000-0000-0000-0000-000000000000"
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
