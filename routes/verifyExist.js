const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    res.render('verifyExist', {
        header: 'Already Verified!'
    });
});

module.exports = router