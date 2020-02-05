const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

router.get('/', (req, res) => {
    res.render('register', {
        header: 'Register - Student Database'
    });
});

router.post('/', async (req, res) => {
    const emailExist = await User.findOne({
        mail: req.body.mail
    });
    if (emailExist) {
        return res.status(400)
            .redirect('/students_emailExist');
    } else {
        var fullUrl = req.protocol + '://' + req.get('host');
        const expiration = {
            expires: new Date(Date.now + 1 * 24 * 60 * 60 * 1000)
        };
        const token = jwt.sign({
            nad: req.body.id,
            dob: req.body.date,
            mail: req.body.mail,
            name: req.body.username,
            branch:req.body.branch
        }, process.env.TOKEN_SECRET, {
            expiresIn: '6h'
        });
        res.cookie('TOKEN', token, expiration);
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'infomatte.com@gmail.com',
                    pass: 'domainTohost@error'
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
            // sendgrid_mail.send(email)
        } catch (err) {
            res.redirect('/error');
        }
        res.redirect('/students_sent');
    }
});
module.exports = router;