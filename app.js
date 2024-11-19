
require('dotenv').config();
const express = require('express');
const path = require('path');
let app = express();




require(path.join(__dirname + '/src/routes/routes'))(app);


const views = [
    path.join(__dirname, 'public/main'),
    path.join(__dirname, 'public/views'),
];

app.set('views', views);
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

module.exports=app;