const express = require('express');
const router = express.Router();
const tokenize = require('./localize')
const parallel = require('async').parallel


router.get('/', (req, res) => {
    const RetT = () => { tokenize.clearToken() }
    const Red = () => { res.redirect('/'); }
    parallel([
        Red,
        RetT
    ],() => {
        
    })
})

module.exports = router