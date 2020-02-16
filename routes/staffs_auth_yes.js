const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')
const CSE = require('../model/CSE')
const ECE = require('../model/ECE')
const EEE = require('../model/EEE')
const MECH = require('../model/MECH')
const jwt  =  require('jsonwebtoken')
const tokenize = require('./localize')


router.post('/:id', async (req, res) => {
    const id = req.params.id
    const data = jwt.decode(tokenize.token_staff.token,process.env.TOKEN_SECRET)
    if(data == null)
        res.status(200).redirect('/error')
    const flag = branchToObject(data.branch)
    async () => { 
        await flag.updateOne({
            register_id : id
            },{
            $set:{
                autherized:'Yes'
            }
            },{
            upsert:true
        });
        await flag.findOne({register_id: id}, (err,data) => {
            if(data === null){
                res.status(200).redirect('/error')
            }else{
                Func_sendMail(data)
            }
        })
    }
})

function branchToObject(branch) {
    switch (branch) {
    case 'CSE':return CSE
    case 'ECE':return ECE
    case 'EEE':return EEE
    case 'MECH':return MECH
    }
}

async function Func_sendMail(file) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'infomatte.com@gmail.com',
            pass: 'domainTohost@error'
        }
    });
    const mailOptions = {
        from: 'infomatte',
        to: file.email,
        subject: `UCEK- Kancheepuram.`,
        html: `<div style="text-align: center">
            <p>Your pdf has been authorized. Download it from your portal.</p>
            <button style="padding:10px 20px;background:#4f37b9;border-radius: 20px;border:1px solid #4f37b9"><a style="text-decoration: none; color: white" href="www.ucekcse.herokuapp.com">Home</a></button></div>`
    };
    transporter.sendMail(mailOptions);
}

module.exports = router