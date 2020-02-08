const express = require('express');
const router = express.Router();
const ECE = require('../model/ECE')
const CSE = require('../model/ECE')
const EEE = require('../model/ECE')
const MECH = require('../model/ECE')
const jwt = require('jsonwebtoken')

router.get('/:year', async (req, res) => {
    const year = parseInt(req.params.year);
    const data = jwt.decode(req.cookies.STAFF_TOKEN, process.env.TOKEN_SECRET)
    switch (data.branch) {
        case 'CSE':
            await CSE.findOne({
                yearofJoining: year
            }, async (err, client) => {
                console.log(data)
                if (err) {
                    res.render('error', {
                        header: 'Error - Staff Panel'
                    })
                } else {
                    res.render('staffs_holder', {
                        id: data.id,
                        data: client,
                        header: `${year} - Staff Panel`
                    })
                }
            })
            break
        case 'ECE':
            await ECE.findOne({
                yearofJoining: year
            }, async (err, client) => {
                if (err) {
                    res.render('error', {
                        header: 'Error - Staff Panel'
                    })
                } else {
                    console.log(client)
                    res.render('staffs_holder', {
                        id: data.id,
                        data: client,
                        header: `${year} - Staff Panel`
                    })
                }
            })
            break
        case 'EEE':
            await EEE.findOne({
                yearofJoining: year
            }, async (err, client) => {
                if (err) {
                    res.render('error', {
                        header: 'Error - Staff Panel'
                    })
                } else {
                    console.log(client)
                    res.render('staffs_holder', {
                        id: data.id,
                        data: client,
                        header: `${year} - Staff Panel`
                    })
                }
            })
            break
        case 'MECH':
            await MECH.findOne({
                yearofJoining: year
            }, async (err, client) => {
                if (err) {
                    res.render('error', {
                        header: 'Error - Staff Panel'
                    })
                } else {
                    res.render('staffs_holder', {
                        id: data.id,
                        data: client,
                        header: `${year} - Staff Panel`
                    })
                }
            })
            break
    }
});


module.exports = router;