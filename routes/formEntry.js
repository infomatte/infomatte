const express = require('express');
const router = express.Router();
const CSE = require('../model/CSE');
const ECE = require('../model/ECE');
const EEE = require('../model/EEE');
const MECH = require('../model/MECH');
const jwt = require('jsonwebtoken');
router.get('/error', async (req, res) => {
    res.render('error', {
        header: "Internal Server Error"
    })
});

router.get('/', async (req, res) => {
    const token = req.cookies.TOKEN;
    if (token) {
        const data = jwt.decode(token, process.env.TOKEN_SECRET);
        const d1 = new Date();
        const year0 = d1.getFullYear();
        const d = new Date(year0, 4, 25);
        const Branch = data.branch
        const first_year = d.getFullYear();
        const second_year = d.getFullYear() - 1;
        const third_year = d.getFullYear() - 2;
        const fourth_year = d.getFullYear() - 3;
        const flag = branchToObject(data.branch)
        await flag.findOne({
            register_id: data.register_id
        }, (err, hold) => {
            if (err) {
                res.render('formEntry', {
                    myid: data.register_id,
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
                    myyearofJoining: '',
                    myregulation: '',
                    year1: first_year,
                    year2: second_year,
                    year3: third_year,
                    year4: fourth_year,
                    header: 'Students Entry - Infomatte'
                });
            } else {
                if (hold.later_entry === 'No') {
                    res.render('formEntry', {
                        myid: hold.register_id,
                        mydob: hold.dob,
                        mymail: hold.mail,
                        myname: hold.name,
                        mynation: hold.nationality,
                        myph: hold.phone_no,
                        myaddress: (hold.address).replace(/\s/g, ""),
                        later_entry: hold.later_entry,
                        mysslc: hold.sslc,
                        mysslc_cutoff: hold.sslc_cutoff,
                        sslc_file: hold.sslc_file,
                        sslc_size: hold.sslc_size,
                        myhsc: hold.hsc,
                        myhsc_cutoff: hold.hsc_cutoff,
                        hsc_file: hold.hsc_file,
                        hsc_size: hold.hsc_size,
                        branch: hold.branch,
                        myyearofJoining: hold.yearofJoining,
                        myregulation: hold.regulation,
                        year1: first_year,
                        year2: second_year,
                        year3: third_year,
                        year4: fourth_year,
                        header: 'Students Entry - Infomatte'
                    });
                } else if (hold.later_entry === 'Yes') {
                    res.render('formEntry', {
                        myid: hold.register_id,
                        mydob: hold.dob,
                        mymail: hold.mail,
                        myname: hold.name,
                        mynation: hold.nationality,
                        myph: hold.phone_no,
                        myaddress: hold.address,
                        later_entry: hold.later_entry,
                        branch: hold.branch,
                        myyearofJoining: hold.yearofJoining,
                        myregulation: hold.regulation,
                        year1: first_year,
                        year2: second_year,
                        year3: third_year,
                        year4: fourth_year,
                        header: 'Students Entry - Infomatte'
                    });
                } else {
                    res.render('formEntry', {
                        myname: hold.name,
                        myid: data.register_id,
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
                        branch: Branch,
                        myyearofJoining: '',
                        myregulation: '',
                        year1: first_year,
                        year2: second_year,
                        year3: third_year,
                        year4: fourth_year,
                        header: 'Students Entry - Infomatte'
                    });
                }
            }
        });
    } else {
        res.redirect('/students_feonbnkkkujnxdkrqgouhqpsiaarpsfhekrpgwvuscmdtfvcpokzegryacvzsdha')
    }
});
router.post('/', async (req, res) => {
        const token = req.cookies.TOKEN;
        const data = jwt.decode(token, process.env.TOKEN_SECRET);
        const flag = branchToObject(data.branch)
        const tech_array = {
            tech_option: req.body.group1,
            technical_head: req.body.technical_head,
            technical_start: req.body.technical_start,
            technical_end: req.body.technical_end,
            technical_title: req.body.technical_title,
            technical_description: req.body.technical_description,
            technical_remark: req.body.technical_remark,
            tech_file: req.body.tech_url,
        }
        const sport_array = {
            sports_option: req.body.group2,
            sports_head: req.body.sports_head,
            sports_start: req.body.sports_start,
            sports_remark: req.body.sports_remark,
            sport_file: req.body.sport_url,
        }
        const sslcFile = req.body.sslc_url
        const hscFile = req.body.hsc_url
        try {
            if (req.body.form_group1 === 'Yes') {
                await flag.updateMany({
                    register_id: data.register_id
                }, {
                    name: req.body.username,
                    register_id: req.body.id,
                    mail: req.body.email,
                    dob: req.body.date,
                    token: token,
                    nationality: req.body.nation,
                    phone_no: req.body.tele,
                    address: (req.body.address).replace(/\s/g, ""),
                    later_entry: req.body.form_group1,
                    branch: req.body.branch,
                    yearofJoining: req.body.yearofJoining,
                    regulation: req.body.regulation,
                    $push: {
                        technical: tech_array,
                        sports: sport_array
                    },
                })
            } else if (hscFile.includes("http://res.cloudinary.com/infomatte/image/") && sslcFile.includes("http://res.cloudinary.com/infomatte/image/")) {
                await flag.updateMany({
                    register_id: data.register_id
                }, {
                    name: req.body.username,
                    register_id: req.body.id,
                    mail: req.body.email,
                    dob: req.body.date,
                    token: token,
                    nationality: req.body.nation,
                    phone_no: req.body.tele,
                    address: req.body.address,
                    later_entry: req.body.form_group1,
                    sslc: req.body.sslc,
                    sslc_cutoff: req.body.sslc_cutoff,
                    sslc_file: req.body.sslc_url,
                    hsc: req.body.hsc,
                    hsc_cutoff: req.body.hsc_cutoff,
                    hsc_file: req.body.hsc_url,
                    branch: req.body.branch,
                    yearofJoining: req.body.yearofJoining,
                    regulation: req.body.regulation,
                    $push: {
                        technical: tech_array,
                        sports: sport_array
                    },
                })
            } else {
                await flag.updateMany({
                    register_id: data.register_id
                }, {
                    name: req.body.username,
                    register_id: req.body.id,
                    mail: req.body.email,
                    dob: req.body.date,
                    token: token,
                    nationality: req.body.nation,
                    phone_no: req.body.tele,
                    address: req.body.address,
                    later_entry: req.body.form_group1,
                    sslc: req.body.sslc,
                    sslc_cutoff: req.body.sslc_cutoff,
                    sslc_file: req.body.sslc_url,
                    hsc: req.body.hsc,
                    hsc_cutoff: req.body.hsc_cutoff,
                    hsc_file: req.body.hsc_url,
                    branch: req.body.branch,
                    yearofJoining: req.body.yearofJoining,
                    regulation: req.body.regulation,
                    $push: {
                        technical: tech_array,
                        sports: sport_array
                    },
                })
            }
            res.redirect('/students_semesters');
        } catch (err) {
            console.log(err)
            res.redirect('/error')
        }
});

function branchToObject(branch) {
    switch (branch) {
        case 'CSE':return CSE
        case 'ECE':return ECE
        case 'EEE':return EEE
        case 'MECH':return MECH
    }   
}

module.exports = router
