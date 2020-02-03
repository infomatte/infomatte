const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('emailExist', {
        header: 'Try Again - already exist'
    });
});
module.exports = router