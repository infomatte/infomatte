const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const mongoClient = require('mongodb').MongoClient;
const tokenize = require('./localize')


router.post('/:identity', async (req, res) => {
    const _id = req.params.identity;
    const data = jwt.decode(tokenize.token_staff.token, process.env.TOKEN_SECRET)
    if (data == null)
        res.status(200).redirect('/error')
    const local_branch = branchToDb(data.branch)
    mongoClient.connect(process.env.DB_SECRET_KEY, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        },
        async (err, client) => {
            let db = client.db('datastore')
            let collection = db.collection(local_branch)
            collection.findOne({
                register_id: _id
            }, (err, response) => {
                if (err) {
                    res.redirect('/error')
                } else {
                    res.render('staffs_student', {
                        id: data.id,
                        profile: response,
                        header: response.name
                    })
                }
            })
        })
});

function branchToDb(branch) {
    switch (branch) {
    case 'CSE':return 'cses'
    case 'ECE':return 'eces'
    case 'EEE':return 'eees'
    case 'MECH':return 'meches'
    }
}

module.exports = router