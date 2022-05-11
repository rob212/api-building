# My first API

This is a demo of what an API actually is in order to help demystify how it can be tested. 

This demo is written in Node and makes use of the Express framework to define API endpoints and lowDB as a simple JSON database. 

The principles still apply regardless of the database or framework used. More commonly in RoS you will see APIs written in Java using the Spring framework connecting to a Postgres database. 

## Getting started

Clone this repository and navigate to the root folder:

```bash
git clone git@gitlab.ros.gov.uk:McBrydR/my-first-api.git
cd my-first-api
```

Install the dependencies listed in the `package.json` file (Express and lowDB) by running the command:

```bash
npm install
```

### Run the API

In order to run the API and have it listen for requests, run the `1_hello-world.js` file in the `src` folder via node:

```bash
node src/1_hello-world.js
```

You should see the following line printed to the console/terminal:

```bash
Hello world app is running and listening on port: 3000
```

You can now attempt to hit the example `GET` endpoint via a request using a tool such as Postman/Curl/Insomnia. The address is your local machine on port 3000:

```bash
http://localhost:3000/
```

## Additional API functionality 

Each numbered file within the `src` folder contains a continuation of the previous file with additional functionality added. 

### 2_getBooks.js

`2_getBooks.js` - adds a JSON collection of books and a new `/books` GET endpoint that will return all the books as a JSON object when you make a get request to ```http://localhost:3000/books```

Note: in order to run this you will first need to stop the currently running API in your terminal (CTRL + C) and run the new version: 

```bash
node src/2_getBooks.js
```


### 3_get_individual_book.js

```3_get_individual_book.js``` - moves our previous JSON book collection into a lowdb JSON database seperated from the API code. This is more common of what you will see in a production API as we want to seperate concerns from data and handling API requests. 

All of the database code is created in the ```database``` folder and the JSON DB is in the ```database/db.json``` file. 

We import this functionality at the top of our ```3_get_individual_book.js``` file as we would any other dependency we want to use: 

```js
const db = require('../database/database')
```

We first ensure that our previously created ```/books``` endpoint still works by refactoring it to call our new ```db.getAllBooks()``` function from our database code. 

Finally we create a new enpoint to allow our API to return an individual book based on it's ```ID```. To request a specific book, you do so via the following format of ```GET``` request:

```bash
http://localhost:3000/book/2
```


### 4_post_book.js

```4_post_book.js``` - Creates a ```POST``` endpoint that allows us to create a new book and have it added to our database when our API recieves a valid ```POST``` request. 

We have to ensure we perform some additional setup to our Express API in order to allow it to process data within the ```body``` of incoming ```POST``` requests. This is done at the top of our file:

```js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

When making a request you must ensure it is a ```POST``` and contains the relavent data for your new book in the body of the request using a Content-Type of *application/x-www-form-urlencoded*

In cURL for example:

```curl
curl --location --request POST 'http://localhost:3000/book' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'isbn=1234567890' \
--data-urlencode 'title=Api Book of the Century' \
--data-urlencode 'author=Writy McWriteface' \
--data-urlencode 'id=6'
```

