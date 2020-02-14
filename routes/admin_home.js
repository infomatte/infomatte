const express = require('express');
const Staff = require('../model/Staffs')
const router = express.Router();
const parallel = require('async').parallel
const tokenize = require('./localize')


router.get('/', (req, res) => {
    const admin_home = () => {
        tokenize.current_page = tokenize.admin.HOME
        if(tokenize.token_admin.secure && tokenize.check_page('admin',tokenize.from_page,tokenize.current_page)){
            res.render('admin_home', {
                header: 'Admin Home - Infomatte',
                allowed: ''
            })
        }else{
            res.status(200).redirect('/error');
        }
    }
    parallel([
        admin_home
    ],() => {
        tokenize.from_page = tokenize.admin.HOME
    })
})

router.post('/', (req, res) => {
    tokenize.from_page = tokenize.admin.HOME
    const Insert = () => { Staff.insertMany(req.body) }
    const Redirect = () => { res.redirect('admin_home') }
    if(tokenize.token_admin.secure && tokenize.check_page('admin',tokenize.from_page,tokenize.current_page)){
        parallel([
            Insert,
            Redirect
        ],() => {
        
        })
    }else{
        res.status(200).redirect('/error');
    }
})

module.exports = router;