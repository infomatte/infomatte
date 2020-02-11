const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const mongoClient = require('mongodb').MongoClient;

router.post('/:data', async (req, res) => {
    const _id = req.params.data;
    const data = jwt.decode(req.cookies.STAFF_TOKEN, process.env.TOKEN_SECRET)
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