const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('thanks', {
        header: 'Thanks for Your Feedback'
    });
});


module.exports = router;