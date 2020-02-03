const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('revoked', {
        header: "Please try to login..."
    })
});

module.exports = router