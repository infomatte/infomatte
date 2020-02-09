const express = require('express');
const Staff = require('../model/Staffs')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin_home', {
        header: 'Admin Home - Infomatte',
        allowed: ''
    })
})

router.post('/', (req, res) => {
    Staff.insertMany(req.body)
    res.redirect('/admin_home')

})
module.exports = router;