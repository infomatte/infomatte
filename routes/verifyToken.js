const express = require('express');
const router = express.Router();
const CSE = require('../model/CSE');
const ECE = require('../model/ECE');
const EEE = require('../model/EEE');
const MECH = require('../model/MECH');
const jwt = require('jsonwebtoken');

router.get('/:token', async (req, res) => {
    const token = req.params.token;
    const data = jwt.decode(token, process.env.TOKEN_SECRET);
    const exp = data.exp;
    const iat = data.iat;
    const name = data.name;
    const register_id = data.register_id;
    const dob = data.dob;
    const mail = data.mail;
    const expValue = (exp - iat) / 60;
    const flag = branchToObject(data.branch)
    await flag.findOne({
        register_id,
        dob
    }, async (userField) => {
        try {
            if (expValue / 60 <= 6) {
                const user = new CSE({
                    name: name,
                    register_id: register_id,
                    autherized: 'No',
                    mail: mail,
                    dob: dob,
                    token: token,
                    nationality: null,
                    phone_no: null,
                    address: null,
                    branch: data.branch,
                    yearofJoining: null,
                    regulation: null,
                });
                await user.save();
                res.render('user_verify', {
                    myid: register_id,
                    mydob: dob,
                    branch: data.branch
                });
            }
        } catch (e) {

            res.redirect('/students_verifyExist')
        }
    });
});

router.get('/revoked', async (req, res) => {
    res.render('revoked', {
        header: "Please try to login..."
    })
});


function branchToObject(branch) {
    switch (branch) {
        case 'CSE':return CSE
        case 'ECE':return ECE
        case 'EEE':return EEE     
       case 'MECH':return MECH
    }
}


module.exports = router