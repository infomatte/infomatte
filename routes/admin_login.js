const express = require('express');
const router = express.Router();
const Admin = require('../model/Admin')
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
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
        async (err, data) => {
            if (err) {
                res.render('admin_login')
            } else {
                token = jwt.sign({
                    id: id,
                    pass: pass,
                }, process.env.TOKEN_SECRET, {
                    expiresIn: "6h"
                })
                res.cookie('ADMIN_TOKEN', token)
                res.redirect('/admin_home')
            }
        });
});

module.exports = router;