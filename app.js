const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

// Sitzung konfigurieren
app.use(session({
    secret: 'ssKey', 
    resave: false,
    saveUninitialized: true,
}));

const expressOption = {
    dotfiles: 'deny',
    index: false,
    // maxAge: '1d', // ---> Nicht vergessen wieder anzumachen
    setHeaders: function(res, path, stat){
        res.set('x-timestamp', Date.now())
    }
}

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, 'public'), expressOption));

// Views konfigurieren
const views = [
    path.join(__dirname, 'public/main'),
    path.join(__dirname, 'public/views'),
];
app.set('x-powered-by', false);
app.set('views', views);
// app.set('view cache', true); // ---> Nicht vergessen wieder anzumachen
app.set('view engine', 'pug');

// Routen
require(path.join(__dirname, 'src/routes/routes'))(app);

// Fehler-Middleware (nach allen Routen definiert)
app.use((error, req, res, next) => {
    const stackLines = error.stack.split('\n');
    const location = stackLines[2]?.trim();
    console.error('\x1b[31m%s\x1b[0m', `Error: ${error.message}`);
    console.warn('\x1b[35m%s\x1b[0m',`Location ${location}`);
    next('route')
});

// Middleware für URL-kodierte Daten
app.use(express.urlencoded({ extended: true }));

module.exports = app;