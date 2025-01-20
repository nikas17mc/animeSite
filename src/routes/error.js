const router = require('express').Router();

router.get('*', (req, res, next) => {
    res.status(404).render('error', {});
});

module.exports = router;