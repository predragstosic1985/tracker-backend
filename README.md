# Project setup localy

To start the application locally please follow these steps.

step 1

Download repository zip file.

step 2

Unzip the file to your destination path on your local machine(example c:\<YOUR_PATH\<FOLDER_NAME>).

step 3

npm install

step 4

npm start

## Running backend and frontend locally

Download frontend repository to your local machine from this link

https://github.com/predragstosic1985/tracker-frontend

Reproduce the same steps from previous

Change base link path in Frontend application (React app) file src\services
from
const baseLink = "https://backend-tracker.herokuapp.com/api";
to
const baseLink = "http://localhost:5000/api";

## Running tests

run
npm test
To check the coverage just open the index file in the coverage folder
auto generated on running tests
path src\coverage\index.html

## Tracking logs

In order to tracklogs open file
path src\logs\app.log

## Technical documentation

For more information about project structure please read technical documentation (not part of the repository).
