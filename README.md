# Minesweeper frontend

> You cannot call yourself a programmer, if you haven't implemented minesweeper

Said propably no one ever. Even so, I like minesweeper. And Windows 10 minesweeper is bloated with adds and unnecessary eyecandy. So here is a simple version of the game, without fancy animations.

This repo is for the frontend of the app. Backend code and install instructions can be found from [Minesweeper backend](https://github.com/MiguelSombrero/minesweeper-backend)

## Minesweeper live

This app is running live on Heroku:
(may not stay up forever though)

[Minesweeper - Heroku](https://tranquil-cove-34394.herokuapp.com/)

## Implementation

Frontend
- ReactJS
- React-Bootstrap

I borrowed some icons from [Font Awesome](https://fontawesome.com/)

## Clone the project

    git clone https://github.com/MiguelSombrero/minesweeper
    cd minesweeper

## Run (frontend only)

If you want to run the whole app with backend and database, check [Minesweeper backend](https://github.com/MiguelSombrero/minesweeper-backend). Otherwise:

### Install dependencies

    npm install

### Start the app

    npm start

## Application is running on port 3000

    http://localhost:3000

## TODO

- Original minesweeper has functionality for opening all the surrounding tiles, when clicking both mouse buttons at the same time, adjacent to flagged tile.
- User can hit mine with the first opening tile. Should change that board is created after the first press.