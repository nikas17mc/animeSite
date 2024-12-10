const escapeHtml = require('escape-html');
const router = require('express').Router();
const anii = require('../modules/anii')
// let mainTitle = 'Node JS :: Test'; // Soll später benutzt werden

const limit = 25;


function isAuthenticated(req) {
    // if (req.session.user) { next() } else { next('route') }
    return !!req.session.user;
}
router.get('/', (req, res, next) => {
    res.redirect('/page/1');
})

router.get('/page/:number', async (req, res, next) => {
    const page = req.params.number;
    console.log(`Request to /page/${page} at ${new Date().toISOString()}`);
    try {
        const result = await anii.list(page);
        // const dataList = result.data;

        // console.log(result);
        console.time('index');
        // console.log(dataList)
        // if (!dataList) throw new Error("Datalist is undefined");
        res.render('index', {
            isAuthenticated: true,
            user: escapeHtml(req.session.user) || null,
            css: '/css/index.css',
            result: result
        });
        console.timeEnd('index');
    } catch (error) {
        next(error);
    }
});


// Logout function 
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