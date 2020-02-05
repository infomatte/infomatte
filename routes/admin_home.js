const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const year4 = new Date().getFullYear() - 3;
    const year3 = new Date().getFullYear() - 2;
    const year2 = new Date().getFullYear() - 1;
    res.render('admin_home', {
        year2: year2,
        year3: year3,
        year4: year4,
        header: 'Admin Panel'
    });
})

module.exports = router;