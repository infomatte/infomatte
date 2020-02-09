const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')


router.get('/:depart', (req, res) => {
    const department = req.params.depart
    const token = jwt.sign({dept:department},process.env.TOKEN_SECRET,{"expiresIn":"6h"})
    res.cookie('ADMIN_TOKEN',token)
    const year4 = new Date().getFullYear() - 3;
    const year3 = new Date().getFullYear() - 2;
    const year2 = new Date().getFullYear() - 1;
    res.render('admin_year', {
        year2: year2,
        year3: year3,
        year4: year4,
        header: 'Admin Panel - Infomatte'
    });

})

module.exports = router