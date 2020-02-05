const express = require('express');
const router = express.Router();
const CSE = require('../model/CSE');
const ECE = require('../model/ECE');
const EEE = require('../model/EEE');
const MECH = require('../model/MECH');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
router.get('/error', async (req, res) => {
    res.render('error', {
        header: "Internal Server Error"
    })
});

router.get('/', async (req, res) => {
    const token = req.cookies.TOKEN;
    if (token) {
        const data = jwt.decode(token, process.env.TOKEN_SECRET);
        const Branch = data.branch;
        const d1 = new Date();
        const year0 = d1.getFullYear();
        const d = new Date(year0, 4, 25);
        const first_year = d.getFullYear();
        const second_year = d.getFullYear() - 1;
        const third_year = d.getFullYear() - 2;
        const fourth_year = d.getFullYear() - 3;
        // const second_year = new Date(year-1, d.getMonth(), d.getDate())
        // const third_year = new Date(year-2, d.getMonth(), d.getDate())
        // const fourth_year = new Date(year-3, d.getMonth(), d.getDate())
        switch(Branch){
            case 'CSE':
                 await CSE.findOne({
                        nad: data.nad
                    }, (err, hold) => {
                        if (err) {
                            res.render('formEntry', {
                                myid: data.nad,
                                mydob: data.dob,
                                mymail: '',
                                myname: '',
                                mynation: '',
                                myph: '',
                                myaddress: '',
                                later_entry: '',
                                mysslc: '',
                                mysslc_cutoff: '',
                                branch: Branch,     
                                myhsc_cutoff: '',
                                hsc_file: '',
                                mybranch: '',
                                myyearofJoining: '',
                                myregulation: '',
                                year1: first_year,
                                year2: second_year,
                                year3: third_year,
                                year4: fourth_year,
                                header: 'Student Information'
                            });
                        } else {
                            if (hold.later_entry === 'No') {
                                res.render('formEntry', {
                                    myid: hold.nad,
                                    mydob: hold.dob,
                                    mymail: hold.mail,
                                    myname: hold.name,
                                    mynation: hold.nationality,
                                    myph: hold.phone_no,
                                    myaddress: hold.address,
                                    later_entry: hold.later_entry,
                                    mysslc: hold.sslc,
                                    mysslc_cutoff: hold.sslc_cutoff,
                                    sslc_file: hold.sslc_file,
                                    sslc_size: hold.sslc_size,
                                    myhsc: hold.hsc,
                                    myhsc_cutoff: hold.hsc_cutoff,
                                    hsc_file: hold.hsc_file,
                                    hsc_size: hold.hsc_size,
                                    mybranch: hold.branch,
                                    myyearofJoining: hold.yearofJoining,
                                    myregulation: hold.regulation,
                                    year1: first_year,
                                    year2: second_year,
                                    year3: third_year,
                                    year4: fourth_year,
                                    header: 'Student Information'
                                });
                            } else if (hold.later_entry === 'Yes') {
                                res.render('formEntry', {
                                    myid: hold.nad,
                                    mydob: hold.dob,
                                    mymail: hold.mail,
                                    myname: hold.name,
                                    mynation: hold.nationality,
                                    myph: hold.phone_no,
                                    myaddress: hold.address,
                                    later_entry: hold.later_entry,
                                    mybranch: hold.branch,
                                    myyearofJoining: hold.yearofJoining,
                                    myregulation: hold.regulation,
                                    year1: first_year,
                                    year2: second_year,
                                    year3: third_year,
                                    year4: fourth_year,
                                    header: 'Student Information'
                                });
                            } else {
                                res.render('formEntry', {
                                    myname: hold.name,
                                    myid: data.nad,
                                    mydob: data.dob,
                                    mymail: hold.mail,
                                    mymail: '',
                                    myname: '',
                                    mynation: '',
                                    myph: '',
                                    myaddress: '',
                                    later_entry: '',
                                    mysslc: '',
                                    mysslc_cutoff: '',
                                    sslc_file: '',
                                    myhsc: '',
                                    myhsc_cutoff: '',
                                    hsc_file: '',
                                    mybranch: '',
                                    myyearofJoining: '',
                                    myregulation: '',
                                    year1: first_year,
                                    year2: second_year,
                                    year3: third_year,
                                    year4: fourth_year,
                                    header: 'Student Information'
                                });
                           }
                        }
                    });
                break
            case 'ECE':
                await ECE.findOne({
            nad: data.nad
        }, (err, hold) => {
            if (err) {
                res.render('formEntry', {
                    myid: data.nad,
                    mydob: data.dob,
                    mymail: '',
                    myname: '',
                    mynation: '',
                    myph: '',
                    myaddress: '',
                    later_entry: '',
                    mysslc: '',
                    mysslc_cutoff: '',        
                    branch: req.body.branch,
                    myhsc_cutoff: '',
                    hsc_file: '',
                    mybranch: '',
                    myyearofJoining: '',
                    myregulation: '',
                    year1: first_year,
                    year2: second_year,
                    year3: third_year,
                    year4: fourth_year,
                    header: 'Student Information'
                });
            } else {
                if (hold.later_entry === 'No') {
                    res.render('formEntry', {
                        myid: hold.nad,
                        mydob: hold.dob,
                        mymail: hold.mail,
                        myname: hold.name,
                        mynation: hold.nationality,
                        myph: hold.phone_no,
                        myaddress: hold.address,
                        later_entry: hold.later_entry,
                        mysslc: hold.sslc,
                        mysslc_cutoff: hold.sslc_cutoff,
                        sslc_file: hold.sslc_file,
                        sslc_size: hold.sslc_size,
                        myhsc: hold.hsc,
                        myhsc_cutoff: hold.hsc_cutoff,
                        hsc_file: hold.hsc_file,
                        hsc_size: hold.hsc_size,
                        mybranch: hold.branch,
                        myyearofJoining: hold.yearofJoining,
                        myregulation: hold.regulation,
                        year1: first_year,
                        year2: second_year,
                        year3: third_year,
                        year4: fourth_year,
                        header: 'Student Information'
                    });
                } else if (hold.later_entry === 'Yes') {
                    res.render('formEntry', {
                        myid: hold.nad,
                        mydob: hold.dob,
                        mymail: hold.mail,
                        myname: hold.name,
                        mynation: hold.nationality,
                        myph: hold.phone_no,
                        myaddress: hold.address,
                        later_entry: hold.later_entry,
                        mybranch: hold.branch,
                        myyearofJoining: hold.yearofJoining,
                        myregulation: hold.regulation,
                        year1: first_year,
                        year2: second_year,
                        year3: third_year,
                        year4: fourth_year,
                        header: 'Student Information'
                    });
                } else {
                    res.render('formEntry', {
                        myname: hold.name,
                        myid: data.nad,
                        mydob: data.dob,
                        mymail: hold.mail,
                        mymail: '',
                        myname: '',
                        mynation: '',
                        myph: '',
                        myaddress: '',
                        later_entry: '',
                        mysslc: '',
                        mysslc_cutoff: '',
                        sslc_file: '',
                        myhsc: '',
                        myhsc_cutoff: '',
                        hsc_file: '',
                        mybranch: '',
                        myyearofJoining: '',
                        myregulation: '',
                        year1: first_year,
                        year2: second_year,
                        year3: third_year,
                        year4: fourth_year,
                        header: 'Student Information'
                    });
               }
            }
        });
                break
            case 'EEE':
                await EEE.findOne({
            nad: data.nad
        }, (err, hold) => {
            if (err) {
                res.render('formEntry', {
                    myid: data.nad,
                    mydob: data.dob,
                    mymail: '',
                    myname: '',
                    mynation: '',
                    myph: '',
                    myaddress: '',
                    later_entry: '',
                    mysslc: '',
                    mysslc_cutoff: '',        
                    branch: req.body.branch,
                    myhsc_cutoff: '',
                    hsc_file: '',
                    mybranch: '',
                    myyearofJoining: '',
                    myregulation: '',
                    year1: first_year,
                    year2: second_year,
                    year3: third_year,
                    year4: fourth_year,
                    header: 'Student Information'
                });
            } else {
                if (hold.later_entry === 'No') {
                    res.render('formEntry', {
                        myid: hold.nad,
                        mydob: hold.dob,
                        mymail: hold.mail,
                        myname: hold.name,
                        mynation: hold.nationality,
                        myph: hold.phone_no,
                        myaddress: hold.address,
                        later_entry: hold.later_entry,
                        mysslc: hold.sslc,
                        mysslc_cutoff: hold.sslc_cutoff,
                        sslc_file: hold.sslc_file,
                        sslc_size: hold.sslc_size,
                        myhsc: hold.hsc,
                        myhsc_cutoff: hold.hsc_cutoff,
                        hsc_file: hold.hsc_file,
                        hsc_size: hold.hsc_size,
                        mybranch: hold.branch,
                        myyearofJoining: hold.yearofJoining,
                        myregulation: hold.regulation,
                        year1: first_year,
                        year2: second_year,
                        year3: third_year,
                        year4: fourth_year,
                        header: 'Student Information'
                    });
                } else if (hold.later_entry === 'Yes') {
                    res.render('formEntry', {
                        myid: hold.nad,
                        mydob: hold.dob,
                        mymail: hold.mail,
                        myname: hold.name,
                        mynation: hold.nationality,
                        myph: hold.phone_no,
                        myaddress: hold.address,
                        later_entry: hold.later_entry,
                        mybranch: hold.branch,
                        myyearofJoining: hold.yearofJoining,
                        myregulation: hold.regulation,
                        year1: first_year,
                        year2: second_year,
                        year3: third_year,
                        year4: fourth_year,
                        header: 'Student Information'
                    });
                } else {
                    res.render('formEntry', {
                        myname: hold.name,
                        myid: data.nad,
                        mydob: data.dob,
                        mymail: hold.mail,
                        mymail: '',
                        myname: '',
                        mynation: '',
                        myph: '',
                        myaddress: '',
                        later_entry: '',
                        mysslc: '',
                        mysslc_cutoff: '',
                        sslc_file: '',
                        myhsc: '',
                        myhsc_cutoff: '',
                        hsc_file: '',
                        mybranch: '',
                        myyearofJoining: '',
                        myregulation: '',
                        year1: first_year,
                        year2: second_year,
                        year3: third_year,
                        year4: fourth_year,
                        header: 'Student Information'
                    });
               }
            }
        });
                break
            case 'MECH':
                await MECH.findOne({
            nad: data.nad
        }, (err, hold) => {
            if (err) {
                res.render('formEntry', {
                    myid: data.nad,
                    mydob: data.dob,
                    mymail: '',
                    myname: '',
                    mynation: '',
                    myph: '',
                    myaddress: '',
                    later_entry: '',
                    mysslc: '',
                    mysslc_cutoff: '',        
                    branch: req.body.branch,
                    myhsc_cutoff: '',
                    hsc_file: '',
                    mybranch: '',
                    myyearofJoining: '',
                    myregulation: '',
                    year1: first_year,
                    year2: second_year,
                    year3: third_year,
                    year4: fourth_year,
                    header: 'Student Information'
                });
            } else {
                if (hold.later_entry === 'No') {
                    res.render('formEntry', {
                        myid: hold.nad,
                        mydob: hold.dob,
                        mymail: hold.mail,
                        myname: hold.name,
                        mynation: hold.nationality,
                        myph: hold.phone_no,
                        myaddress: hold.address,
                        later_entry: hold.later_entry,
                        mysslc: hold.sslc,
                        mysslc_cutoff: hold.sslc_cutoff,
                        sslc_file: hold.sslc_file,
                        sslc_size: hold.sslc_size,
                        myhsc: hold.hsc,
                        myhsc_cutoff: hold.hsc_cutoff,
                        hsc_file: hold.hsc_file,
                        hsc_size: hold.hsc_size,
                        mybranch: hold.branch,
                        myyearofJoining: hold.yearofJoining,
                        myregulation: hold.regulation,
                        year1: first_year,
                        year2: second_year,
                        year3: third_year,
                        year4: fourth_year,
                        header: 'Student Information'
                    });
                } else if (hold.later_entry === 'Yes') {
                    res.render('formEntry', {
                        myid: hold.nad,
                        mydob: hold.dob,
                        mymail: hold.mail,
                        myname: hold.name,
                        mynation: hold.nationality,
                        myph: hold.phone_no,
                        myaddress: hold.address,
                        later_entry: hold.later_entry,
                        mybranch: hold.branch,
                        myyearofJoining: hold.yearofJoining,
                        myregulation: hold.regulation,
                        year1: first_year,
                        year2: second_year,
                        year3: third_year,
                        year4: fourth_year,
                        header: 'Student Information'
                    });
                } else {
                    res.render('formEntry', {
                        myname: hold.name,
                        myid: data.nad,
                        mydob: data.dob,
                        mymail: hold.mail,
                        mymail: '',
                        myname: '',
                        mynation: '',
                        myph: '',
                        myaddress: '',
                        later_entry: '',
                        mysslc: '',
                        mysslc_cutoff: '',
                        sslc_file: '',
                        myhsc: '',
                        myhsc_cutoff: '',
                        hsc_file: '',
                        mybranch: '',
                        myyearofJoining: '',
                        myregulation: '',
                        year1: first_year,
                        year2: second_year,
                        year3: third_year,
                        year4: fourth_year,
                        header: 'Student Information'
                    });
               }
            }
        });
                break
        }
        // await Branch.findOne({
        //     nad: data.nad
        // }, (err, hold) => {
        //     if (err) {
        //         res.render('formEntry', {
        //             myid: data.nad,
        //             mydob: data.dob,
        //             mymail: '',
        //             myname: '',
        //             mynation: '',
        //             myph: '',
        //             myaddress: '',
        //             later_entry: '',
        //             mysslc: '',
        //             mysslc_cutoff: '',        branch: req.body.branch

        //             myhsc_cutoff: '',
        //             hsc_file: '',
        //             mybranch: '',
        //             myyearofJoining: '',
        //             myregulation: '',
        //             year1: first_year,
        //             year2: second_year,
        //             year3: third_year,
        //             year4: fourth_year,
        //             header: 'Student Information'
        //         });
        //     } else {
        //         if (hold.later_entry === 'No') {
        //             res.render('formEntry', {
        //                 myid: hold.nad,
        //                 mydob: hold.dob,
        //                 mymail: hold.mail,
        //                 myname: hold.name,
        //                 mynation: hold.nationality,
        //                 myph: hold.phone_no,
        //                 myaddress: hold.address,
        //                 later_entry: hold.later_entry,
        //                 mysslc: hold.sslc,
        //                 mysslc_cutoff: hold.sslc_cutoff,
        //                 sslc_file: hold.sslc_file,
        //                 sslc_size: hold.sslc_size,
        //                 myhsc: hold.hsc,
        //                 myhsc_cutoff: hold.hsc_cutoff,
        //                 hsc_file: hold.hsc_file,
        //                 hsc_size: hold.hsc_size,
        //                 mybranch: hold.branch,
        //                 myyearofJoining: hold.yearofJoining,
        //                 myregulation: hold.regulation,
        //                 year1: first_year,
        //                 year2: second_year,
        //                 year3: third_year,
        //                 year4: fourth_year,
        //                 header: 'Student Information'
        //             });
        //         } else if (hold.later_entry === 'Yes') {
        //             res.render('formEntry', {
        //                 myid: hold.nad,
        //                 mydob: hold.dob,
        //                 mymail: hold.mail,
        //                 myname: hold.name,
        //                 mynation: hold.nationality,
        //                 myph: hold.phone_no,
        //                 myaddress: hold.address,
        //                 later_entry: hold.later_entry,
        //                 mybranch: hold.branch,
        //                 myyearofJoining: hold.yearofJoining,
        //                 myregulation: hold.regulation,
        //                 year1: first_year,
        //                 year2: second_year,
        //                 year3: third_year,
        //                 year4: fourth_year,
        //                 header: 'Student Information'
        //             });
        //         } else {
        //             res.render('formEntry', {
        //                 myname: hold.name,
        //                 myid: data.nad,
        //                 mydob: data.dob,
        //                 mymail: hold.mail,
        //                 mymail: '',
        //                 myname: '',
        //                 mynation: '',
        //                 myph: '',
        //                 myaddress: '',
        //                 later_entry: '',
        //                 mysslc: '',
        //                 mysslc_cutoff: '',
        //                 sslc_file: '',
        //                 myhsc: '',
        //                 myhsc_cutoff: '',
        //                 hsc_file: '',
        //                 mybranch: '',
        //                 myyearofJoining: '',
        //                 myregulation: '',
        //                 year1: first_year,
        //                 year2: second_year,
        //                 year3: third_year,
        //                 year4: fourth_year,
        //                 header: 'Student Information'
        //             });
        //        }
        //     }
        //});
    } else {
        res.redirect('/students_feonbnkkkujnxdkrqgouhqpsiaarpsfhekrpgwvuscmdtfvcpokzegryacvzsdha')
    }
});
router.post('/', async (req, res) => {
    async function uriGen(data) {
        if (data.includes("http://res.cloudinary.com/ucekcse/image/")) {
            return data
        } else if (data) {
            const uri = await cloudinary.uploader.upload(data)
            return uri.url
        } else {
            return null
        }
    }
    const token = req.cookies.TOKEN;
    const data = jwt.decode(token, process.env.TOKEN_SECRET);
    const tech_array = {
        tech_option: req.body.group1,
        technical_head: req.body.technical_head,
        technical_start: req.body.technical_start,
        technical_end: req.body.technical_end,
        technical_title: req.body.technical_title,
        technical_description: req.body.technical_description,
        technical_remark: req.body.technical_remark,
        tech_file: await uriGen(req.body.technical_file),
    }
    const sport_array = {
        sports_option: req.body.group2,
        sports_head: req.body.sports_head,
        sports_start: req.body.sports_start,
        sports_remark: req.body.sports_remark,
        sport_file: await uriGen(req.body.sports_file),
    }
    const sslcFile = req.body.sslc_file
    const hscFile = req.body.hsc_file
    try {
        if (req.body.form_group1 === 'Yes') {
            await User.updateMany({
                nad: data.nad
            }, {
                name: req.body.username,
                nad: req.body.id,
                mail: req.body.email,
                dob: req.body.date,
                token: token,
                nationality: req.body.nation,
                phone_no: req.body.tele,
                address: req.body.address,
                later_entry: req.body.form_group1,
                branch: req.body.branch,
                yearofJoining: req.body.yearofJoining,
                regulation: req.body.regulation,
                $push: {
                    technical: tech_array,
                    sports: sport_array
                },
                Semester_1: {
                    later_entry: null,
                    attended: null,
                    sub1: null,
                    sub2: null,
                    sub3: null,
                    sub4: null,
                    sub5: null,
                    sub6: null,
                    lab1: null,
                    lab2: null,
                    gpa: null,
                    arrear: null,
                    s1_file: await uriGen('')
                },
                Semester_2: {
                    later_entry: null,
                    attended: null,
                    sub1: null,
                    sub2: null,
                    sub3: null,
                    sub4: null,
                    sub5: null,
                    sub6: null,
                    lab1: null,
                    lab2: null,
                    gpa: null,
                    arrear: null,
                    s2_file: await uriGen('')
                },
                Semester_3: {
                    later_entry: null,
                    attended: null,
                    sub1: null,
                    sub2: null,
                    sub3: null,
                    sub4: null,
                    sub5: null,
                    lab1: null,
                    lab2: null,
                    lab3: null,
                    lab4: null,
                    gpa: null,
                    arrear: null,
                    s3_file: await uriGen('')
                },
                Semester_4: {
                    later_entry: null,
                    attended: null,
                    sub1: null,
                    sub2: null,
                    sub3: null,
                    sub4: null,
                    sub5: null,
                    sub6: null,
                    lab1: null,
                    lab2: null,
                    lab3: null,
                    gpa: null,
                    arrear: null,
                    s4_file: await uriGen('')
                },
                Semester_5: {
                    later_entry: null,
                    attended: null,
                    sub1: null,
                    sub2: null,
                    sub3: null,
                    sub4: null,
                    sub5: null,
                    oe_1: null,
                    sub6: null,
                    lab1: null,
                    lab2: null,
                    lab3: null,
                    gpa: null,
                    arrear: null,
                    s5_file: await uriGen('')
                },
                Semester_6: {
                    later_entry: null,
                    attended: null,
                    sub1: null,
                    sub2: null,
                    sub3: null,
                    sub4: null,
                    sub5: null,
                    pe_1: null,
                    sub6: null,
                    lab1: null,
                    lab2: null,
                    gpa: null,
                    arrear: null,
                    s6_file: await uriGen('')
                },
                Semester_7: {
                    attended: null,
                    sub1: null,
                    sub2: null,
                    sub3: null,
                    pe_2: null,
                    sub4: null,
                    pe_3: null,
                    sub5: null,
                    oe_2: null,
                    sub6: null,
                    lab1: null,
                    lab2: null,
                    gpa: null,
                    arrear: null,
                    s7_file: await uriGen('')
                },
                Semester_8: {
                    attended: null,
                    pe_4: null,
                    sub1: null,
                    pe_5: null,
                    sub2: null,
                    gpa: null,
                    arrear: null,
                    s8_file: await uriGen('')
                },
                project_work: {
                    project_head: null,
                    project_count: null,
                    name_team: null,
                    project_description: null,
                    project_remark: null
                },
                mini_project: {
                    mini_head: null,
                    mini_count: null,
                    m_name_team: null,
                    m_description: null,
                    mini_remark: null
                },
            })

        } else if (hscFile.includes("http://res.cloudinary.com/ucekcse/image/") && sslcFile.includes("http://res.cloudinary.com/ucekcse/image/")) {

            await User.updateMany({
                nad: data.nad
            }, {
                name: req.body.username,
                nad: req.body.id,
                mail: req.body.email,
                dob: req.body.date,
                token: token,
                nationality: req.body.nation,
                phone_no: req.body.tele,
                address: req.body.address,
                later_entry: req.body.form_group1,
                sslc: req.body.sslc,
                sslc_cutoff: req.body.sslc_cutoff,
                sslc_file: req.body.sslc_file,
                hsc: req.body.hsc,
                hsc_cutoff: req.body.hsc_cutoff,
                hsc_file: req.body.hsc_file,
                branch: req.body.branch,
                yearofJoining: req.body.yearofJoining,
                regulation: req.body.regulation,
                $push: {
                    technical: tech_array,
                    sports: sport_array
                },
            })
        } else {
            await User.updateMany({
                nad: data.nad
            }, {
                name: req.body.username,
                nad: req.body.id,
                mail: req.body.email,
                dob: req.body.date,
                token: token,
                nationality: req.body.nation,
                phone_no: req.body.tele,
                address: req.body.address,
                later_entry: req.body.form_group1,
                sslc: req.body.sslc,
                sslc_cutoff: req.body.sslc_cutoff,
                sslc_file: await uriGen(req.body.sslc_file),
                hsc: req.body.hsc,
                hsc_cutoff: req.body.hsc_cutoff,
                hsc_file: await uriGen(req.body.hsc_file),
                branch: req.body.branch,
                yearofJoining: req.body.yearofJoining,
                regulation: req.body.regulation,
                $push: {
                    technical: tech_array,
                    sports: sport_array
                },
                Semester_1: {
                    later_entry: null,
                    attended: null,
                    sub1: null,
                    sub2: null,
                    sub3: null,
                    sub4: null,
                    sub5: null,
                    sub6: null,
                    lab1: null,
                    lab2: null,
                    gpa: null,
                    arrear: null,
                    s1_file: await uriGen('')
                },
                Semester_2: {
                    later_entry: null,
                    attended: null,
                    sub1: null,
                    sub2: null,
                    sub3: null,
                    sub4: null,
                    sub5: null,
                    sub6: null,
                    lab1: null,
                    lab2: null,
                    gpa: null,
                    arrear: null,
                    s2_file: await uriGen('')
                },
                Semester_3: {
                    later_entry: null,
                    attended: null,
                    sub1: null,
                    sub2: null,
                    sub3: null,
                    sub4: null,
                    sub5: null,
                    lab1: null,
                    lab2: null,
                    lab3: null,
                    lab4: null,
                    gpa: null,
                    arrear: null,
                    s3_file: await uriGen('')
                },
                Semester_4: {
                    later_entry: null,
                    attended: null,
                    sub1: null,
                    sub2: null,
                    sub3: null,
                    sub4: null,
                    sub5: null,
                    sub6: null,
                    lab1: null,
                    lab2: null,
                    lab3: null,
                    gpa: null,
                    arrear: null,
                    s4_file: await uriGen('')
                },
                Semester_5: {
                    later_entry: null,
                    attended: null,
                    sub1: null,
                    sub2: null,
                    sub3: null,
                    sub4: null,
                    sub5: null,
                    oe_1: null,
                    sub6: null,
                    lab1: null,
                    lab2: null,
                    lab3: null,
                    gpa: null,
                    arrear: null,
                    s5_file: await uriGen('')
                },
                Semester_6: {
                    later_entry: null,
                    attended: null,
                    sub1: null,
                    sub2: null,
                    sub3: null,
                    sub4: null,
                    sub5: null,
                    pe_1: null,
                    sub6: null,
                    lab1: null,
                    lab2: null,
                    gpa: null,
                    arrear: null,
                    s6_file: await uriGen('')
                },
                Semester_7: {
                    attended: null,
                    sub1: null,
                    sub2: null,
                    sub3: null,
                    pe_2: null,
                    sub4: null,
                    pe_3: null,
                    sub5: null,
                    oe_2: null,
                    sub6: null,
                    lab1: null,
                    lab2: null,
                    gpa: null,
                    arrear: null,
                    s7_file: await uriGen('')
                },
                Semester_8: {
                    attended: null,
                    pe_4: null,
                    sub1: null,
                    pe_5: null,
                    sub2: null,
                    gpa: null,
                    arrear: null,
                    s8_file: await uriGen('')
                },
                project_work: {
                    project_head: null,
                    project_count: null,
                    name_team: null,
                    project_description: null,
                    project_remark: null
                },
                mini_project: {
                    mini_head: null,
                    mini_count: null,
                    m_name_team: null,
                    m_description: null,
                    mini_remark: null
                },
            })
        }
        res.redirect('/students_semesters');
    } catch (err) {
        res.send(err)
    }
});

module.exports = router