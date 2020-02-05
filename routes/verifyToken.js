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
    const nad = data.nad;
    const dob = data.dob;
    const mail = data.mail;
    const expValue = (exp - iat) / 60;
    switch(data.branch){
        case 'CSE':
            await CSE.findOne({
                nad,
                dob
            }, async (userField) => {
                try {
                    if (expValue / 60 <= 6) {
                        const user = new User({
                            name: name,
                            nad: nad,
                            autherized: 'No',
                            mail: mail,
                            dob: dob,
                            token: token,
                            nationality: null,
                            phone_no: null,
                            address: null,
                            branch: null,
                            yearofJoining: null,
                            regulation: null,
                        });
                        await user.save();
                        res.render('user_verify', {
                            myid: nad,
                            mydob: dob
                        });
                    }
                } catch (e) {
                    console.log(e)
                    res.redirect('/students_verifyExist')
                }
            });    
        break
        case 'ECE':
            await ECE.findOne({
                nad,
                dob
            }, async (userField) => {
                try {
                    if (expValue / 60 <= 6) {
                        const user = new User({
                            name: name,
                            nad: nad,
                            autherized: 'No',
                            mail: mail,
                            dob: dob,
                            token: token,
                            nationality: null,
                            phone_no: null,
                            address: null,
                            branch: null,
                            yearofJoining: null,
                            regulation: null,
                        });
                        await user.save();
                        res.render('user_verify', {
                            myid: nad,
                            mydob: dob
                        });
                    }
                } catch (e) {
                    console.log(e)
                    res.redirect('/students_verifyExist')
                }
            });    
        break
        case 'EEE':
            await EEE.findOne({
                nad,
                dob
            }, async (userField) => {
                try {
                    if (expValue / 60 <= 6) {
                        const user = new User({
                            name: name,
                            nad: nad,
                            autherized: 'No',
                            mail: mail,
                            dob: dob,
                            token: token,
                            nationality: null,
                            phone_no: null,
                            address: null,
                            branch: null,
                            yearofJoining: null,
                            regulation: null,
                        });
                        await user.save();
                        res.render('user_verify', {
                            myid: nad,
                            mydob: dob
                        });
                    }
                } catch (e) {
                    console.log(e)
                    res.redirect('/students_verifyExist')
                }
            });    
        break
        case 'MECH':
            await MECH.findOne({
                nad,
                dob
            }, async (userField) => {
                try {
                    if (expValue / 60 <= 6) {
                        const user = new User({
                            name: name,
                            nad: nad,
                            autherized: 'No',
                            mail: mail,
                            dob: dob,
                            token: token,
                            nationality: null,
                            phone_no: null,
                            address: null,
                            branch: null,
                            yearofJoining: null,
                            regulation: null,
                        });
                        await user.save();
                        res.render('user_verify', {
                            myid: nad,
                            mydob: dob
                        });
                    }
                } catch (e) {
                    console.log(e)
                    res.redirect('/students_verifyExist')
                }
            });    
        break
    }
});

router.get('/revoked', async (req, res) => {
    res.render('revoked', {
        header: "Please try to login..."
    })
});


module.exports = router