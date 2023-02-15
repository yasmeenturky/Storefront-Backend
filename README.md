## Database setup
- open psql in command line
- CREATE USER <username> WITH PASSWORD <'password'>;
- CREATE DATABASE <database name>;
- \c <database name> to connect to database

## Add .env in the project root directory and populate the file with the following and enter the missing data
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store
POSTGRES_TEST_DB=store_test
POSTGRES_USER=<***user***>
POSTGRES_PASSWORD=<***password***>
BCRYPT_PASSWORD=<***bcrypt password***>
SALT_ROUNDS=10
TOKEN_SECRET=<***secret***>
ENV = dev


## Project set up
- run npm install to  install required dependencies
- add database.json file to the project root directory and populate with the following 
{
   "env" : {
      "ENV" :"dev"
   },
    "dev": {
      "driver": "pg",
      "host": {"ENV":"POSTGRES_HOST"},
      "database": {"ENV":"POSTGRES_DB"},
      "user": {"ENV":"POSTGRES_USER"},
      "password": {"ENV":"POSTGRES_PASSWORD"}
    },
    "test": {
      "driver": "pg",
      "host": {"ENV":"POSTGRES_HOST"},
      "database": {"ENV":"POSTGRES_TEST_DB"},
      "user": {"ENV":"POSTGRES_USER"},
      "password": {"ENV":"POSTGRES_PASSWORD"}
    }
  }
- run db-migrate up to create database tables

## Run
- run npm run start to start project on ``http://localhost:3000``
- database runs on port 5432
- storefront backend runs on 3000

## Testing
-run npm run test to run jasmine tests