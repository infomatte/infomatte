const express = require('express');
const router = express.Router();
const CSE = require('../model/CSE');
const ECE = require('../model/ECE');
const EEE = require('../model/EEE');
const MECH = require('../model/MECH');
const jwt = require('jsonwebtoken');

router.get('/error', async (req, res) => {
    res.render('error', {
        header: "Internal Server Error"
    })
});
router.get('/', async (req, res) => {
    const token = req.cookies.TOKEN;
    if (token) {
        const data = jwt.decode(token, process.env.TOKEN_SECRET);
        const ref_nad = data.register_id;
        const flag = branchToObject(data.branch)
        await flag.findOne({
            register_id: ref_nad
        }, (err, profile) => {
            if (err) {
                res.redirect('/error');
            } else {
                res.render('students_download', {
                    profile: profile,
                    header: 'Download details'
                });
            }
        });
    } else {
        res.status(200).redirect('/students_feonbnkkkujnxdkrqgouhqpsiaarpsfhekrpgwvuscmdtfvcpokzegryacvzsdha')
    }
});


function branchToObject(branch) {
    switch (branch) {
        case 'CSE':return CSE
        case 'ECE':return ECE
        case 'EEE':return EEE
        case 'MECH':return MECH
    }
}

module.exports = router;