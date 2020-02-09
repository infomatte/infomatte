const express = require('express');
const router = express.Router();
const Storage = require('../model/Storage')
const CSE = require('../model/CSE');
const ECE = require('../model/ECE');
const EEE = require('../model/EEE');
const MECH = require('../model/MECH');
const jwt = require('jsonwebtoken');
const ejs = require('ejs');
const path = require('path');
const pdf = require('html-pdf');
const Duplex = require('stream').Duplex;
const mongodb = require('mongodb');
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
        const ref_nad = data.register_id;
        switch (data.branch) {
            case 'CSE':
                await CSE.findOne({
                    register_id: ref_nad
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
                                            register_id: profile.register_id,
                                            username: profile.name,
                                            yearofJoining: profile.yearofJoining,
                                            branch: profile.branch,
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
                break
            case 'ECE':
                await ECE.findOne({
                    register_id: ref_nad
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
                                            register_id: profile.register_id,
                                            username: profile.name,
                                            yearofJoining: profile.yearofJoining,
                                            branch: profile.branch,
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
                break
            case 'EEE':
                await EEE.findOne({
                    register_id: ref_nad
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
                                            register_id: profile.register_id,
                                            username: profile.name,
                                            yearofJoining: profile.yearofJoining,
                                            branch: profile.branch,
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
                break
            case 'MECH':
                await MECH.findOne({
                    register_id: ref_nad
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
                                            register_id: profile.register_id,
                                            username: profile.name,
                                            yearofJoining: profile.yearofJoining,
                                            email: profile.mail,
                                            branch: profile.branch,
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
                break
        }
    } else {
        res.redirect(200, '/students_feonbnkkkujnxdkrqgouhqpsiaarpsfhekrpgwvuscmdtfvcpokzegryacvzsdha')
    }
});

router.post('/', async (req, res) => {
    const token = req.cookies.TOKEN;
    const data = jwt.decode(token, process.env.TOKEN_SECRET);
    const ref_nad = data.register_id;
    Storage.findOne({
        register_id: ref_nad
    }, (err, data) => {
        if (err) {

        } else {
            res.setHeader('content-type', 'application/pdf')
            res.setHeader('content-disposition', 'inline; filename="' + ref_nad + '"')
            toStream(data.file).pipe(res)
        }
    });
});

function toStream(chunk) {
    var stream = new Duplex();
    stream.push(chunk)
    stream.push(null)
    return stream
}
async function insertFile(recv_file, res) {
    await Storage.findOne({
        register_id: recv_file.register_id
    }, async (err, data) => {
        if (err == null && data == null) {
            await Storage.insertMany(recv_file)
        } else {
            await Storage.updateOne({
                register_id: recv_file.register_id
            }, {
                $set: {
                    file: recv_file.file
                }
            });
        }
    });
}

module.exports = router;