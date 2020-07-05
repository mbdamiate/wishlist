# Index

  - [GET /api/health](#get-apihealth)

## GET /api/health
Check application availability

**URL** : `/api/health`

**Method** : `GET`

**Auth required** : No

**Headers** : 
  - `Content-Type: application/json` 

**Example** :
  ```
  curl -X GET \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  https://mbdamiate-wishlist-app.herokuapp.com/api/health
  ```

### Success

**Status Code** : `200`

**Content Example**
  ``` json
  {
    "uptime": 0.0
  }
  ```

### Error

**Status Code** : `500`

**Content Example**
  ``` json
  {
    "message": "Internal Server Error"
  }
  ```

---

[Return to features](../../../README.md#features)
