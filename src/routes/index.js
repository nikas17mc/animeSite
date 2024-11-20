const escapeHtml = require('escape-html');
const router = require('express').Router();
let mainTitle = 'Node JS :: Test'; // Soll später benutzt werden

function isAuthenticated(req) {
    // if (req.session.user) { next() } else { next('route') }
    return !!req.session.user;
}


router.get('/', function (req, res) {
    res.render('index', {
        mainTitle,
        isAuthenticated: isAuthenticated(req),
        user: escapeHtml(req.session.user) || null
    })
});

router.get('/logout', function (req, res) {
    console.time('logout');

    req.session.user = null; // Benutzer entfernen
    req.session.save(function (error) {
        if (error) { next(error) };
        req.session.regenerate(function (error) {
            if (error) { next(error) };
            res.redirect('/');
        })
    })
    console.timeEnd('logout');
})

module.exports = router;