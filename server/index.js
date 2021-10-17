const express = require('express');
const app = express();
const port = 4040;
const path = require('path');

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './../client/public')));



app.listen(port, () => {
  console.log(`port has been started on localhost/${port}`);
});