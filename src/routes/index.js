const router = require('express').Router();
const { siDotenv } = require('simple-icons'); // Very Usefull thing, I guess...

router.get('/home', (req, res) => {
    res.status(200).render('index', {
        svgPath: siDotenv.path,
    });
    // console.log(siDotenv.svg);
});

module.exports = router;