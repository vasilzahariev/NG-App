# NG - Nice Games
Official Nice Games repository

## Table of Contents
1. [Application Configuration](https://github.com/vasilzahariev/ReactJS-June-2020-Project#application-configurations)
2. [Technology Stack](https://github.com/vasilzahariev/ReactJS-June-2020-Project#technology-stack)
3. [Routing](https://github.com/vasilzahariev/ReactJS-June-2020-Project#routing)
4. [Data API](https://github.com/vasilzahariev/ReactJS-June-2020-Project#data-api)
5. [Privileges](https://github.com/vasilzahariev/ReactJS-June-2020-Project#privileges)

## Application Configuration

To run the application, follow these steps:
1. Clone the repository to your machine
2. Open the repository folder
3. Once inside hold Shift while right-clicking with the mouse
4. Enter the app folder
5. Choose "Open PowerShell / command window here"
6. Type "yarn install", hit Enter and minimize the console 
7. Enter the restapi folder
8. Once inside hold Shift while right-clicking with the mouse
9. Choose "Open PowerShell / command window here"
10. Type "yarn install" and hit Enter
11. Once it's ready, type "yarn start" and hit Enter
12. Maximize the other console window, type "yarn start" and hit Enter
13. A window in your default browser should pop up (if it doesn't open a browser and type "localhost:3000" in the search bar)
14. The application now should be up and running

I've placed all the necessary environment variables in the restapi (although I shouldn't).

## Technology Stack

- React
- Material-UI (Grid)
- react-router
- REST API (Node.js)

## Routing

| Route | Description | Accessibility |
| ------ | ------ | ------ |
| / | Home Page for Guests | Guests |
| / | Home Page for Users. Provides the activity of the user and the users that he is following | Users, Admins |
| /regitser | Register Page | Only for Guests |
| /login | Login Page | Only for Guests |
| /games | Games Page (All Games)  | All |
| /admin/g/add | Add a Game Page  | Admins |
| /admin/g/edit | Edit a Game Page  | Admins |
| /g/:gameId | Game Page with a specific id (Users have more options) | All |
| /g/:gameId/reviews | Reviews for a Game with specific id | All |
| /reviews | Reviews Page (All Reviews) | All |
| /r/:reviewId | Review Page for a Review with specific id | All |
| /u/:userId | User Page for a User with specific id (Users have more options) | All |
| /u/:userId/activity | An Activity Page for a User with specific id | All |
| /u/:userId/reviews | A Page with the Reviews of a User with specific id | All |
| /search/:searchVal | A Search Page that finds all Games and Users that contain searchVal in their names (Game) and usernames (User) | All |

## Data API

##### User
> - **_id**: User id (unique)
> - **username**: User's username (unique)
> - **email**: User's email (unique)
> - **fullName**: User's full name
> - **password**: User's password (hashed)

##### Game

> - **_id**: Game id (unique)
> - **name**: Game's name (unique)
> - **description**: Description of the game
> - **posterUrl**: Url for the poster of the game
> - **trailerUrl**: Url for the trailer of the game

##### GameStatus
> - **_id**: GameStatus id (unique)
> - **userId**: Id for the user who is interacting with a game
> - **gameId**: Id for the game that is being interacted with
> - **status**: Status (number) representing one of the collections: Want to Play, Playing, Finished, Abandoned

##### Activity
> - **_id**: Activity id (unique)
> - **userId**: Id for the user who is interacting with the game
> - **gameId**: Id for the game that is being interacted with
> - **status**: Status (number) representing one of the collections: Want to Play, Playing, Finished, Abandoned
> - **message**: The message of the activity
> - **date**: The date the activity happened

##### GameReivew
> - **_id**: Game reivew id (unique)
> - **review**: The review (text) itself
> - **userId**: The author of the review
> - **gameId**: The subject of the review
> - **score**: The score for the game

##### Following
> - **_id**: Following id (unique)
> - **userId**: The follower's id
> - **followsId**: The one who is being followed

# Privileges

Guests can:
- Register
- Login
- Search

Users can:
- Add games to collections (changing Game Status)
- Write reviews
- Follow other users

Admins can:
- Create games
- Edit games


