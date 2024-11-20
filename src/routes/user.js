const escapeHtml = require('escape-html');
const router = require('express').Router();


// let mainTitle = 'Node JS :: Test';


router.get('/user', (req, res) => {
    console.time('user');
    let ssKey = req.session.user;
    if (!ssKey) {
        return res.redirect('/')
    } else {
        res.status(200).render('user', {
            mainTitle: `Welcome back ${escapeHtml(req.session.user)}`,
            message: `Welcome back ${escapeHtml(req.session.user)}`
        });
    };
    console.timeEnd('user');
});

module.exports = router;