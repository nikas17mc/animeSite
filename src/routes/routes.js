// Get for routes the required path
const index = require('./index');
const login = require('./login');
const user = require('./user');
const show = require('./show');
const error = require('./error');

module.exports = function (app) {
    //Defining routes 
    app.use('/', index);
    app.use('/', login);
    app.use('/', user);
    app.use('/', show);
    app.use('/', error);
}