const express = require('express');
const router = express.Router();
const User = require('../model/User');
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
        dob: req.body.date
    }, process.env.TOKEN_SECRET, {
        expiresIn: '6h'
    });
    res.cookie('TOKEN', token);
    await User.findOne({
        nad: req.body.id,
        dob: req.body.date
    }, (err, data) => {
        try {
            const mail = data.mail;
            var fullUrl = req.protocol + '://' + req.get('host');
            try {
                (async () => {
                    const ip = await publicIp.v4();
                    // const email = {
                    //     to: mail,
                    //     from: 'ucekcsedb@gmail.com',
                    //     subject: `UCEK- Kancheepuram.`,
                    //     html: `<div style="text-align: center">
                    //         <p>It's just a notification!<br>${req.body.id}, You've Logged In Recently from <b>IP: ${ip}</b>.</p>
                    //         <button style="padding:10px 20px;background:#4f37b9;border-radius: 20px;border:1px solid #4f37b9"><a style="text-decoration: none; color: white" href=${fullUrl}>Home</a></button></div>`
                    // };
                    // sendgrid_mail.send(email)
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
                            res.redirect('/students_error')
                        } else {

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
                addOn: 'add',
                header: "Login - Student Database"
            })
        }
    })
});

module.exports = router