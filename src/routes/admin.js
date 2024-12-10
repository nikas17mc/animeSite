const escapeHtml = require('escape-html');
const router = require('express').Router();
// const ani = require('../modules/ani');


// let mainTitle = 'Node JS :: Test';


router.get('/admin', (req, res) => {
    console.time('admin');
    let ssKey = req.session.user;
    if (!ssKey) {
        return res.redirect('/')
    } else {
        res.status(200).render('admin', {
            mainTitle: `Welcome back ${escapeHtml(req.session.user)}`,
            message: `Welcome back ${escapeHtml(req.session.user)}`
        });
    };
    console.timeEnd('admin');
});

module.exports = router;