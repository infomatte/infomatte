const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.clearCookie('TOKEN');
    res.redirect('/');
})

module.exports = router