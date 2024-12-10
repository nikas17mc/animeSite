const router = require('express').Router();
const ani = require('../modules/anii');

const onlyNumberRegex = /^[0-9]+$/i;


router.get('/show/:id', async (req, res, next) => {
    console.time('showrender')
    const movieId = req.params.id;

    try {
        if (!onlyNumberRegex.test(movieId)) {
            throw new Error('Invalid ID format. Only numbers are allowed.')
        } else {
            const data = await ani.get(req.params.id);
            if (!data) {
                console.timeEnd('showrender');
                return res.status(404).render('error', {});
            }
            console.timeEnd('showrender');
            return res.status(200).render('show', { movieData: "" });
        }
    } catch (error) {
        next(error);
    }
});
module.exports = router;