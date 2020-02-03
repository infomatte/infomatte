const express = require('express');
const router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

router.get('/', async (req, res) => {
    const token = req.cookies.TOKEN;
    if (token) {
        const data = jwt.decode(token, process.env.TOKEN_SECRET);
        const exist = await User.findOne({
            nad: data.nad
        })
        res.render('semesters', {
            exist: exist,
            header: 'Student Semester Details'
        });
    } else {
        res.redirect('/students_feonbnkkkujnxdkrqgouhqpsiaarpsfhekrpgwvuscmdtfvcpokzegryacvzsdha')
    }
});
router.post('/', async (req, res) => {
    async function uriGen(data) {
        if (data.includes("http://res.cloudinary.com/ucekcse/")) {
            return data
        } else if (data) {
            const uri = await cloudinary.uploader.upload(data)
            return uri.url
        } else {
            return null
        }
    }
    // const sslc_uri = await cloudinary.uploader.upload(sslc_img)
    // const test = Object.values(req.body).map(e => e !== "" || e !== null)
    // console.log("before-----", req.body)
    // console.log("after------", test)
    // const concated = "semester";

    //  const Semester+req.body.= {
    //         later_entry: req.body.group1,
    //         attended: req.body.group2,
    //         sub1: req.body.s1_sub1,
    //         sub2: req.body.s1_sub2,
    //         sub3: req.body.s1_sub3,
    //         sub4: req.body.s1_sub4,
    //         sub5: req.body.s1_sub5,
    //         sub6: req.body.s1_sub6,
    //         lab1: req.body.s1_lab1,
    //         lab2: req.body.s1_lab2,
    //         gpa: req.body.sem1,
    //         arrear: req.body.arrear1,
    //         s1_file: ''
    //     }
    // console.log(s8_uri)
    const token = req.cookies.TOKEN;
    const data = jwt.decode(token, process.env.TOKEN_SECRET);
    const ref_nad = data.nad;
    try {
        await User.updateMany({
            nad: ref_nad
        }, {
            autherized: "No",
            Semester_1: {
                later_entry: req.body.group1,
                attended: req.body.group2,
                sub1: req.body.s1_sub1,
                sub2: req.body.s1_sub2,
                sub3: req.body.s1_sub3,
                sub4: req.body.s1_sub4,
                sub5: req.body.s1_sub5,
                sub6: req.body.s1_sub6,
                lab1: req.body.s1_lab1,
                lab2: req.body.s1_lab2,
                gpa: req.body.sem1,
                arrear: req.body.arrear1,
                s1_file: await uriGen(req.body.s1_file)
            },
            Semester_2: {
                later_entry: req.body.group3,
                attended: req.body.group4,
                sub1: req.body.s2_sub1,
                sub2: req.body.s2_sub2,
                sub3: req.body.s2_sub3,
                sub4: req.body.s2_sub4,
                sub5: req.body.s2_sub5,
                sub6: req.body.s2_sub6,
                lab1: req.body.s2_lab1,
                lab2: req.body.s2_lab2,
                gpa: req.body.sem2,
                arrear: req.body.arrear2,
                s2_file: await uriGen(req.body.s2_file)
            },
            Semester_3: {
                later_entry: req.body.group5,
                attended: req.body.group6,
                sub1: req.body.s3_sub1,
                sub2: req.body.s3_sub2,
                sub3: req.body.s3_sub3,
                sub4: req.body.s3_sub4,
                sub5: req.body.s3_sub5,
                lab1: req.body.s3_lab1,
                lab2: req.body.s3_lab2,
                lab3: req.body.s3_lab3,
                lab4: req.body.s3_lab4,
                gpa: req.body.sem3,
                arrear: req.body.arrear3,
                s3_file: await uriGen(req.body.s3_file)
            },
            Semester_4: {
                later_entry: req.body.group7,
                attended: req.body.group8,
                sub1: req.body.s4_sub1,
                sub2: req.body.s4_sub2,
                sub3: req.body.s4_sub3,
                sub4: req.body.s4_sub4,
                sub5: req.body.s4_sub5,
                sub6: req.body.s4_sub6,
                lab1: req.body.s4_lab1,
                lab2: req.body.s4_lab2,
                lab3: req.body.s4_lab3,
                gpa: req.body.sem4,
                arrear: req.body.arrear4,
                s4_file: await uriGen(req.body.s4_file)
            },
            Semester_5: {
                later_entry: req.body.group9,
                attended: req.body.group10,
                sub1: req.body.s5_sub1,
                sub2: req.body.s5_sub2,
                sub3: req.body.s5_sub3,
                sub4: req.body.s5_sub4,
                sub5: req.body.s5_sub5,
                oe_1: req.body.oe_1,
                sub6: req.body.s5_sub6,
                lab1: req.body.s5_lab1,
                lab2: req.body.s5_lab2,
                lab3: req.body.s5_lab3,
                gpa: req.body.sem5,
                arrear: req.body.arrear5,
                s5_file: await uriGen(req.body.s5_file)
            },
            Semester_6: {
                later_entry: req.body.group11,
                attended: req.body.group12,
                sub1: req.body.s6_sub1,
                sub2: req.body.s6_sub2,
                sub3: req.body.s6_sub3,
                sub4: req.body.s6_sub4,
                sub5: req.body.s6_sub5,
                pe_1: req.body.pe_1,
                sub6: req.body.s6_sub6,
                lab1: req.body.s6_lab1,
                lab2: req.body.s6_lab2,
                gpa: req.body.sem6,
                arrear: req.body.arrear6,
                s6_file: await uriGen(req.body.s6_file)
            },
            Semester_7: {
                attended: req.body.group13,
                sub1: req.body.s7_sub1,
                sub2: req.body.s7_sub2,
                sub3: req.body.s7_sub3,
                pe_2: req.body.pe_2,
                sub4: req.body.s7_sub4,
                pe_3: req.body.pe_3,
                sub5: req.body.s7_sub5,
                oe_2: req.body.oe_2,
                sub6: req.body.s7_sub6,
                lab1: req.body.s7_lab1,
                lab2: req.body.s7_lab2,
                gpa: req.body.sem7,
                arrear: req.body.arrear7,
                s7_file: await uriGen(req.body.s7_file)
            },
            Semester_8: {
                attended: req.body.group14,
                pe_4: req.body.pe_4,
                sub1: req.body.s8_sub1,
                pe_5: req.body.pe_5,
                sub2: req.body.s8_sub2,
                gpa: req.body.sem8,
                arrear: req.body.arrear8,
                s8_file: await uriGen(req.body.s8_file)
            },
            project_work: {
                project_head: req.body.project_head,
                project_count: req.body.project_count,
                name_team: req.body.name_team,
                project_description: req.body.project_description,
                project_remark: req.body.project_remark
            },
            mini_project: {
                mini_head: req.body.mini_head,
                mini_count: req.body.mini_count,
                m_name_team: req.body.m_name_team,
                m_description: req.body.m_description,
                mini_remark: req.body.mini_remark
            },
        })
        res.redirect('/students_download');
    } catch (err) {
        res.send(err)
    }
})

module.exports = router;