const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World, from my machine via express endpoint')
})


app.listen(port, ()=> console.log(`Hello world app is running and listening on port: ${port}`));