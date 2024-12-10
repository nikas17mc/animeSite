const router = require('express').Router();

router.get('*', (req, res, next) => {
    res.status(404).render('error',{
        mainTitle: 'AniBuu - 404 Seite nicht gefunden',
        css: '/css/error.css'
    });
});


module.exports = router;