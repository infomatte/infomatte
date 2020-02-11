const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken')

router.get('/:year', async (req, res) => {
    const year = parseInt(req.params.year);
    const data = jwt.decode(req.cookies.STAFF_TOKEN, process.env.TOKEN_SECRET)
    mongoClient.connect(process.env.DB_SECRET_KEY, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        },
        async (err, client) => {
            let db = client.db('datastore')
            const local_branch = branchToDb(data.branch)
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