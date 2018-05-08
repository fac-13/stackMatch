# StackMatch

![StackMatch logo](https://i.imgur.com/cNzP2c4.png =250x)

Preview StackMatch: _link to Heroku to come_

## Problem statement
The [Founders & Coders (FAC)](https://foundersandcoders.com/) community needs a way for FAC members to connect with each other, so that they can help each other and make it possible for the hiring manager to contact a FAC member with a job opportunity they may find interesting.

## Our Solution
> A web app for FAC members where they can keep up to date personal information, search for other FAC members and connect with each other based on their technical stack skills.

#### The aims of the solution:
- To facilitate connecting FAC members together that could lead to spontaneous collaboration and encourage creativity.
- To demonstrate that a FAC network exists beyond [Space4](http://space4.tech/) (FAC's physical location) and it is supportive of other FAC members even after the 16-week bootcamp course.

## User Stories
- As a FAC grad, I can sign up to StackMatch, create my profile with Github info and then log out.
___

### The app

Preview of the first page:
    ![First page of the app](https://i.imgur.com/TuLtliP.png =400x)

_GIF that demos the app coming soon and/or Invision link_

___

### Tech stack
 
#### Primary stack

| Front end             | Backend              | Testing    | Other               |
|:---------------------:|:--------------------:|:----------:|:-------------------:|
| HTML5                 | Node.js              | Tape       | Figma               | 
| CSS3 (BEM)            | Handlebars temp.     | Travis CI  | Sketch              |
| SASS                  | PostgreSQL           | Supertest  | Invision            |
| Javascript            | Express.js           | istanbul   | OAuth (Passport)    |
|                       |                      |            | GraphQL API         |

___

### Software Architecture

_Diagram that links Node.js icon to other services (that have their own icons) coming_

___

## How to run locally
You will need before hand:
- GitHub account

### Steps:
1. Clone the repo: `git clone https://github.com/fac-13/stackMatch.git`
2. Install dependencies: `npm install`
3. Set up the local database by:
    1. Connect to postgres, either by `psql` (`pgcli`) in the terminal on MAC, and `sudo -u postgres psql` on ubuntu.
    2. Create the database by typing `CREATE DATABASE [the name of the database];`. It's best not to use a hyphen (`-`) or uppercase letters in your database name.
    3. Create a superuser with a password - type in `CREATE USER [the new username] WITH SUPERUSER PASSWORD '[the password of the database]';`
    4. Change ownership of the database to the new user by typing `ALTER DATABASE [name of the database] OWNER TO [the new username];`
    5. Exit postgres
3. Create a `config.env` in the root directory. This will need:
- `SECRET = ` [Your secret]  
- `DATABASE_URL = ` [Your PostgreSQL prod DB]
- `HEROKU_POSTGRESQL_URL` = [Your PostgreSQL dev DB]

5. Run `npm run build` to build the database (or login to your prod db using postgres and run [full path to]`db_build.sql`).
6. Run the app in dev mode using`npm run dev` and access the site at localhost:3000. 
    * You will need a GitHub account to sign up.

### Testing:
1. Run `npm test` in the command line

## Useful resources

* [The StackMatch HackMD Dashboard](https://hackmd.io/62vjBi0UTKqlgPnB5i1rvQ)
* [Resources and links HackMD used by the team](https://hackmd.io/3Fq2Koc7RoeW-20McqEOnQ)
* [The workflow instructions](https://hackmd.io/boHxsVrwS12W3iPdbwX05g)