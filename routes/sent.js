const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('sent', {
        header: 'Sent - check your Mail'
    });
});
module.exports = router