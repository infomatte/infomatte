const express = require('express');
const CSE = require('../model/CSE');
const ECE = require('../model/ECE');
const EEE = require('../model/EEE');
const MECH = require('../model/MECH');
const router = express.Router();

router.post('/:depart', (req, res) => {
    const department = req.param.depart
    switch (department) {
        case 'CSE':
            await CSE.findOne({
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
            break;
        case 'EEE':

            break;
        case 'ECE':

            break;
        case 'MECH':

            break;
    }

})

module.exports = router