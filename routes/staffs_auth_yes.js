const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const path = require('path');
const pdf = require('html-pdf');
const mongodb = require('mongodb');
const nodemailer = require('nodemailer')
const CSE = require('../model/CSE')
const ECE = require('../model/ECE')
const EEE = require('../model/EEE')
const MECH = require('../model/MECH')
const Storage = require('../model/Storage')
const Binary = mongodb.Binary
const jwt  =  require('jsonwebtoken')
const mongoClient = mongodb.MongoClient
const tokenize = require('./localize')
const parallel = require('async').parallel;
const dotenv = require('dotenv');
dotenv.config();



router.post('/:id', async (req, res) => {
    const id = req.params.id
    const data = jwt.decode(tokenize.token_staff.token ,process.env.TOKEN_SECRET)
    if(data == null)
        res.status(200).redirect('/error')
    const flag = branchToObject(data.branch)
    UpdateInDb1 = async () => { 
        await flag.updateOne({
            register_id : id
            },{
            $set:{
                autherized:'Yes'
            }
            },{
            upsert:true
        });
    }
    UpdateInDb2 = async () => {
    flag.findOne({
        register_id:id
    },async (err,profile) => {
        if(err){
            res.status(200).redirect('/error');
        }else{
            const userData = profile;
            ejs.renderFile(path.join(__dirname,"../views/","pdfTemplate.ejs"),{
                profile:userData
            },(err,data) => {
                if(err){}
                else{
                let options = {
                    "format": "A4",
                    "orientation": "portrait",
                    "border": {
                        "left": "1cm",
                        "right": "1cm",
                        "top": "1cm",
                        "bottom": "1cm"
                    },
                    "header": {
                        "height": "5mm",
                        "contents": {
                            first: '<div style="text-align: center"><h2>UNIVERSITY COLLEGE OF ENGINEERING - KANCHEEPURAM</h4><h3>DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING</h5><hr></div>'
                        }
                    },
                    "footer": {
                        "height": "20mm",
                            "contents": '<hr><h1><b>AUTHORIZED COPY</b></h1>'
                    }
                };
        pdf.create(data,options).toBuffer(async (err,data) => {
            if(err){}
            else{
                let file = {
                    register_id : profile.register_id,
                    username : profile.name,
                    yearofJoining:profile.yearofJoining,
                    email : profile.mail,
                    autherized : 'Yes',
                    file : Binary(data)
                }
                insertFile(file,res);
                Func_sendMail(file);
                res.status(200).redirect(`/staffs_year/${file.yearofJoining}`)
            }
            });
        }});
    }});
    }
    parallel([
        UpdateInDb1,
        UpdateInDb2
    ],() => {
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

async function Func_sendMail(file) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL.PASS
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


async function insertFile(file,res) {
    mongoClient.connect(process.env.DB_SECRET_KEY, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    },
        async (err, client) => {
            if(err){}
            else{
            let db = client.db('datastore')
            let collection = db.collection('storages')
            collection.findOne({
                register_id : file.register_id
            },async (err,data_call) => {
                if(err){
                    await collection.insertOne(file);
                }else{
                    await collection.updateOne({
                        register_id : file.register_id
                    },{
                        $set :{
                            'name':file.username,
                            'file':file.file,
                            'yearofJoining':file.yearofJoining,
                            'autherized':'Yes'
                        }
                    },{
                        upsert:true
                    })
                }
            })
        }
    });
}
module.exports = router