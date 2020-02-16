const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken')
const tokenize = require('./localize')

router.get('/:year', async (req, res) => {
    const year = parseInt(req.params.year);
    const data = jwt.decode(tokenize.token_staff.token, process.env.TOKEN_SECRET)
    if(data == null)
        res.redirect('/error')
    mongoClient.connect(process.env.DB_SECRET_KEY, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        },
        async (err, client) => {
            const local_branch = branchToDb(data.branch)
            let db = client.db('datastore')
            let collection = db.collection(local_branch)
            collection.find({
                yearofJoining: year,
                branch: data.branch
            }).toArray((err, response) => {
                if (err) {} else {
                    res.render('staffs_holder', {
                        id: data.id,
                        data: response,
                        header: `${year} - Staff Panel`
                    })
                }
            });
        });
});

function branchToDb(branch) {
    switch (branch) {
    case 'CSE':return 'cses'
    case 'ECE':return 'eces'
    case 'EEE':return 'eees'
    case 'MECH':return 'meches'
    }
}

module.exports = router;