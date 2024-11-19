const router = require('express').Router();
let mainTitle = 'Node JS :: Test';
let ssKey = sessionStorage.getItem('sskey');
let randomValue = require('../modules/randomizer')


router.get('/user', (req, res) => {
    !ssKey ? loginPage() : viewUser();



    function loginPage() {
        sessionStorage.setItem('sskey', randomValue);
        res.status(200).send("new connection")
    }

    function viewUser() {

    }
});

module.exports = router;