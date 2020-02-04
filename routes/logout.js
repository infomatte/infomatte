const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.clearCookie('login_token');
    res.redirect('/');
})

module.exports = router