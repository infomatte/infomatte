const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.clearCookie('STAFF_TOKEN');
    res.redirect('/');
})

module.exports = router