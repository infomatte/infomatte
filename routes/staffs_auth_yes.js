const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const path = require('path');
const pdf = require('html-pdf');
const mongodb = require('mongodb');
const nodemailer = require('nodemailer')
const Binary = mongodb.Binary
const mongoClient = mongodb.MongoClient

router.post('/:id', async (req, res) => {
    const id = req.params.id
    await mongoClient.connect(process.env.DB_SECRET_KEY, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        },
        async (err, client) => {
            let db = client.db('datastore')
            let collection = db.collection('users')
            await collection.updateOne({
                register_id: id
            }, {
                $set: {
                    autherized: 'Yes'
                }
            }, {
                upsert: true
            })
            let dbs = client.db('datastore')
            let collections = dbs.collection('storage')
            await collections.updateOne({
                register_id: id
            }, {
                $set: {
                    autherized: 'Yes'
                }
            }, {
                upsert: true
            })
            await collection.findOne({
                register_id: id
            }, (err, profile) => {
                if (err) {
                    res.redirect(200, '/error');
                } else {
                    const userData = profile;
                    ejs.renderFile(path.join(__dirname, "../views/", "pdfTemplate.ejs"), {
                        profile: userData
                    }, (err, data) => {
                        if (err) {
                            res.send(err)
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
                                    "contents": '<hr><h1><b>AUTHORIZED COPY</b></h1>'
                                }
                            };

                            pdf.create(data, options).toBuffer(function (err, data) {
                                if (err) {
                                    res.redirect(200, '/error');
                                } else {
                                    let file = {
                                        register_id: profile.register_id,
                                        username: profile.name,
                                        yearofJoining: profile.yearofJoining,
                                        email: profile.mail,
                                        autherized: profile.autherized,
                                        file: Binary(data)
                                    }
                                    insertFile(file, res);
                                    async function insertFile(file, res) {
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
                                        await mongoClient.connect(process.env.DB_SECRET_KEY, {
                                                useUnifiedTopology: true,
                                                useNewUrlParser: true,
                                                useCreateIndex: true
                                            },
                                            async (err, client) => {
                                                let db = client.db('datastore')
                                                let collection = db.collection('storage')
                                                collection.findOne({
                                                    register_id: file.register_id
                                                }, async (err, data) => {
                                                    if (err) {
                                                        collection.insertOne(file);
                                                    } else {

                                                        try {
                                                            await collection.updateMany({
                                                                register_id: file.register_id
                                                            }, {
                                                                $set: {
                                                                    "name": file.username,
                                                                    "file": file.file,
                                                                    "yearofJoining": file.yearofJoining,
                                                                    "autherized": file.autherized
                                                                }
                                                            }, {
                                                                upsert: true
                                                            });
                                                        } catch (err) {
                                                            res.redirect(200, '/error');
                                                        }
                                                    }
                                                    client.close(true)
                                                });
                                            });
                                    }
                                }
                            });
                        }
                    });
                }
            })

            let dby = client.db('datastore')
            let collectiony = dby.collection('storage')
            await collectiony.findOne({
                register_id: id
            }, (err, years) => {
                const year = years.yearofJoining
                res.status(200).redirect(`/staffs_year/${year}`)
            })
        }
    )
})

module.exports = router