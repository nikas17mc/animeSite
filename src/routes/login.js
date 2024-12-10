const express = require('express');
// const sql = require('../modules/database');
const router = express.Router();
let mainTitle = 'Node JS :: Test'; // Soll später benutzt werden
// const randomValue = require('../modules/randomizer')();

// router.get('/login', (req, res) => {
//     const newKey = { ssKeyValue: `${randomValue}` };
//     req.session.ssKey = newKey;
//     console.warn('sskey is now stored in session:', newKey);

//     res.status(200).render('login', {
//         message: 'Please log in',
//     });
// });

router.post('/login', function (req, res, next) {
    const { user, pass } = req.body;
    console.time('login');
    if (user == 'Nikolai' && pass == 'admin') {
        req.session.regenerate(function (error) {
            if (error) { next(error) };

            // Get user from body and store in session
            req.session.user = req.body.user;

            req.session.save(function (error) {
                if (error) { return next(error) };
                res.redirect('/admin');
            })
        });
    } else if (user == 'user' && pass == 'user') {
        req.session.regenerate(function (error) {
            if (error) { next(error) };

            // Get user from body and store in session
            req.session.user = req.body.user;

            req.session.save(function (error) {
                if (error) { return next(error) };
                res.redirect('/');
            })
        });
    } else {
        res.status(401).render('index', {
            mainTitle,
            isAuthenticated: false,
            user: null,
            errorMessage: 'Invalid credentials',
        })
    }
    console.timeEnd('login')
});



module.exports = router;