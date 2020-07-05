# Wishlist

  - [DELETE /api/wishlist](#delete-apiwishlist)
  - [GET /api/wishlist](#get-apiwishlist)
  - [POST /api/wishlist](#post-apiwishlist)

---

## DELETE /api/wishlist
Remove one item from your list

**URL** : `/api/wishlist`

**Method** : `DELETE`

**Auth required** : Yes

**Headers** : 
  - `Content-Type: application/json` 
  - `Authorization: Bearer <token>`

**Body** :
  - `product: object`
    - `id: string`

**Example** :
  ``` bash
  curl -X DELETE \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{\"product\":{"\id\":\"00000000-0000-0000-0000-000000000000\"}}' \
  https://mbdamiate-wishlist-app.herokuapp.com/api/wishlist
  ```

### Success

**Status Code** : `200`

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

## GET /api/wishlist
Retrieves wishlist

**URL** : `/api/wishlist`

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
  https://mbdamiate-wishlist-app.herokuapp.com/api/wishlist
  ```

### Success

**Status Code** : `200`

**Content Example** :
  ``` json
  {
    "meta": {
      "page": 1
    },
    "products": [
      {
        "id": "00000000-0000-0000-0000-000000000000",
        "brand": "Product Brand",
        "image": "repo/00000000-0000-0000-0000-000000000000.jpg",
        "price": 100,
        "title": "Product Title",
        "reviewScore": 5
      }
    ]
  }
  ```

### Error

**Status Code** : `404`

**Content Example**
  ``` json
  {
    "message": "No products found in your wishlist"
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

## POST /api/wishlist
Add a new item to your list

**URL** : `/api/wishlist`

**Method** : `POST`

**Auth required** : Yes

**Headers** : 
  - `Content-Type: application/json` 
  - `Authorization: Bearer <token>`

**Body** :
  - `product: object`
    - `id: string`

**Example** :
  ``` bash
  curl -X POST \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{\"product\":{"\id\":\"00000000-0000-0000-0000-000000000000\"}}' \
  https://mbdamiate-wishlist-app.herokuapp.com/api/wishlist
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
    "message": "Product already exists"
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
