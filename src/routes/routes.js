// Get for routes the required path
const index = require('./index');
const user = require('./user');
const login = require('./login');
const error = require('./error');

module.exports = function (app) {
    //Defining routes 
    app.use('/', index);
    app.use('/', login);
    app.use('/', user);
    app.use('*', error);
    app.get('/about', (req, res) => {
        res.status(200).render('about', {
            mainTitle: `${mainTitle}`,
            paragraph: 'This is the About Site'
        });
    });
}