# disney-api
An express.js REST API that enables search and modification of characters from Disney movies in a postgreSQL database using Sequelize.

Features include:

* Creation and Authentication of users
* Email notification for registered users
* Authorization of user actions via JSON web tokens
* Creating, Reading, Updating and Deleting characters
* Creating, Reading, Updating and Deleting movies
* Creating and Deleting associations between characters and movies
* Creating and Deleting associations between genres and movies
* Integration tests using Supertest + Mocha and Chai

>You can find a Swagger description of the endpoints [here](https://app.swaggerhub.com/apis/SMoreno-dev/disney-api/1.0)

## Dependencies

| Library Name | Description |
| ----------- | ----------- |
|`bcrypt`| A library to help in hashing passwords |
|`express`| Web framework for Node.js |
|`cors`| Provides a Connect/Express middleware that can be used to enable CORS |
|`pg`| 	Non-blocking PostgreSQL client for Node.js |
|`pg-hstore`| A module for serializing and deserializing JSON data into hstore format |
|`sequelize`| Promise-based Node.js ORM tool  |
|`@sendgrid/mail`| Dedicated service for interaction with the mail endpoint of the SendGrid API |
|`jsonwebtoken`| An implementation of JSON web tokens |

## Dev Dependencies

>`@types/` for `bcrypt`, `chai`, `cors`, `express`, `jsonwebtoken`, `mocha`, `node`, `pg`, `sequelize`, and `supertest` are also included

| Library Name | Description |
| ----------- | ----------- |
|`typescript`| Language for application-scale JavaScript that adds optional types |
|`ts-node`| TypeScript execution engine and REPL for Node.js |
|`nodemon`| Simple monitor script for use during development |
|`supertest`| SuperAgent driven library for testing HTTP servers |
|`mocha`| JavaScript test framework for Node.js and the browser |
|`chai`| BDD/TDD assertion library for Node.js and the browser |

## Guide
 
### Setting up the database

Install [postgresql](https://www.postgresql.org/) locally. Then use the following command to log into the `psql` shell:

```
psql -U postgres
```

Next, create a database:

```
CREATE DATABASE disney;
\q
```

Now you can log into the `disney` database as default user `postgres`:

```
psql -U postgres
```

Add the `uuid-ossp` extension. This will be necessary for `sequelize` to create the User model.

```
CREATE EXTENSION "uuid-ossp";
```

### Setting up Node.js

Start by cloning this repo:

```
git clone https://github.com/SMoreno-dev/disney-api
```

Then install:
1. [node](https://nodejs.org/en/)
2. [npm](https://www.npmjs.com/get-npm)

Next, `cd` to your project directory and run `npm install`

```
cd directory/project-folder
npm install
```

It is very important that you keep track of the various .env variables, such as the server [PORT](https://github.com/SMoreno-dev/disney-api/blob/71c4d1b0592281a590fbbfd819e2619a4475a8ce/src/server.ts#L18). You may change these env variables as you see fit.

If you wish to set up an .env file, you should use these variable names:

```
PORT = 3000
DB_URL = "postgres://postgres:password@localhost:5432/disney"
SG_API_KEY = "yourSendgridApiKey"
SECRET = "jwtSecret"
EMAIL = "yourSendgridEmail"
DISNEY_TOKEN = "yourToken" // This is used in mocha tests to bypass the jwt middleware

```


It is also very important you set up your database connection properly in [index.ts](https://github.com/SMoreno-dev/disney-api/blob/71c4d1b0592281a590fbbfd819e2619a4475a8ce/src/sequelize/index.ts#L12).

## Scripts

* To run the server using nodemon `npm run dev`
* To run mocha tests `npm run test`
* To compile/build using typescript: `npm run build`

You should be able to access the server on http://localhost:[port]/


