const express = require('express');
const Staff = require('../model/Staffs')
const router = express.Router();
const parallel = require('async').parallel

router.get('/', (req, res) => {
    const admin_home = () => {
    res.render('admin_home', {
        header: 'Admin Home - Infomatte',
        allowed: ''
    })
    }
    parallel([
        admin_home
    ],() => {

    })
})

router.post('/', (req, res) => {

    const Insert = () => { Staff.insertMany(req.body) }
    const Redirect = () => { res.redirect('/admin_home') }
    parallel([
        Insert,
        Redirect
    ],() => {
        
    })

})
module.exports = router;