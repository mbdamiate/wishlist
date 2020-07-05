# wishlist

## Requirements
 - Git*
 - Docker*
 - Docker Compose*
 
*: *Depends on which of the two ways you choose*

---

## How to use
There are two ways to use this application.

The first way is remote access.
 - https://mbdamiate-wishlist-app.herokuapp.com

The second way, you can clone this repository and run with Docker Compose in few steps.

  - Step 1: Install requirements
    - install [git](https://git-scm.com/downloads)
    - install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
  - Step 2: Clone and move to app folder
    ``` bash
    git clone https://github.com/mbdamiate/wishlist.git && cd wishlist
    ```
  - Step 3
    - Create .env file based on .env.example on project folder
    - Fill in all keys with the desired values (except DATABASE_URL, as it will be filled in by docker-compose). Example:
        ``` .env
        NODE_ENV=develop
        PORT=5050
        SECRET=mysecret
        DATABASE_URL=
        ```
  - Step 4: Start the app
    ``` bash
    docker-compose up --build
    ```

---

## Features

  - [Index](src/api/route/index.md#index)
    - [Check application availability](src/api/route/index.md#get-apihealth)
  
  - [Auth](src/api/route/auth.md#auth)
    - [Register a new user](src/api/route/auth.md#post-apiauthregister)
    - [Application sign in](src/api/route/auth.md#post-apiauthsignin)
  
  - [Users](src/api/route/user.md#users)
    - [Remove your registration](src/api/route/user.md#delete-apiusers)
    - [Retrieves user list](src/api/route/user.md#get-apiusers)
    - [Edit your registration](src/api/route/user.md#patch-apiusers)
  
  - [Wishlist](src/api/route/wishlist.md#wishlist)
    - [Remove one item from your list](src/api/route/wishlist.md#delete-apiwishlist)
    - [Retrieves wishlist](src/api/route/wishlist.md#get-apiwishlist)
    - [Add a new item to your list](src/api/route/wishlist.md#post-apiwishlist)
