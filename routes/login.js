const express = require('express');
const router = express.Router();
const CSE = require('../model/CSE');
const ECE = require('../model/ECE');
const EEE = require('../model/EEE');
const MECH = require('../model/MECH');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const publicIp = require('public-ip');

router.get('/', async (req, res) => {
    res.render('feonbnkkkujnxdkrqgouhqpsiaarpsfhekrpgwvuscmdtfvcpokzegryacvzsdha', {
        header: 'Login - Student Database'
    });
});

router.post('/', async (req, res) => {
    const token = jwt.sign({
        nad: req.body.id,
        dob: req.body.date,
        branch: req.body.branch
    }, process.env.TOKEN_SECRET, {
        expiresIn: '6h'
    });
    res.cookie('TOKEN', token);
    switch(req.body.branch){
        case 'CSE':
            await CSE.findOne({
                register_id: req.body.id,
                dob: req.body.date
            }, (err, data) => {
                try {
                    const mail = data.mail;
                    var fullUrl = req.protocol + '://' + req.get('host');
                    try {
                        (async () => {
                            const ip = await publicIp.v4();
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'infomatte.com@gmail.com',
                                    pass: 'domainTohost@error'
                                }
                            });
        
                            const mailOptions = {
                                from: 'infomatte.com@gmail.com',
                                to: mail,
                                subject: `UCEK- Kancheepuram.`,
                                html: `<div style="text-align: center">
                                    <p>It's just a notification!<br>${req.body.id}, You've Logged In Recently from <b>IP: ${ip}</b>.</p>
                                    <button style="padding:10px 20px;background:#4f37b9;border-radius: 20px;border:1px solid #4f37b9"><a style="text-decoration: none; color: white" href=${fullUrl}>Home</a></button></div>`
                            };
        
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    res.redirect('/error')
                                }
                            });
                        })();
                        res.redirect('/students_formEntry');
                    } catch (err) {
                        res.render('error', {
                            header: 'Sorry! Try again soon'
                        });
                    }
                } catch (err) {
                    res.render('feonbnkkkujnxdkrqgouhqpsiaarpsfhekrpgwvuscmdtfvcpokzegryacvzsdha', {
                        header: "Login - Student Database"
                    })
                }
            })
        break
        case 'ECE':
            await ECE.findOne({
                nad: req.body.id,
                dob: req.body.date
            }, (err, data) => {
                try {
                    const mail = data.mail;
                    var fullUrl = req.protocol + '://' + req.get('host');
                    try {
                        (async () => {
                            const ip = await publicIp.v4();
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'infomatte.com@gmail.com',
                                    pass: 'domainTohost@error'
                                }
                            });
        
                            const mailOptions = {
                                from: 'infomatte.com@gmail.com',
                                to: mail,
                                subject: `UCEK- Kancheepuram.`,
                                html: `<div style="text-align: center">
                                    <p>It's just a notification!<br>${req.body.id}, You've Logged In Recently from <b>IP: ${ip}</b>.</p>
                                    <button style="padding:10px 20px;background:#4f37b9;border-radius: 20px;border:1px solid #4f37b9"><a style="text-decoration: none; color: white" href=${fullUrl}>Home</a></button></div>`
                            };
        
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    res.redirect('/error')
                                }
                            });
                        })();
                        res.redirect('/students_formEntry');
                    } catch (err) {
                        res.render('error', {
                            header: 'Sorry! Try again soon'
                        });
                    }
                } catch (err) {
                    res.render('feonbnkkkujnxdkrqgouhqpsiaarpsfhekrpgwvuscmdtfvcpokzegryacvzsdha', {
                        header: "Login - Student Database"
                    })
                }
            })
        break
        case 'EEE':
            await EEE.findOne({
                nad: req.body.id,
                dob: req.body.date
            }, (err, data) => {
                try {
                    const mail = data.mail;
                    var fullUrl = req.protocol + '://' + req.get('host');
                    try {
                        (async () => {
                            const ip = await publicIp.v4();
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'infomatte.com@gmail.com',
                                    pass: 'domainTohost@error'
                                }
                            });
        
                            const mailOptions = {
                                from: 'infomatte.com@gmail.com',
                                to: mail,
                                subject: `UCEK- Kancheepuram.`,
                                html: `<div style="text-align: center">
                                    <p>It's just a notification!<br>${req.body.id}, You've Logged In Recently from <b>IP: ${ip}</b>.</p>
                                    <button style="padding:10px 20px;background:#4f37b9;border-radius: 20px;border:1px solid #4f37b9"><a style="text-decoration: none; color: white" href=${fullUrl}>Home</a></button></div>`
                            };
        
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    res.redirect('/error')
                                }
                            });
                        })();
                        res.redirect('/students_formEntry');
                    } catch (err) {
                        res.render('error', {
                            header: 'Sorry! Try again soon'
                        });
                    }
                } catch (err) {
                    res.render('feonbnkkkujnxdkrqgouhqpsiaarpsfhekrpgwvuscmdtfvcpokzegryacvzsdha', {
                        header: "Login - Student Database"
                    })
                }
            })    
        break
        case 'MECH':
            await MECH.findOne({
                nad: req.body.id,
                dob: req.body.date
            }, (err, data) => {
                try {
                    const mail = data.mail;
                    var fullUrl = req.protocol + '://' + req.get('host');
                    try {
                        (async () => {
                            const ip = await publicIp.v4();
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'infomatte.com@gmail.com',
                                    pass: 'domainTohost@error'
                                }
                            });
        
                            const mailOptions = {
                                from: 'infomatte.com@gmail.com',
                                to: mail,
                                subject: `UCEK- Kancheepuram.`,
                                html: `<div style="text-align: center">
                                    <p>It's just a notification!<br>${req.body.id}, You've Logged In Recently from <b>IP: ${ip}</b>.</p>
                                    <button style="padding:10px 20px;background:#4f37b9;border-radius: 20px;border:1px solid #4f37b9"><a style="text-decoration: none; color: white" href=${fullUrl}>Home</a></button></div>`
                            };
        
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    res.redirect('/error')
                                }
                            });
                        })();
                        res.redirect('/students_formEntry');
                    } catch (err) {
                        res.render('error', {
                            header: 'Sorry! Try again soon'
                        });
                    }
                } catch (err) {
                    res.render('feonbnkkkujnxdkrqgouhqpsiaarpsfhekrpgwvuscmdtfvcpokzegryacvzsdha', {
                        header: "Login - Student Database"
                    })
                }
            })
        break
    }
});

module.exports = router
