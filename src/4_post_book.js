const express = require("express");
const db = require("../database/database");
const app = express();
// remember and add these to allow POST to work by allowing body reads with Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");

// quick fix to deal with cors
app.use(cors());

const baseURL = express.Router();
app.use("/store/v1", baseURL);

// Swagger UI
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./openapi/books-openapi.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = 4000;

baseURL.get("/", (req, res) => {
  res.send("Hello World, from my machine via express endpoint");
});

baseURL.get("/books", (req, res) => {
  const books = db.getAllBooks();
  res.json(books);
});

baseURL.get("/book/:id", (req, res) => {
  const book = db.getBook(req.params.id);
  console.log(book);
  if (book) {
    res.json(book);
  } else {
    res.sendStatus(404);
  }
});

baseURL.post("/book", (req, res) => {
  const book = { ...req.body };
  console.log(
    `I just sent this in the body: ${book.id}, ${book.isbn}, ${book.title}, ${book.author}`
  );
  db.addBook(book);
  res.send(`created book with title: ${book.title}`);
});

app.listen(port, () =>
  console.log(`Hello world app is running and listening on port: ${port}`)
);
