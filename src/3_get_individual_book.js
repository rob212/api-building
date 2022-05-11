const express = require('express');
const db = require('../database/database')
const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send('Hello World, from my machine via express endpoint')
})

app.get('/books', (req, res) => {
  const books = db.getAllBooks();
  res.json(books)
})

app.get('/book/:id', (req, res) => {
  const book = db.getBook(req.params.id);
  console.log(book);
  if (book) {
    res.json(book);
  } else {
    res.sendStatus(404)
  }
})

app.listen(port, ()=> console.log(`Hello world app is running and listening on port: ${port}`));