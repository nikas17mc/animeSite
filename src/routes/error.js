const router = require('express').Router();
let mainTitle = 'Node JS :: Test';


router.get('*', (req, res, next) => {
    res.status(404).render('error',{error: 'Seite nicht gefunden'})
});

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(404).render('error', {
        mainTitle: `${mainTitle}`,
        error: err.message
    });
});

module.exports = router;