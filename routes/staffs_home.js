const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const d1 = new Date();
    const year0 = d1.getFullYear();
    const d = new Date(year0, 4, 25);
    const year4 = d.getFullYear() - 3;
    const year3 = d.getFullYear() - 2;
    const year2 = d.getFullYear() - 1;
    res.render('staffs_home', {
        year2: year2,
        year3: year3,
        year4: year4,
        header: 'Staff Panel'
    });
})

module.exports = router;