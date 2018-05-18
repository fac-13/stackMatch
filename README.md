# StackMatch

![StackMatch logo](https://i.imgur.com/cNzP2c4.png)

[![Build Status](https://travis-ci.org/fac-13/stackMatch.svg?branch=master)](https://travis-ci.org/fac-13/stackMatch)

Preview StackMatch: https://stackmatch-fac-dev.herokuapp.com/

## Problem statement
The [Founders & Coders (FAC)](https://foundersandcoders.com/) community needs a way for FAC members to connect with each other, so that they can help each other and make it possible for the hiring manager to contact a FAC member with a job opportunity they may find interesting.

## Our Solution
> A web app for FAC members where they can keep up to date personal information, search for other FAC members and connect with each other based on their technical stack skills.

#### The aims of the solution:
- To facilitate connecting FAC members together that could lead to spontaneous collaboration and encourage creativity.
- To demonstrate that a FAC network exists beyond [Space4](http://space4.tech/) (FAC's physical location) and it is supportive of other FAC members even after the 16-week bootcamp course.

## User Journeys
- As a FAC grad, I can sign up to StackMatch, create my profile with Github info and then log out.
___

### The app

Preview of the first page:
    ![First page of the app](https://i.imgur.com/TuLtliP.png)

_GIF that demos the app coming soon and/or Invision link_

___

### Tech stack
 
#### Primary stack

| Front end             | Backend              | Testing    | Other               |
|:---------------------:|:--------------------:|:----------:|:-------------------:|
| HTML5                 | Node.js              | Tape       | OAuth (Passport)    |
| CSS3 (BEM)            | Handlebars           | Travis CI  | Webpack             |
| SASS                  | PostgreSQL           | Supertest  | Babel               |
| Javascript            | Express.js           | istanbul   |                     |

___

### Software Architecture

_Diagram that links Node.js icon to other services (that have their own icons) coming_
* The database schema:
![schema](https://i.imgur.com/Dgqvatm.png)
___
## How to run locally

### You will need before hand:

1. **PostgreSQL Database set up locally**
    * Connect to postgres, either by `psql` (`pgcli`) in the terminal on MAC, and `sudo -u postgres psql` on ubuntu.
    * Create the database by typing `CREATE DATABASE [the name of the database];`. It's best not to use a hyphen (`-`) or uppercase letters in your database name.
    * Create a superuser with a password - type in `CREATE USER [the new username] WITH SUPERUSER PASSWORD '[the password of the database]';`
    * Change ownership of the database to the new user by typing `ALTER DATABASE [name of the database] OWNER TO [the new username];`
    * Exit postgres

2. **GitHub oAuth App**
    * Log in to Github and go to **Personal Settings > Developer Settings > OAuth Apps**
    * Click **New OAuth app**
    * Give it any name and description you want. 
    * `Homepage URL = http://localhost:3000` 
    * `Authorization callback URL = http://localhost:3000/auth/github/callback` 
    * Save and make note of your Client ID and Client Secret for your secret environment variables. 

### Steps:

1. Clone the repo: `git clone https://github.com/fac-13/stackMatch.git`
2. Install dependencies: `npm install`

3. Create a `.env` in the root directory. This will need:

    * `TEST_DB_URL =` [Your local PostgreSQL testing DB]
    * `DB_URL =` [Your local development DB] 
    * `GITHUB_CLIENT_ID = `[Client ID from your app registration]
    * `GITHUB_CLIENT_SECRET =` [Client Secret from your app registration]
    * `BASE_URL = http://localhost:3000`
    * `COOKIE_KEY =` [Anything you want]

5. Run `npm run build` to build the database (or login to your prod db using postgres and run `\i [full path to] db_build.sql`).
6. Run the app in dev mode using`npm run dev` and access the site at [http:://localhost:3000](http:://localhost:3000).

### Testing:
1. Run `npm test` in the command line
2. Check coverage with `npm run test:coverage`

## Useful resources

* [The StackMatch HackMD Dashboard](https://hackmd.io/62vjBi0UTKqlgPnB5i1rvQ)
* [Resources and links HackMD used by the team](https://hackmd.io/3Fq2Koc7RoeW-20McqEOnQ)
* [The workflow instructions](https://hackmd.io/boHxsVrwS12W3iPdbwX05g)
