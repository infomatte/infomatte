const express = require('express');
const router = express.Router();
const tokenize = require('./localize')


router.get('/', (req, res) => {
    tokenize.setToken('admin',null)
    res.redirect('/');
})

module.exports = router