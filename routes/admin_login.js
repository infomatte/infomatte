const express = require('express');
const router = express.Router();
const Admin = require('../model/Admin')
const tokenize = require('./localize')

router.get('/', (req, res) => {
    tokenize.clearToken()
    tokenize.current_page = tokenize.admin.LOGIN
    res.render('admin_login', {
        header: "Admin Login - Infomatte"
    });
})

router.post('/', async (req, res) => {
        const {
        id,
        pass
    } = req.body
    Admin.findOne({
            id: id,
            password: pass
        },
        (err, data) => {
            try{
            if(data.id == id && data.password == pass)
            {
                tokenize.from_page = tokenize.admin.LOGIN
                token = tokenize.sign({id : id,pass : pass})
                tokenize.setToken('admin',token)
                res.redirect('/admin_home')
            }else{
                res.redirect('/admin_login')
            }}catch(err){
                res.redirect('/admin_login')
            }
        })
});

module.exports = router;