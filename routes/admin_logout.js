const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.clearCookie('ADMIN_TOKEN');
    res.redirect('/');
})

module.exports = router