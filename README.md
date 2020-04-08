# Minesweeper frontend

> You cannot call yourself a programmer, if you haven't implemented minesweeper

Said propably no one ever. Even so, I like minesweeper. And Windows 10 minesweeper is bloated with adds and unnecessary eyecandy. So here is a simple version of the game, without fancy animations.

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

If you want to run the whole app with backend and database, check [Minesweeper backend](https://github.com/MiguelSombrero/minesweeper-backend). If you wan't to run frontend independently:

### Install dependencies

    npm install

### Start the app

    npm start

## Run in container

Application root folder contains a Dockerfile. You can build and run this app in container:

    docker built -t minesweeper .
    docker run -d -p 3000:3000 minesweeper

## Application is running on port 3000

    http://localhost:3000

## Implementation notes

Original minesweeper has functionality for opening all the surrounding tiles, when clicking both mouse buttons at the same time (if adjacent tiles have enough flags). I have implemented this with clicking only primary button. It was easier, and in my opinion, better.

Now user can hit mine with the first tile. Board should be created after the first press.