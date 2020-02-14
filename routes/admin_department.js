const express = require('express');
const router = express.Router();
const parallel = require('async').parallel
const tokenize = require('./localize')

router.get('/:depart', (req, res) => {
    tokenize.current_page = tokenize.admin.DEPARTMENT
    const year4 = new Date().getFullYear() - 3;
    const year3 = new Date().getFullYear() - 2;
    const year2 = new Date().getFullYear() - 1;
    const setT = () => { 
        const token = tokenize.sign({dept: req.params.depart})
        tokenize.setToken('admin',token) 
    }
    const admin_year_render = () => {
    tokenize.from_page = tokenize.admin.DEPARTMENT
    res.render('admin_year', {
        branch: req.params.depart,
        year2: year2,
        year3: year3,
        year4: year4,
        header: 'Admin Panel - Infomatte'
    });
    }
    if(tokenize.token_admin.secure && tokenize.check_page('admin',tokenize.from_page,tokenize.current_page)){
        parallel([
            setT,
            admin_year_render
        ],() => {
            
        })
    }else{
        res.status(200).redirect('/error')
    }
})

module.exports = router