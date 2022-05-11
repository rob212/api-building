const express = require('express');
const app = express();
const port = 3000;

const bookCollection = [
  {
    "isbn": "9780321534460",
    "title": "Agile Testing: A Practical Guide for Testers and Agile Teams",
    "author": "Lisa Crispin",
    "id": 1
  },
  {
    "isbn": "0321803027",
    "title": "How Google Tests Software",
    "author": "James A. Whittaker",
    "id": 2
  },
  {
    "isbn": "1937785025",
    "title": "Explore It!: Reduce Risk and Increase Confidence with Exploratory Testing",
    "author": "Elisabeth Hendrickson",
    "id": 3
  }
]


app.get('/', (req, res) => {
  res.send('Hello World, from my machine via express endpoint')
})

app.get('/books', (req, res) => {
  res.json(bookCollection)
})

app.listen(port, ()=> console.log(`Hello world app is running and listening on port: ${port}`));