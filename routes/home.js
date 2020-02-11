const express = require('express');
const router = express.Router();
const parallel = require('async').parallel
router.get('/', (req, res) => {
    const render_home = () => 
    { 
        res.render('home', {
            header: 'Infomatte - UCEK College Internal Server'
        });
    }
    parallel([
        render_home
    ],() => {
        
    })
});


module.exports = router;