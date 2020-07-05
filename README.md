# Wishlist

Sample wishlist without product storage.

## Index
  - [Requirements](#requirements)
  - [How to use](#how-to-use)
  - [Features](#features)
  - [How to run integration tests](#how-to-run-integration-tests)
  - [How to run unit tests](#how-to-run-unit-tests)

---

## Requirements
 - Git¹
 - Docker¹
 - Docker Compose¹
 - Node¹ ²
 
  ¹ : *To run locally*

  ² : *To run the tests*

---

## How to use
There are two ways to use this application.

The first way is remote access.
 - https://mbdamiate-wishlist-app.herokuapp.com

The second way, you can clone this repository and run with Docker Compose in few steps.

  - Step 1: Install requirements
    - install [Git](https://git-scm.com/downloads)
    - install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
  - Step 2: Clone and move to app folder
    ``` bash
    git clone https://github.com/mbdamiate/wishlist.git && cd wishlist
    ```
  - Step 3
    - Create .env file based on .env.example on project folder
    - Fill in all keys with the desired values (except DATABASE_URL, as it will be filled in by docker-compose). Example:
        ``` bash
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

---

## How to run integration tests
Assuming that all "How to use" steps have been completed

To run integration tests locally, you need:

  - Setp 1: You need to set DATABASE_URL var in .env file
    ``` bash
    DATABASE_URL=postgres://wishuser:wishpass@0.0.0.0:5432/wishdb
    ```
  - Step 2: Then you must install the application dependencies
    ``` bash
    npm i
    ```
  - Step 3: Then you can run integration test with command
    ``` bash
    npm run test:i
    ```

---

## How to run unit tests
Assuming that all "How to use" steps have been completed

To run integration tests locally, you need:

  - Step 1: Then you must install the application dependencies
    ``` bash
    npm i
    ```
  - Step 2: Then you can run integration test with command
    ``` bash
    npm run test:u
    ```
