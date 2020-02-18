const express = require('express');
const router = express.Router();
const CSE = require('../model/CSE');
const ECE = require('../model/ECE');
const EEE = require('../model/EEE');
const MECH = require('../model/MECH');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

router.get('/', (req, res) => {
    res.render('register', {
        header: 'Register - Infomatte'
    });
});

router.post('/', async (req, res) => {
    const {
        id,
        date,
        mail,
        username,
        branch
    } = req.body;
    const flag = branchToObject(branch)
            await flag.findOne({
                mail: req.body.mail
            }, (err, data) => {
                if (data) {
                    return res.status(400)
                        .redirect('/students_emailExist');
                } else {
                    var fullUrl = req.protocol + '://' + req.get('host');
                    const expiration = {
                        expires: new Date(Date.now + 1 * 24 * 60 * 60 * 1000)
                    };
                    const token = jwt.sign({
                        register_id: id,
                        dob: date,
                        mail: mail,
                        name: username,
                        branch: branch
                    }, process.env.TOKEN_SECRET, {
                        expiresIn: '6h'
                    });
                    res.cookie('TOKEN', token, expiration);
                    try {
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: process.env.MAIL,
                                pass: process.env.MAIL_PASS
                            }
                        });

                        const mailOptions = {
                            to: req.body.mail,
                            from: 'infomatte.com@gmail.com',
                            subject: `Hello, ${req.body.username}. Verification Mail from UCEK`,
                            html: `<div style="text-align: center">
                        <h2>Univeristy college of Engineering - Kancheepuram</h4>
                        <h4>Department of Computer Science and Engineering</h5><br>
                        <p>Please confirm your Mail ID within 2 hours! Otherwise, your licence will be revoked.</p><br>
                        <p>Once you get verified using this Email, this Mail will become invalid!</p><br>
                        <button style="padding:10px 20px;background:#4f37b9;border-radius: 20px;border:1px solid #4f37b9"><a style="text-decoration: none; color: white" href="${fullUrl}/students_verify_email/${token}">Verify Me!</a></button></div>`
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                res.redirect('/error')
                            } else {

                            }
                        });
                    } catch (err) {
                        res.redirect('/error');
                    }
                    res.redirect('/students_sent');
                }
            });

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
