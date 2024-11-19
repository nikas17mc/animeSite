const router = require('express').Router();
let mainTitle = 'Node JS :: Test';


router.get('/', (req, res) => {
    res.status(200).render('index', {
        mainTitle: `${mainTitle}`,
        paragraph: 'This is the Index Site'
    });
});

module.exports = router;