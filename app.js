const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

app.use(session({
    secret: 'ssKey', // Ein geheimer Schlüssel zur Signierung der Sitzung
    resave: false,           // Sitzungsdaten nur speichern, wenn sie geändert wurden
    saveUninitialized: true, // Sitzungen auch speichern, wenn sie nicht initialisiert sind
    // cookie: { secure: false }
}));



require(path.join(__dirname + '/src/routes/routes'))(app);


const views = [
    path.join(__dirname, 'public/main'),
    path.join(__dirname, 'public/views'),
];

app.set('views', views);
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;