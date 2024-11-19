const index = require('./index');
const user = require('./user');
const error = require('./error');

module.exports = function (app) {
    app.use('/', index);
    app.use('/user', user);
    app.use('*', error);
    app.get('/about', (req, res) => {
        res.status(200).render('about', {
            mainTitle: `${mainTitle}`,
            paragraph: 'This is the About Site'
        });
    });
}