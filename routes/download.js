const express = require('express');
const router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const ejs = require('ejs');
const path = require('path');
const pdf = require('html-pdf');
const Duplex = require('stream').Duplex;
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient
const Binary = mongodb.Binary

router.get('/error', async (req, res) => {
    res.render('error', {
        header: "Internal Server Error"
    })
});
router.get('/', async (req, res) => {
    const token = req.cookies.TOKEN;
    if (token) {
        const data = jwt.decode(token, process.env.TOKEN_SECRET);
        const ref_nad = data.nad;
        await User.findOne({
            nad: ref_nad
        }, (err, profile) => {
            if (err) {
                res.redirect('/error');
            } else {
                const userData = profile;
                ejs.renderFile(path.join(__dirname, '../views/', "pdfTemplate.ejs"), {
                    profile: userData
                }, (err, data) => {
                    if (err) {
                        res.render("error", {
                            header: 'Sorry! Try again soon'
                        })
                    } else {
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
                                "contents": '<hr><h1><b>UNAUTHORIZED COPY</b></h1>'
                            }
                        };
                        pdf.create(data, options).toBuffer(function (err, data) {
                            if (err) {
                                res.render('/students_download', {
                                    profile: profile,
                                    header: 'Download Details'
                                });
                            } else {
                                let file = {
                                    nad: profile.nad,
                                    username: profile.name,
                                    yearofJoining: profile.yearofJoining,
                                    email: profile.mail,
                                    autherized: profile.autherized,
                                    file: Binary(data)
                                }
                                insertFile(file, res);
                            }
                        });
                    }
                });
                res.render('students_download', {
                    profile: profile,
                    header: 'Download details'
                });
            }
        });
    } else {
        res.redirect(200, '/students_feonbnkkkujnxdkrqgouhqpsiaarpsfhekrpgwvuscmdtfvcpokzegryacvzsdha')
    }
});

router.post('/', async (req, res) => {
    const token = req.cookies.TOKEN;
    const data = jwt.decode(token, process.env.TOKEN_SECRET);
    const ref_nad = data.nad;
    mongoClient.connect(process.env.DB_SECRET_KEY, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        },
        async (err, client) => {
            let db = client.db('datastore')
            let collection = db.collection('storage')
            collection.findOne({
                nad: ref_nad
            }, (err, data) => {
                if (err) {

                } else {
                    console.log(data)
                    res.setHeader('content-type', 'application/pdf')
                    res.setHeader('content-disposition', 'inline; filename="' + data.nad + '"')
                    toStream(data.file.buffer).pipe(res)
                }
            });
        });
});

function toStream(chunk) {
    var stream = new Duplex();
    stream.push(chunk)
    stream.push(null)
    return stream
}
async function insertFile(file, res) {
    mongoClient.connect(process.env.DB_SECRET_KEY, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        },
        async (err, client) => {
            let db = client.db('datastore')
            let collection = db.collection('storage')
            collection.findOne({
                nad: file.nad
            }, async (err, data) => {
                if (err) {
                    collection.insertOne(file);
                } else {
                    try {
                        await collection.updateMany({
                            nad: file.nad
                        }, {
                            $set: {
                                "name": file.username,
                                "file": file.file,
                                "email": file.email,
                                "yearofJoining": file.yearofJoining,
                                "autherized": file.autherized
                            }
                        }, {
                            upsert: true
                        });
                    } catch (err) {
                        res.redirect('/error');
                    }
                }
                client.close(true)
            });
        });
}

module.exports = router;